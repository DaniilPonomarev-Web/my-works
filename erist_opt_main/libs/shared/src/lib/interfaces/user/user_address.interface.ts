/**
 * Интерфейс для представления адреса пользователя.
 */
export interface IUserAddress {
  id: string;
  country: string; // Страна
  city: string; // Город
  street: string; // Улица
  home: string; // Номер дома
  apartmentORoffice: string; // Номер квартиры или офиса
}

export interface ICreateAddress {
  country: string;
  city: string;
  street: string;
  home: string;
  apartmentORoffice: string;
}

export interface IUpdateAddress {
  id: string;
  country: string;
  city: string;
  street: string;
  home: string;
  apartmentORoffice: string;
}

export interface IAddressId {
  id: string;
}
