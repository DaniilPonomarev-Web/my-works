import {
  ActionOrder,
  AddToCartInput,
  CartInputToOrder1c,
  ICart,
  ICustomer,
  IPayloadCreateOrder,
  ITransformedProduct,
  IUpdateProductQuantities,
  IUserForOrder,
  NOTIFICATION_EMAIL_NEW_ORDER,
  NOTIFICATION_EMAIL_NEW_ORDER_ADMIN,
  NOTIFICATION_TELEGRAM_ACTION_ORDER,
  NOTIFICATION_TELEGRAM_NEW_ORDER,
  Order,
  OrderDTO,
  OrderDTOFor1c,
  OrderProductDTO,
  OrderWithProductsDTO,
  StateOrder,
  UserDTOForOrder,
} from '@erist-opt/shared';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AppLoggerLoki } from '@erist-opt/logs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '@erist-opt/user';
import { ProductAdminService, ProductUserService } from '@erist-opt/product';
import dayjs from 'dayjs';
import { GenerateInvoiceService } from '@erist-opt/generate-invoice';
import { KafkaService } from '@erist-opt/kafka';
import { CartService } from '@erist-opt/card';
import { RabbitMQService } from '@erist-opt/rabbit';
import { OptionService } from '@erist-opt/options';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly userService: UserService,
    private readonly productAdminService: ProductAdminService,
    private readonly productUserService: ProductUserService,
    private readonly generateInvoiceService: GenerateInvoiceService,
    private readonly kafkaService: KafkaService,
    private readonly cartService: CartService,
    private readonly optionService: OptionService,
    private readonly rabbitMQService: RabbitMQService,
    private AppLoggerLoki: AppLoggerLoki
  ) {}

  async createOrder(createOrderData: IPayloadCreateOrder): Promise<OrderDTO> {
    const {
      userId,
      cart,
      // shippingAddressId,
      paymentMethod,
      totalAmount,
      total,
      discount,
    } = createOrderData;

    const user = await this.userService.findOneById(userId);

    if (!user) {
      this.AppLoggerLoki.error(
        `Ошибка при создании заказа из-за того что пользрватель не найден с id=${userId}`,
        'api'
      );
      throw new Error('User не найден');
    }

    // Преобразование cart из CreateOrderDTO в AddToCartInput[]
    const transformedCart = cart.map(
      (item) =>
        new AddToCartInput(item.productId, item.quantity, item.optionValueId)
    );

    const lastOrder = await this.orderRepository.find({
      order: { currentID: 'DESC' },
    });
    let newCurrentID = 1;
    if (lastOrder.length > 0) {
      newCurrentID = lastOrder[0].currentID + 1;
    }

    const order = this.orderRepository.create({
      user,
      userCompany_name: user.company.name,
      userCompany_urAddress: user.company.urAddress,
      userCompany_inn: user.company.inn,
      userCompany_kpp: user.company.kpp,
      userCompany_ogrn: user.company.ogrn,
      userCompany_checkingAccount: user.company.checkingAccount,
      userCompany_bankName: user.company.bankName,
      userCompany_bikBank: user.company.bikBank,
      userCompany_correspondentAccount: user.company.correspondentAccount,
      cart: transformedCart,
      // shippingAddress: shippingAddressId,
      paymentMethod,
      totalAmount,
      total,
      discount,
      currentID: newCurrentID,
    });

    const savedOrder = await this.orderRepository.save(order);
    // await this.userService.updateAgreement(createOrderData.userId);

    const transformedCartForOrder1c = await Promise.all(
      cart
        .filter((item) => item.optionValueId)
        .map(async (item) => {
          const optionValueIdIn1c =
            await this.optionService.findOptionValueIdin1c(item.optionValueId);
          const product = await this.productUserService.findOneById(
            item.productId
          );
          return new CartInputToOrder1c(
            item.productId,
            product.id1c,
            item.quantity,
            item.product.price,
            item.optionValueId,
            optionValueIdIn1c
          );
        })
    );

    const orderFor1c = new OrderDTOFor1c(
      savedOrder.id,
      this.mapUserToUserDTO(savedOrder.user),
      savedOrder.userCompany_name,
      savedOrder.userCompany_urAddress,
      savedOrder.userCompany_inn,
      savedOrder.userCompany_kpp,
      savedOrder.userCompany_ogrn,
      savedOrder.userCompany_checkingAccount,
      savedOrder.userCompany_bankName,
      savedOrder.userCompany_bikBank,
      savedOrder.userCompany_correspondentAccount,
      // savedOrder.shippingAddress,
      savedOrder.paymentMethod,
      transformedCartForOrder1c,
      savedOrder.totalAmount,
      savedOrder.total,
      savedOrder.discount,
      await this.getPersetOrder(
        savedOrder.totalAmount,
        savedOrder.discount ?? 0,
        savedOrder.total
      ),
      (savedOrder.inOneC = false),
      (savedOrder.state = StateOrder.created),
      savedOrder.currentID,
      savedOrder.hrefForInvoice,
      savedOrder.registred.toString(),
      savedOrder.id1c
    );
    // заказ в очередь
    this.AppLoggerLoki.log(
      `Отправляем заказ в очередб с id=${savedOrder.id}`,
      'api'
    );
    // console.warn(orderFor1c);
    // console.warn('orderFor1cCart', orderFor1c.cart);

    await this.rabbitMQService.pushOrder(orderFor1c);
    this.AppLoggerLoki.log(`Создали заказ с id=${savedOrder.id}`, 'api');
    const orderDTO = new OrderDTO(
      savedOrder.id,
      this.mapUserToUserDTO(savedOrder.user),
      savedOrder.userCompany_name,
      savedOrder.userCompany_urAddress,
      savedOrder.userCompany_inn,
      savedOrder.userCompany_kpp,
      savedOrder.userCompany_ogrn,
      savedOrder.userCompany_checkingAccount,
      savedOrder.userCompany_bankName,
      savedOrder.userCompany_bikBank,
      savedOrder.userCompany_correspondentAccount,
      // savedOrder.shippingAddress,
      savedOrder.paymentMethod,
      savedOrder.cart,
      savedOrder.totalAmount,
      savedOrder.total,
      savedOrder.discount,
      (savedOrder.inOneC = false),
      (savedOrder.state = StateOrder.created),
      savedOrder.currentID,
      savedOrder.hrefForInvoice,
      savedOrder.registred.toString(),
      savedOrder.id1c
    );
    return orderDTO;
  }

  private async getPersetOrder(
    totalAmount: number,
    discount: number,
    total: number
  ): Promise<number> {
    if (total === 0) {
      return 0;
    }
    const discountPercentage = ((totalAmount - total) / totalAmount) * 100;
    return discountPercentage;
  }

  async getOrderByOrderId(orderId: string): Promise<OrderDTO | null> {
    const order = await this.orderRepository.findOne({
      where: {
        id: orderId,
      },
      relations: ['user'],
    });

    if (!order) {
      this.AppLoggerLoki.error(
        `Ошибка получения заказа, так как он не найден`,
        'api'
      );

      return null;
    }
    const stateOrder: StateOrder = order.state as StateOrder;

    const orderForDTO = new OrderDTO(
      order.id,
      this.mapUserToUserDTO(order.user),
      order.userCompany_name,
      order.userCompany_urAddress,
      order.userCompany_inn,
      order.userCompany_kpp,
      order.userCompany_ogrn,
      order.userCompany_checkingAccount,
      order.userCompany_bankName,
      order.userCompany_bikBank,
      order.userCompany_correspondentAccount,
      // order.shippingAddress,
      order.paymentMethod,
      order.cart,
      order.totalAmount,
      order.total,
      order.discount,
      order.inOneC,
      stateOrder,
      order.currentID,
      order.hrefForInvoice,
      order.registred.toString(),
      order.id1c
    );
    this.AppLoggerLoki.log(`Вернули один заказ`, 'api');

    return orderForDTO;
  }

  async getOrderByUserAndOrderId(
    orderId: string,
    userId: string
  ): Promise<OrderWithProductsDTO | null> {
    const order = await this.orderRepository.findOne({
      where: {
        id: orderId,
        user: {
          id: userId,
        },
      },
    });

    if (!order) {
      this.AppLoggerLoki.error(
        `Ошибка получения заказа, так как он не найден`,
        'api'
      );

      return null;
    }

    const normalizedOrder = await this.normalizeOrder(order);
    return normalizedOrder;
  }

  async findOrderById(orderId: string): Promise<OrderWithProductsDTO | null> {
    const order = await this.orderRepository.findOne({
      where: {
        id: orderId,
      },
    });

    if (!order) {
      this.AppLoggerLoki.error(
        `Ошибка получения заказа, так как он не найден`,
        'api'
      );

      return null;
    }

    const normalizedOrder = await this.normalizeOrder(order);
    return normalizedOrder;
  }

  async updateOrderStatus(
    orderId: string,
    newState: StateOrder
  ): Promise<OrderWithProductsDTO | null> {
    const order = await this.orderRepository.findOne({
      where: {
        id: orderId,
      },
    });
    if (!order) {
      this.AppLoggerLoki.error(
        `Ошибка получения заказа, так как он не найден`,
        'api'
      );

      return null;
    }
    order.state = newState;
    const updatedOrder = await this.orderRepository.save(order);

    const normalizedOrder = await this.normalizeOrder(updatedOrder);
    return normalizedOrder;
  }

  async updateOrderAfter1c(
    orderId: string,
    fileName: string,
    orderId1c: string
  ): Promise<Order | null> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
    });
    if (!order) {
      this.AppLoggerLoki.error(
        `Ошибка получения заказа, так как он не найден`,
        'api'
      );

      return null;
    }
    order.hrefForInvoice = fileName;
    order.id1c = orderId1c;
    order.state = StateOrder.inprocessing;

    const updatedOrder = await this.orderRepository.save(order);

    this.AppLoggerLoki.log(
      `Получен заказ из 1c и обновлен ${order.currentID}`,
      'api'
    );

    return updatedOrder;
  }

  async deleteOrder(orderId: string): Promise<boolean> {
    const result = await this.orderRepository.delete(orderId);
    return !!result.affected && result.affected > 0;
  }

  async getOrdersByUserId(id: string): Promise<OrderWithProductsDTO[]> {
    const orders = await this.orderRepository.find({
      where: {
        user: { id: id },
      },
      order: {
        registred: 'DESC',
      },
    });

    const normalizedOrders = await Promise.all(
      orders.map((order) => this.normalizeOrder(order))
    );

    const data = normalizedOrders.filter(
      (order): order is OrderWithProductsDTO => order !== null
    );

    return data;
  }

  // private async getShippingAddressString(shippingId: string): Promise<string> {
  //   const shippingAddress = await this.userService.getAddress(shippingId);
  //   if (!shippingAddress) {
  //     return '';
  //   }
  //   const shippingAddressFormat =
  //     `${shippingAddress.country}, ` +
  //     `${shippingAddress.city}, ` +
  //     `${shippingAddress.street}, ` +
  //     `${shippingAddress.home}` +
  //     (shippingAddress.apartmentORoffice
  //       ? `, Кварттира/Офис: ${shippingAddress.apartmentORoffice}`
  //       : '');

  //   return shippingAddressFormat;
  // }

  async normalizeOrder(order: Order): Promise<OrderWithProductsDTO | null> {
    // const userShippingAddress: string = await this.getShippingAddressString(
    //   order.shippingAddress
    // );

    const newHref = await this.generateInvoiceService.getPdfHref(
      order.hrefForInvoice,
      'invoices'
    );

    // Проверяем, что order.cart существует и является массивом
    // console.warn(order.cart);

    if (!order.cart || !Array.isArray(order.cart)) {
      console.error('order.cart is undefined or not an array');
      return null;
    }

    // Получаем все идентификаторы товаров из корзины
    const productIds = order.cart.map((item) => item.productId);
    const products = await this.productUserService.findByIds(productIds);
    const normalizedProducts = await this.productUserService.transformProducts(
      products
    );

    const productsAnswer: OrderProductDTO[] = order.cart
      .map((cartItem) => {
        const product = normalizedProducts.find(
          (p) => p.id === cartItem.productId
        );
        if (!product) {
          console.error(
            `Product with ID ${cartItem.productId} не найден в этом мире`
          );
          return null;
        }

        let optionName: string | undefined;
        const option = product.options.find((opt) =>
          opt.values.some((val) => val.id === cartItem.optionValueId)
        );
        if (option) {
          const optionValue = option.values.find(
            (val) => val.id === cartItem.optionValueId
          );
          if (optionValue) {
            optionName = optionValue.value.name;
          }
        }

        return new OrderProductDTO(
          product.id,
          product.model,
          product.price,
          product.description.name,
          product.images[0]
            ? product.images[0].image
            : 'https://static.erist.store/images/no_image_product.webp',
          cartItem.quantity,
          optionName
        );
      })
      .filter((item): item is OrderProductDTO => item !== null);

    const data: OrderWithProductsDTO = {
      id: order.id,
      // address: userShippingAddress,
      userCompany_name: order.userCompany_name,
      userCompany_urAddress: order.userCompany_urAddress,
      userCompany_inn: order.userCompany_inn,
      userCompany_kpp: order.userCompany_kpp,
      userCompany_ogrn: order.userCompany_ogrn,
      userCompany_checkingAccount: order.userCompany_checkingAccount,
      userCompany_bankName: order.userCompany_bankName,
      userCompany_bikBank: order.userCompany_bikBank,
      userCompany_correspondentAccount: order.userCompany_correspondentAccount,
      paymentMethod: order.paymentMethod,
      products: productsAnswer,
      totalAmount: order.totalAmount,
      discount: order.discount,
      total: order.total,
      inOneC: order.inOneC,
      state: order.state as StateOrder,
      currentID: order.currentID,
      hrefForInvoice: order.hrefForInvoice ? newHref : null,
      registred: dayjs(order.registred).format('DD.MM.YYYY'),
      id1c: null,
    };

    return data;
  }

  private mapUserToUserDTO(user: IUserForOrder): UserDTOForOrder {
    return {
      id: user.id,
      status: user.status,
      name: user.name,
      email: user.email,
      phone: user.phone,
    };
  }

  async sendOrderConfirmationTelegram(order: OrderDTO): Promise<void> {
    const message = `Пользователь совершил заказ №${order.currentID}\n
    ИНН: ${order.userCompany_inn}\n E-mail: ${order.user.email}\n Компания: ${order.userCompany_name}\n Сделал заказ на сумму ${order.totalAmount} Р. `.toString();
    await this.kafkaService.sendMessage(
      NOTIFICATION_TELEGRAM_NEW_ORDER,
      message
    );

    const orderData = JSON.stringify(order);
    const emailMessage = await this.kafkaService.sendMessageWithReturn(
      NOTIFICATION_EMAIL_NEW_ORDER,
      orderData
    );
    return emailMessage;
  }

  async sendOrderConfirmationUser(order: OrderDTO): Promise<void> {
    const orderData = JSON.stringify(order);
    const emailMessage = await this.kafkaService.sendMessageWithReturn(
      NOTIFICATION_EMAIL_NEW_ORDER,
      orderData
    );
    return emailMessage;
  }

  async sendOrderConfirmationAdmin(order: OrderDTO): Promise<void> {
    const orderData = JSON.stringify(order);
    const emailMessage = await this.kafkaService.sendMessageWithReturn(
      NOTIFICATION_EMAIL_NEW_ORDER_ADMIN,
      orderData
    );
    return emailMessage;
  }
  async sendOrderEditConfirmation(
    customer: ICustomer,
    action: ActionOrder,
    orderId: number,
    orderStatus?: string
  ): Promise<void> {
    const message = `
    Пользователь ${customer.login}, ${action} ${
      orderStatus ? `Новый статус - "${orderStatus}"` : ''
    } №${orderId}`;
    await this.kafkaService.sendMessage(
      NOTIFICATION_TELEGRAM_ACTION_ORDER,
      message
    );
  }

  /**
   * Возвращает корзину пользователя по его ID.
   * @param userId Идентификатор пользователя.
   * @returns {Promise<ICart>} Промис с объектом корзины.
   * @throws {NotFoundException} Если корзина не найдена.
   */
  async getCart(userId: string): Promise<ICart> {
    const cart = await this.cartService.getCart(userId);
    if (!cart) {
      throw new NotFoundException('Корзина не найдена');
    }
    if (cart.items.length === 0) {
      throw new NotFoundException('Корзина не может быть пустой');
    }

    return cart;
  }

  /**
   * Очищает корзину пользователя, удаляя все товары.
   * @param userId Идентификатор пользователя.
   * @returns {Promise<boolean>} Промис с результатом очистки корзины (true).
   * @throws {NotFoundException} Если корзина не найдена.
   */
  async clearCart(userId: string): Promise<boolean> {
    console.warn('clearcart userID', userId);

    const cart = await this.cartService.clearCart(userId);

    if (!cart) {
      throw new NotFoundException('Корзина не найдена');
    }
    return true;
  }

  async updateDataProducts(userId: string): Promise<boolean> {
    try {
      // Получаем корзину пользователя
      const cart = await this.cartService.getCart(userId);
      // Создаем массив промисов для обновления остатков по каждому элементу корзины
      const updatePromises = cart.items.map(async (item) => {
        // Находим продукт по его ID
        const product: ITransformedProduct =
          await this.productUserService.findOneById(item.productId);
        const productId = product.id;
        const optionValueId = item.optionValueId;

        // Обновляем количество продукта
        const updatedProductQuantity = product.quantity - item.quantity;

        const optionToProduct = await this.productUserService.findOptionById(
          optionValueId || 'TODO'
        );

        if (!optionToProduct) {
          return;
        }
        // Создаем объект для обновления остатков
        const productsToUpdate: IUpdateProductQuantities = {
          productId: productId,
          newQuantity: updatedProductQuantity,
          optionValues: {
            valueId: optionToProduct.id,
            newQuantity: optionToProduct.quantity - item.quantity,
          },
        };

        // Обновляем количество продукта и опций
        return this.productAdminService.updateProductQuantities(
          productsToUpdate
        );
      });

      // Ждем завершения всех промисов
      await Promise.all(updatePromises);

      return true;
    } catch (error) {
      if (error instanceof Error) {
        this.AppLoggerLoki.error(
          `Ошибка при обновлении остатков продуктов ${error.message}`,
          'api'
        );
        return false;
      }
      this.AppLoggerLoki.error(
        `Ошибка при обновлении остатков продуктов`,
        'api'
      );

      return false;
    }
  }

  async createOrderInvoice(
    orderId: string,
    orderId1c: string,
    orderDocCode: string
  ): Promise<string> {
    const order = await this.getOrderByOrderId(orderId);
    if (!order) {
      this.AppLoggerLoki.error(
        `Ошибка получения заказа, так как он не найден при создании инвойса`,
        'api'
      );
      throw new BadRequestException('Нет заказа с таким ID');
    }
    const createdInvoice = await this.generateInvoiceService.createInvoice(
      order,
      orderId1c,
      orderDocCode
    );
    if (!createdInvoice) {
      throw new NotFoundException('Не удалось создать счет на оплату');
    }
    const updateOrder: Order | null = await this.updateOrderAfter1c(
      createdInvoice.id,
      createdInvoice.hrefForInvoice,
      orderId1c
    );

    if (!updateOrder) {
      throw new NotFoundException('Не удалось создать счет на оплату');
    }

    const hrefForInvoice = await this.generateInvoiceService.getPdfHref(
      updateOrder.hrefForInvoice,
      'invoices'
    );

    const orderForEmail = new OrderDTO(
      updateOrder.id,
      this.mapUserToUserDTO(order.user),
      updateOrder.userCompany_name,
      updateOrder.userCompany_urAddress,
      updateOrder.userCompany_inn,
      updateOrder.userCompany_kpp,
      updateOrder.userCompany_ogrn,
      updateOrder.userCompany_checkingAccount,
      updateOrder.userCompany_bankName,
      updateOrder.userCompany_bikBank,
      updateOrder.userCompany_correspondentAccount,
      // updateOrder.shippingAddress,
      updateOrder.paymentMethod,
      updateOrder.cart,
      updateOrder.totalAmount,
      updateOrder.total,
      updateOrder.discount,
      (updateOrder.inOneC = true),
      (updateOrder.state = StateOrder.created),
      updateOrder.currentID,
      updateOrder.hrefForInvoice,
      updateOrder.registred.toString(),
      (updateOrder.id1c = orderId1c)
    );

    await this.sendOrderConfirmationUser(orderForEmail);
    await this.sendOrderConfirmationAdmin(orderForEmail);

    await this.clearCart(orderForEmail.user.id);

    this.AppLoggerLoki.log(
      `Создали инвойс и обновили заказ ${updateOrder.id}`,
      'api'
    );
    return hrefForInvoice;
  }
}
