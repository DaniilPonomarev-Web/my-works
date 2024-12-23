export interface SyncData {
  key: 'products' | 'categories' | 'option_types' | 'options';
  result:
    | SyncProductData[]
    | SyncCategoryData[]
    | SyncOptionData[]
    | SyncOptionData[];
}

export interface SyncProductData {
  id: string;
  code: string;
  name: string;
  description: string;
  optionIds: string;
  categoryId: string;
  gender?: string;
  color?: string;
  compound?: string;
  care: string;
  parameters?: string;
  model_parameters?: string;
}

export interface SyncCategoryData {
  id: string;
  code: string;
  name: string;
  categoryId: string;
}

export interface SyncOptionData {
  id: string;
  name: string;
}

export interface SyncOptionData {
  id: string;
  code: string;
  name: string;
  optionTypeId: string;
}

export enum EventPatternEnum {
  sync = 'sync',
  syncBalance = 'sync_balance',
  syncPrice = 'sync_prices',
  updateOrders = 'update_orders',
}

export interface SyncBalanceData {
  key: 'balances';
  result: {
    productId: string;
    optionId: string;
    balance: number;
  }[];
}

export interface SyncPriceData {
  key: 'prices';
  result: {
    productId: string;
    price: number;
  }[];
}

export interface StatusOrderMessage {
  /**
   * Ид заказа
   */
  id: string;
  /**
   * Данные документа в 1с
   */
  doc: {
    id: string;
    code: string;
  };
}
