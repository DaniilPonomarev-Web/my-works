export interface ICartItem {
  productId: string;
  quantity: number;
  optionId?: string;
  optionValueId?: string;
}

export interface ICartItemDetail extends ICartItem {
  id: string;
  product: {
    id: string;
    model: string;
    price: number;
    name: string;
    image: string;
    optionName?: string;
    optionValueId?: string;
    optionProductValueId?: string;
    availableQuantity: number;
  };
  available: boolean;
}

export interface ICart {
  items: ICartItemDetail[];
  totalAmount: number;
  discount?: number;
  total: number;
  percentDiscount: number;
  canCheckout: boolean;
  messageError: string;
}
