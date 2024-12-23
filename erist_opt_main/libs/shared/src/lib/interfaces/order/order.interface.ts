import { ICartItem, ICartItemDetail } from '../card';

export interface IOrderInput {
  userId: string;
  cart: ICartItem;
  shippingAddressId: string;
  billingAddressId: string;
  paymentMethod: string;
}

// export interface IInputOrder {
//   shippingAddressId: string;
// }

export interface IPayloadCreateOrder {
  userId: string;
  // shippingAddressId: string;
  paymentMethod: string;
  cart: ICartItemDetail[];
  totalAmount: number;
  total: number;
  discount: number | null;
}
