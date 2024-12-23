export class UpdateNomenclatureDto {
  prices: NomenclaturePriceDto[];
  balances: NomenclatureBalanceDto[];
}

export class NomenclaturePriceDto {
  /**
   * id номенклатуры
   */
  products_id: string;

  /**
   * цена номенклатуры
   */
  price: string;
}

export class NomenclatureBalanceDto {
  /**
   * id номенклатуры
   */
  products_id: string;

  /**
   * id характеристики
   */
  option_id: string;

  /**
   * остаток
   */
  balance: string;
}
