import { OrderDTOFor1c } from '@erist-opt/shared';

export interface MessageOrder {
  pattern: {
    cmd: 'send_new_order';
  };
  data: OrderDTOFor1c;
}

export interface Message1C {
  /**
   * ID заказа
   */
  id: string;

  /**
   * дата заказа
   */
  date: string;

  /**
   * массив номенклатуры заказа
   */
  products: Message1CProduct[];
}

export interface Message1CProduct {
  /**
   * id номенклатуры
   */
  product_id: string;

  /**
   * Цена номенклатуры
   */
  price: number;

  /**
   * Количество
   */
  quantity: number;

  /**
   * id характеристики
   */
  option_id: string;

  /**
   * Процент скидки
   */
  discount?: number;
}
