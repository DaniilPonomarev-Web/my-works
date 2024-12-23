import {
  // IsString,
  // IsNotEmpty,
  // IsNumber,
  // IsArray,
  // ValidateNested,
  IsOptional,
} from 'class-validator';
import { Field, Float, ID, InputType, ObjectType } from '@nestjs/graphql';
import { UserDTOForOrder } from '../user';
import { CartInput, CartInputToOrder1c } from '../card';
import { StateOrder } from '../../types';
// import { IInputOrder } from '../../interfaces';

// @InputType({ description: 'Данные для создания заказа' })
// export class CreateOrderDTO implements IInputOrder {
//   @Field(() => ID, { description: 'Идентификатор адреса доставки' })
//   @IsString()
//   @IsNotEmpty()
//   shippingAddressId: string;
//   constructor(shippingAddressId: string) {
//     this.shippingAddressId = shippingAddressId;
//   }
// }
@ObjectType({ description: 'Описание товара в заказе' })
export class OrderProductDTO {
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

  @Field({ nullable: true, description: 'Доступное количество товара' })
  quantity: number;

  constructor(
    id: string,
    model: string,
    price: number,
    name: string,
    image: string,
    quantity: number,
    optionName?: string
  ) {
    this.id = id;
    this.model = model;
    this.price = price;
    this.name = name;
    this.image = image;
    this.quantity = quantity;
    this.optionName = optionName;
  }
}

@ObjectType({ description: 'Заказ пользователя' })
export class OrderDTO {
  @Field(() => ID, { description: 'Уникальный идентификатор заказа' })
  id: string;

  @Field(() => UserDTOForOrder, {
    description: 'Пользователь, сделавший заказ',
  })
  user: UserDTOForOrder;

  @Field(() => String, { description: 'Наименование компании' })
  userCompany_name: string;

  @Field(() => String, { description: 'Юридический адрес компании' })
  userCompany_urAddress: string;

  @Field(() => String, { description: 'ИНН компании' })
  userCompany_inn: string;

  @Field(() => String, { description: 'КПП компании', nullable: true })
  userCompany_kpp: string | null;

  @Field(() => String, { description: 'ОГРН(-ИП) компании' })
  userCompany_ogrn: string;

  @Field(() => String, { description: 'Расчетный счет' })
  userCompany_checkingAccount: string;

  @Field(() => String, { description: 'Название банка' })
  userCompany_bankName: string;

  @Field(() => String, { description: 'БИК банка' })
  userCompany_bikBank: string;

  @Field(() => String, { description: 'Корреспондентский счет' })
  userCompany_correspondentAccount: string;

  // @Field({ description: 'Адрес доставки одной строкой' })
  // shippingAddress: string;

  @Field({ description: 'Способ оплаты' })
  paymentMethod: string;

  @Field(() => [CartInput], { description: 'Товары в заказе' })
  cart: CartInput[];

  @Field(() => Float, { description: 'Общая сумма товаров в заказе' })
  totalAmount: number;

  @Field(() => Float, { nullable: true, description: 'Скидка на сумму заказа' })
  discount: number | null;

  @Field(() => Float, { description: 'Итоговая сумма заказа' })
  total: number;

  @Field(() => Boolean, {
    description: 'Выгружен ли в 1с',
    defaultValue: false,
  })
  inOneC: boolean;

  @Field(() => String, {
    description: 'Статус заказа',
    defaultValue: StateOrder.created,
  })
  state: StateOrder;

  @Field(() => Float, {
    description: 'счетчик заказов',
  })
  currentID: number;

  @Field(() => String, {
    description: 'Ссылка на ордер в minio',
    defaultValue: null,
    nullable: true,
  })
  hrefForInvoice: string;

  @Field(() => String, {
    description: 'Дата создания заказа',
    nullable: false,
  })
  registred: string;

  @Field(() => String, {
    description: 'ID заказа в 1с',
    nullable: true,
    defaultValue: null,
  })
  id1c: string | null;

  constructor(
    id: string,
    user: UserDTOForOrder,
    userCompany_name: string,
    userCompany_urAddress: string,
    userCompany_inn: string,
    userCompany_kpp: string | null,
    userCompany_ogrn: string,
    userCompany_checkingAccount: string,
    userCompany_bankName: string,
    userCompany_bikBank: string,
    userCompany_correspondentAccount: string,
    // shippingAddress: string,
    paymentMethod: string,
    cart: CartInput[],
    totalAmount: number,
    total: number,
    discount: number | null,
    inOneC: boolean,
    state: StateOrder,
    currentID: number,
    hrefForInvoice: string,
    registred: string,
    id1c: string | null
  ) {
    this.id = id;
    this.user = user;
    this.userCompany_name = userCompany_name;
    this.userCompany_urAddress = userCompany_urAddress;
    this.userCompany_inn = userCompany_inn;
    this.userCompany_kpp = userCompany_kpp;
    this.userCompany_ogrn = userCompany_ogrn;
    this.userCompany_bankName = userCompany_bankName;
    this.userCompany_bikBank = userCompany_bikBank;
    this.userCompany_checkingAccount = userCompany_checkingAccount;
    this.userCompany_correspondentAccount = userCompany_correspondentAccount;
    // this.shippingAddress = shippingAddress;
    this.paymentMethod = paymentMethod;
    this.cart = cart;
    this.totalAmount = totalAmount;
    this.total = total;
    this.discount = discount;
    this.inOneC = inOneC;
    this.state = state;
    this.currentID = currentID;
    this.hrefForInvoice = hrefForInvoice;
    this.registred = registred;
    this.id1c = id1c;
  }
}

@ObjectType({
  description: 'Заказ пользователя c товарами и адресом для личного кабинета',
})
export class OrderWithProductsDTO {
  @Field(() => ID, { description: 'Уникальный идентификатор заказа' })
  id: string;

  @Field(() => String, { description: 'Наименование компании' })
  userCompany_name: string;

  @Field(() => String, { description: 'Юридический адрес компании' })
  userCompany_urAddress: string;

  @Field(() => String, { description: 'ИНН компании' })
  userCompany_inn: string;

  @Field(() => String, { description: 'КПП компании', nullable: true })
  userCompany_kpp: string | null;

  @Field(() => String, { description: 'ОГРН(-ИП) компании' })
  userCompany_ogrn: string;

  @Field(() => String, { description: 'Расчетный счет' })
  userCompany_checkingAccount: string;

  @Field(() => String, { description: 'Название банка' })
  userCompany_bankName: string;

  @Field(() => String, { description: 'БИК банка' })
  userCompany_bikBank: string;

  @Field(() => String, { description: 'Корреспондентский счет' })
  userCompany_correspondentAccount: string;

  // @Field({ description: 'Адрес доставки одной строкой', nullable: true })
  // address: string;

  @Field({ description: 'Способ оплаты' })
  paymentMethod: string;

  @Field(() => [OrderProductDTO], { description: 'Товары в заказе' })
  products: OrderProductDTO[];

  @Field(() => Float, { description: 'Общая сумма товаров в заказе' })
  totalAmount: number;

  @Field(() => Float, { nullable: true, description: 'Скидка на сумму заказа' })
  discount: number | null;

  @Field(() => Float, { description: 'Итоговая сумма заказа' })
  total: number;

  @Field(() => Boolean, { description: 'Выгружен ли в 1с' })
  inOneC: boolean;

  @Field(() => String, {
    description: 'Статус заказа',
    defaultValue: StateOrder.created,
  })
  state: StateOrder;

  @Field(() => Float, {
    description: 'счетчик заказов',
  })
  currentID: number;

  @Field(() => String, {
    description: 'Ссылка на ордер в minio',
    defaultValue: null,
    nullable: true,
  })
  hrefForInvoice: string | null;

  @Field(() => String, {
    description: 'Дата создания заказа',
    nullable: false,
  })
  registred: string;

  @Field(() => String, {
    description: 'ID заказа в 1с',
    nullable: true,
    defaultValue: null,
  })
  id1c: string | null;

  constructor(
    id: string,
    userCompany_name: string,
    userCompany_urAddress: string,
    userCompany_inn: string,
    userCompany_kpp: string | null,
    userCompany_ogrn: string,
    userCompany_checkingAccount: string,
    userCompany_bankName: string,
    userCompany_bikBank: string,
    userCompany_correspondentAccount: string,
    // address: string,
    paymentMethod: string,
    products: OrderProductDTO[],
    totalAmount: number,
    total: number,
    discount: number | null,
    inOneC: boolean,
    state: StateOrder,
    currentID: number,
    hrefForInvoice: string | null,
    registred: string
  ) {
    this.id = id;
    this.userCompany_name = userCompany_name;
    this.userCompany_urAddress = userCompany_urAddress;
    this.userCompany_inn = userCompany_inn;
    this.userCompany_kpp = userCompany_kpp;
    this.userCompany_ogrn = userCompany_ogrn;
    this.userCompany_bankName = userCompany_bankName;
    this.userCompany_bikBank = userCompany_bikBank;
    this.userCompany_checkingAccount = userCompany_checkingAccount;
    this.userCompany_correspondentAccount = userCompany_correspondentAccount;
    // this.address = address;
    this.paymentMethod = paymentMethod;
    this.products = products;
    this.totalAmount = totalAmount;
    this.total = total;
    this.discount = discount;
    this.inOneC = inOneC;
    this.state = state;
    this.currentID = currentID;
    this.hrefForInvoice = hrefForInvoice;
    this.registred = registred;
  }
}

@ObjectType({ description: 'Список заказов' })
export class OrderListDTO {
  @Field(() => [OrderWithProductsDTO], { description: 'Список заказов' })
  orders: OrderWithProductsDTO[];

  @Field(() => Float, { description: 'Количество заказов' })
  total: number;

  constructor(orders: OrderWithProductsDTO[], total: number) {
    this.orders = orders;
    this.total = total;
  }
}

@InputType({ description: 'Инпут для фильтров заказов' })
export class OrdersFilterDTO {
  @IsOptional()
  @Field(() => Float, {
    nullable: true,
    description: 'Минимальная цена для фильтрации',
  })
  totalAmountFrom: number;

  @IsOptional()
  @Field(() => Float, {
    nullable: true,
    description: 'Максимальная цена для фильтрации',
  })
  totalAmountTo: number;

  @IsOptional()
  @Field({ nullable: true, description: 'Часть имени продукта для фильтрации' })
  productName: string;

  @IsOptional()
  @Field({ nullable: true, description: 'Поиск по номеру заказа' })
  orderNumber: number;

  @IsOptional()
  @Field({ nullable: true, description: 'Дата от' })
  dateFrom: string;

  @IsOptional()
  @Field({ nullable: true, description: 'Дата до' })
  dateTo: string;

  constructor(
    totalAmountFrom: number,
    totalAmountTo: number,
    productName: string,
    orderNumber: number,
    dateFrom: string,
    dateTo: string
  ) {
    this.totalAmountFrom = totalAmountFrom;
    this.totalAmountTo = totalAmountTo;
    this.productName = productName;
    this.orderNumber = orderNumber;
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
  }
}

@ObjectType({ description: 'Заказ пользователя для отправки в 1с' })
export class OrderDTOFor1c {
  @Field(() => ID, { description: 'Уникальный идентификатор заказа' })
  id: string;

  @Field(() => UserDTOForOrder, {
    description: 'Пользователь, сделавший заказ',
  })
  user: UserDTOForOrder;

  @Field(() => String, { description: 'Наименование компании' })
  userCompany_name: string;

  @Field(() => String, { description: 'Юридический адрес компании' })
  userCompany_urAddress: string;

  @Field(() => String, { description: 'ИНН компании' })
  userCompany_inn: string;

  @Field(() => String, { description: 'КПП компании', nullable: true })
  userCompany_kpp: string | null;

  @Field(() => String, { description: 'ОГРН(-ИП) компании' })
  userCompany_ogrn: string;

  @Field(() => String, { description: 'Расчетный счет' })
  userCompany_checkingAccount: string;

  @Field(() => String, { description: 'Название банка' })
  userCompany_bankName: string;

  @Field(() => String, { description: 'БИК банка' })
  userCompany_bikBank: string;

  @Field(() => String, { description: 'Корреспондентский счет' })
  userCompany_correspondentAccount: string;

  // @Field({ description: 'Адрес доставки одной строкой' })
  // shippingAddress: string;

  @Field({ description: 'Способ оплаты' })
  paymentMethod: string;

  @Field(() => [CartInput], { description: 'Товары в заказе' })
  cart: CartInputToOrder1c[];

  @Field(() => Float, { description: 'Общая сумма товаров в заказе' })
  totalAmount: number;

  @Field(() => Float, { nullable: true, description: 'Скидка на сумму заказа' })
  discount: number | null;

  @Field(() => Float, { nullable: true, description: 'Скидка в процентах' })
  discountPerset: number | null;

  @Field(() => Float, { description: 'Итоговая сумма заказа' })
  total: number;

  @Field(() => Boolean, {
    description: 'Выгружен ли в 1с',
    defaultValue: false,
  })
  inOneC: boolean;

  @Field(() => String, {
    description: 'Статус заказа',
    defaultValue: StateOrder.created,
  })
  state: StateOrder;

  @Field(() => Float, {
    description: 'счетчик заказов',
  })
  currentID: number;

  @Field(() => String, {
    description: 'Ссылка на ордер в minio',
    defaultValue: null,
    nullable: true,
  })
  hrefForInvoice: string;

  @Field(() => String, {
    description: 'Дата создания заказа',
    nullable: false,
  })
  registred: string;

  @Field(() => String, {
    description: 'ID заказа в 1с',
    nullable: true,
    defaultValue: null,
  })
  id1c: string | null;

  constructor(
    id: string,
    user: UserDTOForOrder,
    userCompany_name: string,
    userCompany_urAddress: string,
    userCompany_inn: string,
    userCompany_kpp: string | null,
    userCompany_ogrn: string,
    userCompany_checkingAccount: string,
    userCompany_bankName: string,
    userCompany_bikBank: string,
    userCompany_correspondentAccount: string,
    // shippingAddress: string,
    paymentMethod: string,
    cart: CartInputToOrder1c[],
    totalAmount: number,
    total: number,
    discount: number | null,
    discountPerset: number | null,
    inOneC: boolean,
    state: StateOrder,
    currentID: number,
    hrefForInvoice: string,
    registred: string,
    id1c: string | null
  ) {
    this.id = id;
    this.user = user;
    this.userCompany_name = userCompany_name;
    this.userCompany_urAddress = userCompany_urAddress;
    this.userCompany_inn = userCompany_inn;
    this.userCompany_kpp = userCompany_kpp;
    this.userCompany_ogrn = userCompany_ogrn;
    this.userCompany_bankName = userCompany_bankName;
    this.userCompany_bikBank = userCompany_bikBank;
    this.userCompany_checkingAccount = userCompany_checkingAccount;
    this.userCompany_correspondentAccount = userCompany_correspondentAccount;
    // this.shippingAddress = shippingAddress;
    this.paymentMethod = paymentMethod;
    this.cart = cart;
    this.totalAmount = totalAmount;
    this.total = total;
    this.discount = discount;
    this.discountPerset = discountPerset;
    this.inOneC = inOneC;
    this.state = state;
    this.currentID = currentID;
    this.hrefForInvoice = hrefForInvoice;
    this.registred = registred;
    this.id1c = id1c;
  }
}
