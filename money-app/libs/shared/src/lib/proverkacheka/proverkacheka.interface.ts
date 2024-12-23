interface IReceiptMetadata {
  id: number; // Уникальный идентификатор чека
  ofdId: string; // Идентификатор ОФД
  address: string; // Адрес места расчетов
  subtype: string; // Тип чека (например, "receipt")
  receiveDate: string; // Дата и время получения чека в формате строки
}

export interface IReceiptItem {
  name: string; // Название товара/услуги
  price: number; // Цена за единицу товара/услуги (в копейках)
  quantity: number; // Количество товара/услуги
  sum: number; // Сумма за товар/услугу (в копейках)
}

interface IReceiptData {
  json: {
    code: number; // Код операции
    user: string; // Наименование пользователя
    items: IReceiptItem[]; // Список позиций товаров/услуг
    nds0: number; // НДС со ставкой 0% (в копейках)
    nds10: number; // НДС со ставкой 10% (в копейках)
    nds18: number; // НДС со ставкой 18% (в копейках)
    ndsNo: number; // НДС не облагается (в копейках)
    totalSum: number; // Итоговая сумма (в копейках)
    fnsUrl: string; // URL для проверки чека на сайте ФНС
    userInn: string; // ИНН пользователя
    dateTime: string; // Дата и время операции в формате строки
    kktRegId: string; // Регистрационный номер ККТ
    metadata: IReceiptMetadata; // Метаданные чека
  };
}

interface IReceiptRequest {
  qrurl: string; // URL QR-кода
  qrfile: string; // Файл QR-кода
  qrraw: string; // Сырые данные QR-кода
  fn: string; // Фискальный номер (ФН)
  fd: string; // Фискальный документ (ФД)
  fp: string; // Фискальный признак (ФП)
  check_time: string; // Время чека в формате строки
  type: string; // Тип операции
  sum: string; // Сумма операции в строковом формате
}

export interface IReceipt {
  code: number; // Код операции
  first: number; // Первый элемент
  data: IReceiptData; // Данные чека
  request: IReceiptRequest; // Запрос исходных данных чека
}
