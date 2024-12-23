import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  ChangeCartItemDTO,
  ICart,
  ICartItem,
  ITransformedProduct,
} from '@erist-opt/shared';
import { RedisService } from '@erist-opt/redis';
import { ProductUserService } from '@erist-opt/product';
import { randomUUID } from 'crypto';
import { AppLoggerLoki } from '@erist-opt/logs';

@Injectable()
export class CartService {
  constructor(
    private readonly redisService: RedisService,
    private readonly productService: ProductUserService, // private readonly optionService: OptionService
    private AppLoggerLoki: AppLoggerLoki
  ) {}

  /**
   * Возвращает корзину пользователя по его ID.
   * @param userId Идентификатор пользователя.
   * @returns {Promise<ICart>} Промис с объектом корзины.
   * @throws {NotFoundException} Если корзина не найдена.
   */
  async getCart(userId: string): Promise<ICart> {
    try {
      const cart = await this.redisService.getCartData(userId);
      if (!cart) {
        this.AppLoggerLoki.error(
          `Корзина не найдена для пользователя ID=${userId}`,
          'api'
        );
        throw new NotFoundException('Корзина не найдена');
      }
      this.AppLoggerLoki.log(
        `Корзина успешно возвращена для пользователя ID=${userId}`,
        'api'
      );
      return cart;
    } catch (error) {
      this.AppLoggerLoki.error(
        `Ошибка при возврате корзины для пользователя ID=${userId}: ${error.message}`,
        'api'
      );
      throw error;
    }
  }

  /**
   * Добавляет товар в корзину пользователя.
   * @param userId Идентификатор пользователя.
   * @param input Входные данные для добавления товара в корзину.
   * @returns {Promise<ChangeCartItemDTO>} Промис с результатом добавления товара (true).
   * @throws {NotFoundException} Если товар или корзина не найдены.
   * @throws {BadRequestException} Если запрошенное количество товара превышает доступное количество.
   */
  async addToCart(
    userId: string,
    input: ICartItem
  ): Promise<ChangeCartItemDTO> {
    let cart: ICart | null;
    try {
      cart = await this.redisService.getCartData(userId);
      if (!cart) {
        cart = {
          items: [],
          totalAmount: 0,
          discount: 0,
          total: 0,
          percentDiscount: 0,
          messageError: '',
          canCheckout: false,
        };
        this.AppLoggerLoki.log(
          `Создана новая корзина для пользователя ID=${userId}`,
          'api'
        );
      }

      const product = await this.productService.findOneById(input.productId);
      if (!product) {
        this.AppLoggerLoki.error(
          `Товар с ID ${input.productId} не найден`,
          'api'
        );
        throw new NotFoundException(`Товар с ID ${input.productId} не найден`);
      }

      if (input.quantity > product.quantity) {
        this.AppLoggerLoki.error(
          `Запрошенное количество товара превышает доступное для товара ID=${input.productId}, свободно ${product.quantity}`,
          'api'
        );
        throw new BadRequestException(
          `Такого количества товара нет в наличии, свободно ${product.quantity}`
        );
      }

      let optionName: string | undefined;
      let availableQuantity: number;
      // let optionValueId: string | undefined;
      let optionProductValueId: string | undefined;

      if (input.optionValueId && input.optionId) {
        const option = product.options.find((opt) => opt.id === input.optionId);
        if (!option) {
          this.AppLoggerLoki.error(
            `Опция с ID ${input.optionId} не найдена для товара ID=${input.productId}`,
            'api'
          );
          throw new BadRequestException(`Такой опции у товара не существует`);
        }

        const optionValue = option.values.find(
          (val) => val.id === input.optionValueId
        );
        if (!optionValue) {
          this.AppLoggerLoki.error(
            `Значение опции с ID ${input.optionValueId} не найдено для товара ID=${input.productId}`,
            'api'
          );
          throw new BadRequestException(`Такой опции у товара не существует`);
        }

        optionProductValueId = optionValue.value.id;
        optionName = optionValue.value.name;
        // optionValueId = optionValue.id;
        availableQuantity = optionValue.quantity;

        const optionQuantityInCart = cart.items
          .filter(
            (item) =>
              item.productId === input.productId &&
              item.optionId === input.optionId &&
              item.optionValueId === input.optionValueId
          )
          .reduce((total, item) => total + item.quantity, 0);

        if (input.quantity > optionValue.quantity - optionQuantityInCart) {
          this.AppLoggerLoki.error(
            `Запрошенное количество товара с опцией "${option.name}" и значением "${optionValue.value.name}" превышает доступное для товара ID=${input.productId}`,
            'api'
          );
          throw new BadRequestException(
            `Такого количества товара с опцией "${option.name}" и значением "${
              optionValue.value.name
            }" нет в наличии, свободно ${
              (optionQuantityInCart - optionValue.quantity) * -1
            }`
          );
        }
      } else {
        availableQuantity = product.quantity;
      }

      const existingItem = cart.items.find(
        (item) =>
          item.productId === input.productId &&
          item.optionValueId === input.optionValueId
      );

      if (existingItem) {
        const availableQuantity = product.quantity - existingItem.quantity;

        if (input.quantity > availableQuantity) {
          this.AppLoggerLoki.error(
            `Запрошенное количество товара без опции превышает доступное для товара ID=${input.productId}, свободно ${availableQuantity}`,
            'api'
          );
          throw new BadRequestException(
            `Такого количества товара без опции нет в наличии, свободно ${availableQuantity}`
          );
        }
        existingItem.quantity += input.quantity;
      } else {
        if (input.quantity > product.quantity) {
          this.AppLoggerLoki.error(
            `Запрошенное количество товара без опции превышает доступное для товара ID=${input.productId}, свободно ${product.quantity}`,
            'api'
          );
          throw new BadRequestException(
            `Такого количества товара без опции нет в наличии, свободно ${product.quantity}`
          );
        }

        cart.items.push({
          id: randomUUID(),
          productId: input.productId,
          quantity: input.quantity,
          optionId: input.optionId,
          optionValueId: input.optionValueId,
          product: {
            id: product.id,
            model: product.model,
            price: product.price,
            name: product.description.name,
            image: product.images[0]
              ? product.images[0].image
              : 'https://static.erist.store/images/no_image_product.webp',
            optionName: optionName,
            optionValueId: input.optionValueId ?? '', // Указано в интерфейсе как обязательное
            optionProductValueId: optionProductValueId,
            availableQuantity: availableQuantity,
          },
          available: true,
        });
        this.AppLoggerLoki.log(
          `Товар добавлен в корзину, ID=${input.productId}`,
          'api'
        );
      }

      const { total, discount, totalAmount, percentDiscount } =
        await this.calculateTotalAmount(cart.items);
      cart.total = total;
      cart.discount = discount;
      cart.totalAmount = totalAmount;
      cart.percentDiscount = percentDiscount;

      await this.redisService.setCartData(userId, cart);
      this.AppLoggerLoki.log(
        `Корзина обновлена для пользователя ID=${userId}`,
        'api'
      );

      const data: ChangeCartItemDTO = {
        status: true,
        quantity: await this.calculateTotalQuantity(cart.items),
      };
      return data;
    } catch (error) {
      this.AppLoggerLoki.error(
        `Ошибка при добавлении товара в корзину для пользователя ID=${userId}: ${error.message}`,
        'api'
      );

      const data: ChangeCartItemDTO = {
        status: false,
        quantity: cart ? await this.calculateTotalQuantity(cart.items) : 0,
      };
      return data;
    }
  }

  /**
   * Рассчитывает общую сумму, скидку и итоговую сумму для всех товаров в корзине.
   * @param items Список товаров в корзине.
   * @returns {Promise<number>} Промис с цифрой количества товаров
   */
  private async calculateTotalQuantity(items: ICartItem[]): Promise<number> {
    try {
      let totalAmount = 0;

      for (const item of items) {
        const product = await this.productService.findOneById(item.productId);
        if (!product) {
          this.AppLoggerLoki.error(
            `Товар с ID ${item.productId} не найден при расчете общей суммы`,
            'api'
          );
          throw new NotFoundException(`Товар с ID ${item.productId} не найден`);
        }
        totalAmount += item.quantity;
      }
      return totalAmount || 0;
    } catch (error) {
      this.AppLoggerLoki.error(
        `Ошибка при расчете общей суммы корзины: ${error.message}`,
        'api'
      );
      return 0;
    }
  }

  /**
   * Рассчитывает общее количество товара в корзине.
   * @param items Список товаров в корзине.
   * @returns {Promise<{ total: number; discount: number; totalAmount: number }>} Промис с объектом, содержащим общую сумму, скидку и итоговую сумму.
   */
  private async calculateTotalAmount(items: ICartItem[]): Promise<{
    total: number;
    discount: number;
    totalAmount: number;
    percentDiscount: number;
  }> {
    try {
      let totalAmount = 0;

      for (const item of items) {
        const product = await this.productService.findOneById(item.productId);
        if (!product) {
          this.AppLoggerLoki.error(
            `Товар с ID ${item.productId} не найден при расчете общей суммы`,
            'api'
          );
          throw new NotFoundException(`Товар с ID ${item.productId} не найден`);
        }
        totalAmount += item.quantity * product.price;
      }

      let discount = 0;
      let total = totalAmount;
      let percentDiscount = 0;

      if (totalAmount >= 150000) {
        percentDiscount = 15;
        discount = totalAmount * 0.15; // 15% от totalAmount
        total = totalAmount - discount; // Учитываем скидку для общей суммы
      } else if (totalAmount >= 80000) {
        percentDiscount = 7;
        discount = totalAmount * 0.07; // 7% от totalAmount
        total = totalAmount - discount; // Учитываем скидку для общей суммы
      }

      this.AppLoggerLoki.log(
        `Рассчитаны общая сумма ${totalAmount}, скидка ${discount}, итоговая сумма ${total}`,
        'api'
      );

      return {
        total: Math.round(Number(total)),
        discount: Math.round(Number(discount)),
        totalAmount: Math.round(Number(totalAmount)),
        percentDiscount,
      };
    } catch (error) {
      this.AppLoggerLoki.error(
        `Ошибка при расчете общей суммы корзины: ${error.message}`,
        'api'
      );
      throw error;
    }
  }

  /**
   * Обновляет информацию о товарах в корзине, проверяя их доступность и количество.
   * @param cart Объект корзины пользователя.
   * @returns {Promise<ICart>} Промис с обновленным объектом корзины.
   */
  async updateCartItems(cart: ICart): Promise<ICart> {
    let canCheckout = true;
    cart.messageError = ``;

    if (cart.items.length <= 0) {
      this.AppLoggerLoki.warn(
        `Нельзя оформить заказ из-за того что нет товаров в корзине`,
        'api'
      );
      cart.messageError = `Добавьте товары в корзину, чтобы оформить заказ`;
      canCheckout = false;
    }

    if (cart.totalAmount <= 50000) {
      this.AppLoggerLoki.warn(`Минимальная сумма заказа  0000 ₽`, 'api');
      canCheckout = false;
      cart.messageError = `Минимальная сумма заказа 50.000 ₽`;
    }

    const updatedItems = await Promise.all(
      cart.items.map(async (item) => {
        const product = await this.productService.findOneById(item.productId);

        if (!product) {
          this.AppLoggerLoki.warn(
            `Нельзя оформить заказ из-за того что нет товара в базе`,
            'api'
          );
          cart.messageError = `Товар ${item.product.name} не найден`;
          canCheckout = false;
          return {
            id: item.id,
            productId: item.productId,
            quantity: item.quantity,
            optionId: item.optionId,
            optionValueId: item.optionValueId,
            product: {
              id: item.product.id,
              model: item.product.model,
              price: item.product.price,
              image:
                item.product.image ||
                'https://static.erist.store/images/no_image_product.webp',
              name: item.product.name,
              optionName: item.product.optionName,
              optionValueId: item.optionValueId,
              availableQuantity: 0,
            },
            available: false,
          };
        }

        let checkResult;

        if (item.optionId && item.optionValueId) {
          checkResult = await this.checkOptionAvailability(product, item, cart);
        } else {
          checkResult = await this.checkProductAvailability(
            product,
            item,
            cart
          );
        }
        if (checkResult.availableQuantity < 0) {
          this.AppLoggerLoki.warn(
            `Нельзя оформить заказ из-за того что нет товара в наличии productID=${product.id}`,
            'api'
          );
          cart.messageError = `Один или несколько товаров недоступны для заказа`;
          // cart.messageError = `Товара "${product.description.name}" нет в нужном количестве на складе`;
          canCheckout = false;
        }
        return {
          id: item.id,
          productId: item.productId,
          quantity: item.quantity,
          optionId: item.optionId,
          optionValueId: item.optionValueId,
          product: {
            id: item.product.id,
            model: item.product.model,
            price: item.product.price,
            image:
              item.product.image ||
              'https://static.erist.store/images/no_image_product.webp',
            name: item.product.name,
            optionName: item.product.optionName,
            optionValueId: item.optionValueId,
            availableQuantity: checkResult.availableQuantity,
          },
          available: checkResult.available,
        };
      })
    );
    this.AppLoggerLoki.log(`Вернули корзину все ОК`, 'api');
    return {
      ...cart,
      items: updatedItems,
      canCheckout,
    };
  }

  /**
   * Удаляет товар из корзины пользователя по ID элемента корзины.
   * @param userId Идентификатор пользователя.
   * @param itemId Идентификатор элемента корзины.
   * @returns {Promise<boolean>} Промис с результатом удаления товара (true).
   * @throws {NotFoundException} Если корзина или элемент корзины не найдены.
   */
  async removeFromCart(
    userId: string,
    itemId: string
  ): Promise<ChangeCartItemDTO> {
    const cart = await this.redisService.getCartData(userId);
    if (!cart) {
      this.AppLoggerLoki.warn(
        `Невозможно удалить корзину, так как ее не существует`,
        'api'
      );
      throw new NotFoundException('Корзина не найдена');
    }
    try {
      const itemIndex = cart.items.findIndex((item) => item.id === itemId);

      if (itemIndex === -1) {
        this.AppLoggerLoki.error(
          `Элемент корзины с ID ${itemId}  не найден в корзине`,
          'api'
        );

        throw new NotFoundException(
          `Элемент корзины с ID ${itemId}  не найден в корзине`
        );
      }

      cart.items.splice(itemIndex, 1);

      const { total, discount, totalAmount, percentDiscount } =
        await this.calculateTotalAmount(cart.items);
      cart.total = total;
      cart.discount = discount;
      cart.totalAmount = totalAmount;
      cart.percentDiscount = percentDiscount;

      await this.redisService.setCartData(userId, cart);

      const data: ChangeCartItemDTO = {
        status: true,
        quantity: await this.calculateTotalQuantity(cart.items),
      };
      return data;
    } catch (error) {
      const data: ChangeCartItemDTO = {
        status: true,
        quantity: await this.calculateTotalQuantity(cart.items),
      };
      return data;
    }
  }

  /**
   * Обновляет количество товара в корзине пользователя.
   * @param userId Идентификатор пользователя.
   * @param itemId Идентификатор элемента корзины.
   * @param quantity Новое количество товара.
   * @returns {Promise<boolean>} Промис с результатом обновления количества товара (true).
   * @throws {NotFoundException} Если корзина или элемент корзины не найдены.
   * @throws {BadRequestException} Если запрошенное количество товара превышает доступное количество или равно нулю.
   */
  async updateCartItemQuantity(
    userId: string,
    itemId: string,
    quantity: number
  ): Promise<ChangeCartItemDTO> {
    const cart = await this.redisService.getCartData(userId);

    if (!cart) {
      this.AppLoggerLoki.error(
        `Корзина не найдена при обновлении количества товара`,
        'api'
      );
      throw new NotFoundException('Корзина не найдена');
    }

    const item = cart.items.find((i) => i.id === itemId);

    if (!item) {
      this.AppLoggerLoki.error(
        `Элемент корзины с ID ${itemId} не найден`,
        'api'
      );
      throw new NotFoundException(`Элемент корзины с ID ${itemId} не найден`);
    }

    const product = await this.productService.findOneById(item.productId);

    if (!product) {
      this.AppLoggerLoki.error(`Товар с ID ${item.productId} не найден`, 'api');
      throw new NotFoundException(`Товар с ID ${item.productId} не найден`);
    }

    if (quantity <= 0) {
      this.AppLoggerLoki.error(`Количество товара должно быть больше 0`, 'api');
      throw new BadRequestException(`Количество товара должно быть больше 0`);
    }

    if (quantity > product.quantity) {
      this.AppLoggerLoki.error(
        `Такого количества товара нет в наличии, свободно productID=${product.id}`,
        'api'
      );
      throw new BadRequestException(
        `Такого количества товара нет в наличии, свободно ${product.quantity}`
      );
    }

    let availableQuantity: number;

    if (item.optionId && item.optionValueId) {
      const option = product.options.find((opt) => opt.id === item.optionId);

      if (!option) {
        this.AppLoggerLoki.error(
          `Опции у товара не существует productID=${product.id}`,
          'api'
        );
        throw new BadRequestException(`Такой опции у товара не существует`);
      }

      const optionValue = option.values.find(
        (val) => val.id === item.optionValueId
      );

      if (!optionValue) {
        this.AppLoggerLoki.error(
          `Опции у товара не существует productID=${product.id}`,
          'api'
        );
        throw new BadRequestException(`Такой опции у товара не существует`);
      }

      const optionQuantityInCart = cart.items
        .filter(
          (i) =>
            i.productId === item.productId &&
            i.optionId === item.optionId &&
            i.optionValueId === item.optionValueId &&
            i.id !== itemId
        )
        .reduce((total, i) => total + i.quantity, 0);

      if (quantity > optionValue.quantity - optionQuantityInCart) {
        this.AppLoggerLoki.error(
          `Такого количества товара с опцией "${option.name}" и значением "${
            optionValue.value.name
          }" нет в наличии, свободно ${
            optionValue.quantity - optionQuantityInCart
          }`,
          'api'
        );
        throw new BadRequestException(
          `Такого количества товара с опцией "${option.name}" и значением "${
            optionValue.value.name
          }" нет в наличии, свободно ${
            optionValue.quantity - optionQuantityInCart
          }`
        );
      }

      availableQuantity = optionValue.quantity - optionQuantityInCart;
    } else {
      const quantityInCart = cart.items
        .filter(
          (i) =>
            i.productId === item.productId && !i.optionId && i.id !== itemId
        )
        .reduce((total, i) => total + i.quantity, 0);

      availableQuantity = product.quantity - quantityInCart;
    }

    if (quantity > availableQuantity) {
      this.AppLoggerLoki.error(
        `Такого количества товара без опции нет в наличии, свободно ${availableQuantity}`,
        'api'
      );
      throw new BadRequestException(
        `Такого количества товара без опции нет в наличии, свободно ${availableQuantity}`
      );
    }

    item.quantity = quantity;

    const { total, discount, totalAmount, percentDiscount } =
      await this.calculateTotalAmount(cart.items);

    cart.total = total;
    cart.discount = discount;
    cart.totalAmount = totalAmount;
    cart.percentDiscount = percentDiscount;

    await this.redisService.setCartData(userId, cart);

    const cartNew = await this.redisService.getCartData(userId);

    const data: ChangeCartItemDTO = {
      status: true,
      quantity: cartNew
        ? await this.calculateTotalQuantity(cartNew.items)
        : await this.calculateTotalQuantity(cart.items),
    };
    return data;
  }

  /**
   * Очищает корзину пользователя, удаляя все товары.
   * @param userId Идентификатор пользователя.
   * @returns {Promise<boolean>} Промис с результатом очистки корзины (true).
   * @throws {NotFoundException} Если корзина не найдена.
   */
  async clearCart(userId: string): Promise<boolean> {
    const cart = await this.redisService.getCartData(userId);

    if (!cart) {
      this.AppLoggerLoki.error(`Корзина не найдена при очистке`, 'api');
      throw new NotFoundException('Корзина не найдена');
    }

    cart.items = [];

    cart.total = 0;
    cart.discount = 0;
    cart.totalAmount = 0;
    cart.percentDiscount = 0;
    cart.canCheckout = false;

    await this.redisService.setCartData(userId, cart);

    return true;
  }

  /**
   * Проверяет доступность товара с указанными опциями.
   * @param product Объект товара.
   * @param item Объект элемента корзины.
   * @param cart Объект корзины пользователя.
   * @returns {Promise<{ available: boolean; availableQuantity: number }>} Промис с объектом, содержащим доступность и доступное количество товара.
   */
  private async checkOptionAvailability(
    product: ITransformedProduct,
    item: ICartItem,
    cart: ICart
  ) {
    const option = product.options.find((opt) => opt.id === item.optionId);
    const optionValue = option?.values.find(
      (val) => val.id === item.optionValueId
    );
    let available = true;
    let availableQuantity = 0;

    if (!option || !optionValue) {
      available = false;
    } else {
      const quantityInCart = cart.items
        .filter(
          (i) =>
            i.productId === item.productId &&
            i.optionId === item.optionId &&
            i.optionValueId === item.optionValueId
        )
        .reduce((total, i) => total + i.quantity, 0);

      availableQuantity = optionValue.quantity - quantityInCart;

      // console.warn({ availableQuantity });
      // console.warn(item.quantity);

      if (availableQuantity < 0) {
        available = false;
      }
    }

    return { available, availableQuantity };
  }

  /**
   * Проверяет доступность товара без указанных опций.
   * @param product Объект товара.
   * @param item Объект элемента корзины.
   * @param cart Объект корзины пользователя.
   * @returns {Promise<{ available: boolean; availableQuantity: number }>} Промис с объектом, содержащим доступность и доступное количество товара.
   */
  private async checkProductAvailability(
    product: ITransformedProduct,
    item: ICartItem,
    cart: ICart
  ) {
    const quantityInCart = cart.items
      .filter((i) => i.productId === item.productId && !i.optionId)
      .reduce((total, i) => total + i.quantity, 0);

    const availableQuantity = product.quantity - quantityInCart;
    const available = availableQuantity >= item.quantity;

    return { available, availableQuantity };
  }

  /**
   * Возвращает информацию о товаре по его ID.
   * @param productId Идентификатор товара.
   * @returns {Promise<ITransformedProduct>} Промис с объектом товара.
   */
  async getProductById(productId: string): Promise<ITransformedProduct> {
    return this.productService.findOneById(productId);
  }

  async findOptionIdByValue(id: string): Promise<string | null> {
    const optionId = await this.productService.findOptionIdByValue(id);
    if (!optionId) {
      return null;
    }
    return optionId;
  }
}
