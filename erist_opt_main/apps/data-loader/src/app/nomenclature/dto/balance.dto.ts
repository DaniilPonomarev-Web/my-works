export class BalanceNomenclatureDto {
  prices: BalanceNomenclaturePriceDto[];
  balances: BalanceNomenclatureBalanceDto[];
}

export class BalanceNomenclaturePriceDto {
  product_id: string;
  price: number;
}

export class BalanceNomenclatureBalanceDto {
  product_id: string;
  option_id: string;
  balance: string;
}
