import { NomenclatureBalanceDto, NomenclaturePriceDto } from './update.dto';

export class InsertNomenclatureDto {
  products: InsertNomenclatureProductDto[];
  categories: InsertNomenclatureCategoryDto[];
  options: InsertNomenclatureOptionDto[];
  option_types: InsertNomenclatureOptionTypeDto[];
  prices: NomenclaturePriceDto[];
  balances: NomenclatureBalanceDto[];
}

class InsertNomenclatureOptionDto {
  id: string;
  name: string;

  /**
   * код из 1с
   */
  code: string;

  /**
   * ID вида характеристик
   */
  option_type_id: string;
}

class InsertNomenclatureCategoryDto {
  id: string;
  code: string;
  name: string;

  /**
   * ID вышестоящей категории
   */
  category_id: string;
}

class InsertNomenclatureProductDto {
  /**
   *  уникальный идентификатор номенклатуры
   */
  id: string;

  /**
   * код из 1с
   */
  code: string;

  /**
   * Наименование
   */
  name: string;

  /**
   * Описание
   */
  comment: string;

  /**
   * пол
   */
  gender: string;

  /**
   * цвет
   */
  color: string;

  /**
   * состав
   */
  compound: string;

  option_id: string;
  category_id: string;

  /**
   * Уход
   */
  care: string;

  /**
   * Параметры изделия
   */
  product_parameters: string;

  /**
   *Параметры модели
   */
  model_parameters: string;
}

class InsertNomenclatureOptionTypeDto {
  id: string;
  name: string;
}
