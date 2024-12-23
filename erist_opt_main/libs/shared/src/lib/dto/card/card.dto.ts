import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsOptional, IsUUID, Min } from 'class-validator';
import { ICart, ICartItem, ICartItemDetail } from '../../interfaces';
import { HttpExceptionMessagesGraphQL } from '../../http-exceptions-messages';

@ObjectType({ description: 'Описание товара в корзине' })
export class CartProductDTO {
  @Field({ description: 'Уникальный идентификатор товара' })
  id: string;

  @Field({ description: 'Модель товара' })
  model: string;

  @Field({ description: 'Цена товара' })
  price: number;

  @Field({ description: 'Наименование товара' })
  name: string;

  @Field({ description: 'Изображение товара', nullable: true })
  image: string;

  @Field({
    nullable: true,
    description: 'Наименование выбранной опции (если есть)',
  })
  optionName?: string;

  @Field({
    nullable: true,
    description: 'ID выбранной ного занчения опции (если есть)',
  })
  optionValueId?: string;

  @Field({ nullable: true, description: 'Доступное количество товара' })
  availableQuantity: number;

  constructor(
    id: string,
    model: string,
    price: number,
    name: string,
    image: string,
    availableQuantity: number,
    optionName?: string
  ) {
    this.id = id;
    this.model = model;
    this.price = price;
    this.name = name;
    this.image = image;
    this.availableQuantity = availableQuantity;
    this.optionName = optionName;
  }
}

@ObjectType({ description: 'Элемент корзины с товарами' })
export class CartItemDetailDTO implements ICartItemDetail {
  @Field({ description: 'Уникальный идентификатор элемента корзины' })
  id: string;

  @Field({ description: 'Идентификатор товара' })
  productId: string;

  @Field({ description: 'Количество товара в корзине' })
  quantity: number;

  @Field({
    nullable: true,
    description: 'Идентификатор выбранной опции (если есть)',
  })
  optionId?: string;

  @Field(() => CartProductDTO, { description: 'Детали товара' })
  product: CartProductDTO;

  @Field({ description: 'Доступен ли товар для покупки' })
  available: boolean;

  constructor(
    id: string,
    productId: string,
    quantity: number,
    product: CartProductDTO,
    available: boolean,
    optionId?: string
  ) {
    this.id = id;
    this.productId = productId;
    this.quantity = quantity;
    this.product = product;
    this.available = available;
    this.optionId = optionId;
  }
}

@ObjectType({ description: 'Корзина' })
export class CartDTO implements ICart {
  @Field(() => [CartItemDetailDTO], {
    description: 'Список элементов в корзине',
  })
  items: CartItemDetailDTO[];

  @Field({ description: 'Общая сумма товаров в корзине' })
  totalAmount: number;

  @Field({ nullable: true, description: 'Скидка на общую сумму (если есть)' })
  discount?: number;

  @Field({ description: 'Итоговая сумма к оплате' })
  total: number;

  @Field({ description: 'Размер скидки в процентах', nullable: true })
  percentDiscount: number;

  @Field({ description: 'Возможность оформления заказа' })
  canCheckout: boolean;

  @Field({ description: 'Сообщение об ошибке если есть', nullable: true })
  messageError: string;

  constructor(
    items: CartItemDetailDTO[],
    totalAmount: number,
    total: number,
    canCheckout: boolean,
    messageError: string,
    percentDiscount: number,
    discount?: number
  ) {
    this.items = items;
    this.totalAmount = totalAmount;
    this.total = total;
    this.canCheckout = canCheckout;
    this.messageError = messageError;
    this.percentDiscount = percentDiscount;
    this.discount = discount;
  }
}

@InputType({ description: 'Инпут для добавления товара в корзину' })
export class AddToCartInput implements ICartItem {
  @IsNotEmpty({
    message: 'Укажите ID товара!',
  })
  @IsUUID('4', {
    message: 'ID товара должен быть в формате UUID!',
  })
  @Field({
    nullable: false,
    description: 'ID товара',
  })
  productId: string;

  @IsNotEmpty({
    message: 'Укажите количество товара!',
  })
  @IsInt({
    message: 'Количество товара должно быть целым числом!',
  })
  @Min(1, {
    message: 'Количество товара должно быть не меньше 1!',
  })
  @Field({
    nullable: false,
    description: 'Количество товара',
  })
  quantity: number;

  @IsOptional()
  @Field({
    nullable: true,
    description: 'Тут передавать ID значение,options.values[...].id',
  })
  optionValueId: string;

  constructor(productId: string, quantity: number, optionValueId: string) {
    this.productId = productId;
    this.quantity = quantity;
    this.optionValueId = optionValueId;
  }
}

@ObjectType({ description: 'Товар в оформлении заказа' })
export class CartInput implements ICartItem {
  @Field({
    nullable: false,
    description: 'ID товара',
  })
  productId: string;

  @Field({
    nullable: false,
    description: 'Количество товара',
  })
  quantity: number;

  @Field({
    nullable: true,
    description: 'ID значения опции,options.values[...].id',
  })
  optionValueId: string;

  constructor(productId: string, quantity: number, optionValueId: string) {
    this.productId = productId;
    this.quantity = quantity;
    this.optionValueId = optionValueId;
  }
}

@ObjectType({ description: 'При изменении товара в корзине' })
export class ChangeCartItemDTO {
  @Field({
    nullable: false,
    description: 'ID товара',
  })
  status: boolean;

  @Field({
    nullable: false,
    description: 'Количество товара в корзине',
  })
  quantity: number;

  constructor(status: boolean, quantity: number) {
    this.status = status;
    this.quantity = quantity;
  }
}

@InputType({ description: 'DTO для обновления товара' })
export class UpdateCartItemQuantityInput {
  @IsNotEmpty({
    message: 'Укажите ID элемента корзины!',
  })
  @Field({
    nullable: false,
    description: 'ID элемента корзины',
  })
  itemId: string;

  @IsNotEmpty({
    message: 'Укажите количество товара!',
  })
  @IsInt({
    message: 'Количество товара должно быть целым числом!',
  })
  @Min(1, {
    message: 'Количество товара должно быть больше нуля!',
  })
  @Field({
    nullable: false,
    description: 'Количество товара',
  })
  quantity: number;

  constructor(itemId: string, quantity: number) {
    this.itemId = itemId;
    this.quantity = quantity;
  }
}

@InputType({ description: 'DTO для удаления элемента корзины' })
export class RemoveFromCartInput {
  @IsNotEmpty({
    message: 'Укажите ID элемента корзины!',
  })
  @Field({
    nullable: false,
    description: 'ID элемента корзины',
  })
  itemId: string;

  constructor(itemId: string) {
    this.itemId = itemId;
  }
}

@InputType({
  description: 'Инпут для добавления товара в корзину после заказа 1с',
})
export class CartInputToOrder1c {
  @Field({
    nullable: false,
    description: 'ID товара',
  })
  productId: string;

  @Field({
    nullable: false,
    description: 'ID товара в 1с',
  })
  productId1c: string;

  @Field({
    nullable: false,
    description: 'Количество товара',
  })
  quantity: number;

  @Field({
    nullable: false,
    description: 'Цена товара',
  })
  price: number;

  @Field({
    nullable: false,
    description: 'id значения опции в 1с',
  })
  optionValueIdIn1c: string;

  @Field({
    nullable: true,
    description: 'Тут передавать ID значение,options.values[...].id',
  })
  optionValueId: string;

  constructor(
    productId: string,
    productId1c: string,
    quantity: number,
    price: number,
    optionValueId: string,
    optionValueIdIn1c: string
  ) {
    this.productId = productId;
    this.productId1c = productId1c;
    this.quantity = quantity;
    this.price = price;
    this.optionValueId = optionValueId;
    this.optionValueIdIn1c = optionValueIdIn1c;
  }
}
