/**
 * Интерфейс для представления информации о компании пользователя.
 */
export interface IUserCompany {
  id: string;
  name: string; // Наименование компании
  urAddress: string; // Юридический адрес компании
  inn: string; // ИНН компании
  kpp: string; // КПП компании
  ogrn: string; // ОГРН(-ИП) компании
  checkingAccount: string; // расчетный счет
  bankName: string; // Название банка
  bikBank: string; // БИК банка
  correspondentAccount: string; // корреспондентский счет
}

export interface IUpdateCompany {
  name: string;
  urAddress: string;
  inn: string;
  kpp: string;
  ogrn: string;
}
