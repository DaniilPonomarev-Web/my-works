export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  JSON: any;
  Upload: any;
};

/** Инпут для добавления товара в корзину */
export type AddToCartInput = {
  /** Тут передавать ID значение,options.values[...].id */
  optionValueId?: InputMaybe<Scalars['String']>;
  /** ID товара */
  productId: Scalars['String'];
  /** Количество товара */
  quantity: Scalars['Float'];
};

/** Адрес */
export type Address = {
  __typename?: 'Address';
  /** Дополнительные данные об адресе */
  data?: Maybe<AddressData>;
  /** Неверность адреса (может быть null) */
  invalidity?: Maybe<Scalars['String']>;
  /** Полный адрес */
  unrestricted_value?: Maybe<Scalars['String']>;
  /** Адрес в текстовом формате */
  value?: Maybe<Scalars['String']>;
};

/** Дополнительные данные об адресе */
export type AddressData = {
  __typename?: 'AddressData';
  /** Название города */
  city?: Maybe<Scalars['String']>;
  /** FIAS ID города */
  city_fias_id?: Maybe<Scalars['String']>;
  /** KLADR ID города */
  city_kladr_id?: Maybe<Scalars['String']>;
  /** Тип города */
  city_type?: Maybe<Scalars['String']>;
  /** Полное название типа города */
  city_type_full?: Maybe<Scalars['String']>;
  /** Полное название города с типом */
  city_with_type?: Maybe<Scalars['String']>;
  /** Страна */
  country?: Maybe<Scalars['String']>;
  /** ISO код страны */
  country_iso_code?: Maybe<Scalars['String']>;
  /** Федеральный округ */
  federal_district?: Maybe<Scalars['String']>;
  /** Состояние актуальности FIAS */
  fias_actuality_state?: Maybe<Scalars['String']>;
  /** FIAS код */
  fias_code?: Maybe<Scalars['String']>;
  /** FIAS ID */
  fias_id?: Maybe<Scalars['String']>;
  /** Уровень FIAS */
  fias_level?: Maybe<Scalars['String']>;
  /** Географическая широта */
  geo_lat?: Maybe<Scalars['String']>;
  /** Географическая долгота */
  geo_lon?: Maybe<Scalars['String']>;
  /** KLADR ID */
  kladr_id?: Maybe<Scalars['String']>;
  /** Почтовый индекс */
  postal_code?: Maybe<Scalars['String']>;
  /** Название региона */
  region?: Maybe<Scalars['String']>;
  /** FIAS ID региона */
  region_fias_id?: Maybe<Scalars['String']>;
  /** ISO код региона */
  region_iso_code?: Maybe<Scalars['String']>;
  /** KLADR ID региона */
  region_kladr_id?: Maybe<Scalars['String']>;
  /** Тип региона */
  region_type?: Maybe<Scalars['String']>;
  /** Полное название типа региона */
  region_type_full?: Maybe<Scalars['String']>;
  /** Полное название региона с типом */
  region_with_type?: Maybe<Scalars['String']>;
  /** Временная зона */
  timezone?: Maybe<Scalars['String']>;
};

/** DTO баннера */
export type BannerDto = {
  __typename?: 'BannerDTO';
  /** UUID Баннера */
  id: Scalars['ID'];
  /** Изображение для десктопа */
  image: Scalars['String'];
  /** Изображение для десктопа ссылка minio */
  image_href: Scalars['String'];
  /** Изображение для мобилки */
  image_mob: Scalars['String'];
  /** Изображение для мобилки ссылка minio */
  image_mob_href: Scalars['String'];
  /** Ссылка на баннере */
  link?: Maybe<Scalars['String']>;
  /** Название баннера */
  name: Scalars['String'];
  /** Статус баннера */
  status: Scalars['Boolean'];
  /** Заголовок на баннере */
  title?: Maybe<Scalars['String']>;
};

/** Изображение баннера */
export type BannerUploadImageDto = {
  __typename?: 'BannerUploadImageDTO';
  /** Название изображения в minio */
  imageName: Scalars['String'];
};

/** Список баннеров */
export type BannersListDto = {
  __typename?: 'BannersListDTO';
  /** Список баннеров */
  banners: Array<BannerDto>;
  /** Количество баннеров */
  total: Scalars['Float'];
};

/** Корзина */
export type CartDto = {
  __typename?: 'CartDTO';
  /** Возможность оформления заказа */
  canCheckout: Scalars['Boolean'];
  /** Скидка на общую сумму (если есть) */
  discount?: Maybe<Scalars['Float']>;
  /** Список элементов в корзине */
  items: Array<CartItemDetailDto>;
  /** Сообщение об ошибке если есть */
  messageError?: Maybe<Scalars['String']>;
  /** Размер скидки в процентах */
  percentDiscount?: Maybe<Scalars['Float']>;
  /** Итоговая сумма к оплате */
  total: Scalars['Float'];
  /** Общая сумма товаров в корзине */
  totalAmount: Scalars['Float'];
};

/** Товар в оформлении заказа */
export type CartInput = {
  __typename?: 'CartInput';
  /** ID значения опции,options.values[...].id */
  optionValueId?: Maybe<Scalars['String']>;
  /** ID товара */
  productId: Scalars['String'];
  /** Количество товара */
  quantity: Scalars['Float'];
};

/** Элемент корзины с товарами */
export type CartItemDetailDto = {
  __typename?: 'CartItemDetailDTO';
  /** Доступен ли товар для покупки */
  available: Scalars['Boolean'];
  /** Уникальный идентификатор элемента корзины */
  id: Scalars['String'];
  /** Идентификатор выбранной опции (если есть) */
  optionId?: Maybe<Scalars['String']>;
  /** Детали товара */
  product: CartProductDto;
  /** Идентификатор товара */
  productId: Scalars['String'];
  /** Количество товара в корзине */
  quantity: Scalars['Float'];
};

/** Описание товара в корзине */
export type CartProductDto = {
  __typename?: 'CartProductDTO';
  /** Доступное количество товара */
  availableQuantity?: Maybe<Scalars['Float']>;
  /** Уникальный идентификатор товара */
  id: Scalars['String'];
  /** Изображение товара */
  image?: Maybe<Scalars['String']>;
  /** Модель товара */
  model: Scalars['String'];
  /** Наименование товара */
  name: Scalars['String'];
  /** Наименование выбранной опции (если есть) */
  optionName?: Maybe<Scalars['String']>;
  /** ID выбранной ного занчения опции (если есть) */
  optionValueId?: Maybe<Scalars['String']>;
  /** Цена товара */
  price: Scalars['Float'];
};

export type CategoryDto = {
  __typename?: 'CategoryDTO';
  /** Дочерняя категория */
  children?: Maybe<Array<CategoryDto>>;
  /** Описания категории */
  descriptions?: Maybe<Array<CategoryDescriptionDto>>;
  /** id категории */
  id: Scalars['String'];
  /** Ссылка на изображение */
  image?: Maybe<Scalars['String']>;
  /** Отображать в плитке на главной */
  onHomePage: Scalars['Boolean'];
  /** Родительская категория */
  parent_id?: Maybe<Scalars['String']>;
  /** Порядок сортировки */
  sort_order: Scalars['Float'];
  /** Статус категории */
  status: Scalars['Boolean'];
};

export type CategoryDescriptionDto = {
  __typename?: 'CategoryDescriptionDTO';
  /** Описание категории */
  description?: Maybe<Scalars['String']>;
  /** Принадлежность к категории - id */
  id: Scalars['String'];
  /** meta_description */
  meta_description?: Maybe<Scalars['String']>;
  /** meta_h1 */
  meta_h1?: Maybe<Scalars['String']>;
  /** meta_keyword */
  meta_keyword?: Maybe<Scalars['String']>;
  /** meta_title */
  meta_title?: Maybe<Scalars['String']>;
  /** Название категории */
  name: Scalars['String'];
};

export type CategoryDescriptionInputDto = {
  /** Описание категории */
  description?: InputMaybe<Scalars['String']>;
  /** meta_description */
  meta_description?: InputMaybe<Scalars['String']>;
  /** meta_h1 */
  meta_h1?: InputMaybe<Scalars['String']>;
  /** meta_keyword */
  meta_keyword?: InputMaybe<Scalars['String']>;
  /** meta_title */
  meta_title?: InputMaybe<Scalars['String']>;
  /** Название категории */
  name: Scalars['String'];
};

export type CategoryListDto = {
  __typename?: 'CategoryListDTO';
  /** Дерево категорий */
  data: Array<CategoryDto>;
  /** Количество категорий первого уровня */
  total: Scalars['Float'];
};

/** Инпут для фильтров дерева категорий */
export type CategoryListFilterAdminDto = {
  /** фильтр по части описания */
  filterDescription?: InputMaybe<Scalars['String']>;
  /** фильтр по родительским и дочерним */
  filterMainCategory?: InputMaybe<Scalars['Boolean']>;
  /** фильтр по части названия  */
  filterName?: InputMaybe<Scalars['String']>;
  /** фильтр по статусу */
  filterStatus?: InputMaybe<Scalars['Boolean']>;
};

/** При изменении товара в корзине */
export type ChangeCartItemDto = {
  __typename?: 'ChangeCartItemDTO';
  /** Количество товара в корзине */
  quantity: Scalars['Float'];
  /** ID товара */
  status: Scalars['Boolean'];
};

export type ChangePasswordDto = {
  /** Текущий пароль пользователя */
  currentPassword: Scalars['String'];
  /** Новый пароль пользователя */
  newPassword: Scalars['String'];
};

/** Код для восстановления пароля пользователя */
export type CodeForResetPasswordInputDto = {
  /** код отправленный в письме */
  code: Scalars['Float'];
  /** email человека */
  email: Scalars['String'];
};

/** DTO для создания баннера */
export type CreateBannerInputDto = {
  /** Изображение для десктопа */
  image: Scalars['String'];
  /** Изображение для мобилки */
  image_mob: Scalars['String'];
  /** Ссылка на баннере */
  link?: InputMaybe<Scalars['String']>;
  /** Название баннера */
  name: Scalars['String'];
  /** Статус баннера */
  status: Scalars['Boolean'];
  /** Заголовок на баннере */
  title?: InputMaybe<Scalars['String']>;
};

export type CreateCategoryWithDescriptionDto = {
  descriptions: Array<CategoryDescriptionInputDto>;
  /** Ссылка на изображение категории */
  image?: InputMaybe<Scalars['String']>;
  /** Родиттельская категория */
  parent_id?: InputMaybe<Scalars['String']>;
  /** Порядок сортировки */
  sort_order?: InputMaybe<Scalars['Float']>;
  /** Cтатус категории */
  status: Scalars['Boolean'];
};

/** Создание пользователя админки */
export type CreateCustomerDto = {
  /** Почта */
  email: Scalars['String'];
  /** Логин пользователя */
  login: Scalars['String'];
  /** Пароль  */
  password: Scalars['String'];
  /** Роль пользователя */
  role: CustomerRole;
};

/** Данные, необходимые для создания нового запрос */
export type CreateFeedBackInput = {
  /** Текст запроса */
  text: Scalars['String'];
};

/** DTO для создания блока на главной странице */
export type CreateMainPageBlockInputDto = {
  /** Ссылка блока */
  link: Scalars['String'];
  /** Название блока */
  name: Scalars['String'];
  /** Товары в блоке */
  products: Array<Scalars['String']>;
  /** Ссылка блока */
  sort: Scalars['Float'];
  /** Статус блока */
  status: Scalars['Boolean'];
  /** Заголовок блока */
  title: Scalars['String'];
};

/** Создание опции */
export type CreateOptionInput = {
  name: Scalars['String'];
  sortOrder?: InputMaybe<Scalars['Float']>;
  type: Scalars['String'];
  values: Array<CreateOptionValueInput>;
};

export type CreateOptionValueForOptionInput = {
  optionId: Scalars['ID'];
  values: Array<CreateOptionValueInput>;
};

/** Создание значения опции */
export type CreateOptionValueInput = {
  colorCode?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  sortOrder?: InputMaybe<Scalars['Float']>;
};

/** Входные данные для создания группы синонимов */
export type CreateSynonymGroupDto = {
  /** Список обновленных синонимов, разделенных запятыми */
  synonyms: Scalars['String'];
};

/** DTO для создания или обновления ссылки на соц сеть */
export type CreateUpdateSocialHrefInputDto = {
  /** Заголовок на баннере */
  href?: InputMaybe<Scalars['String']>;
  /** Название баннера */
  name: Scalars['String'];
  /** Порядок сортировки */
  sortOrder?: InputMaybe<Scalars['Float']>;
};

/** Пользователь админки */
export type CustomerDto = {
  __typename?: 'CustomerDTO';
  /** Почта */
  email: Scalars['String'];
  /** ID пользователя */
  id: Scalars['ID'];
  /** Последняя авторизация */
  lastLogin?: Maybe<Scalars['DateTime']>;
  /** Логин пользователя */
  login: Scalars['String'];
  /** Роль пользователя */
  role: CustomerRole;
};

/** Роли админов админки :D */
export enum CustomerRole {
  /** Администратор */
  Admin = 'Admin',
  /** Контекст */
  Context = 'Context',
  /** Менеджер */
  Manager = 'Manager'
}

/** Инпут для фильтров пользователей админки */
export type CustomersFilterAdminDto = {
  /** фильтр по  email */
  filterEmail?: InputMaybe<Scalars['String']>;
  /** фильтр по логину */
  filterLogin?: InputMaybe<Scalars['Boolean']>;
};

/** Пользователи админки сайта */
export type CustomersResultDto = {
  __typename?: 'CustomersResultDTO';
  /** Информация о Customers */
  customers?: Maybe<Array<CustomerDto>>;
  /** Общее количество Customers */
  total?: Maybe<Scalars['Float']>;
};

/** Основной DTO для данных Dadata */
export type DadataDataDto = {
  __typename?: 'DadataDataDTO';
  /** Адрес */
  address?: Maybe<DadataSuggestion>;
  /** Власти (может быть null) */
  authorities?: Maybe<Scalars['String']>;
  /** Гражданство (может быть null) */
  citizenship?: Maybe<Scalars['String']>;
  /** Документы (может быть null) */
  documents?: Maybe<Scalars['String']>;
  /** Электронные адреса (может быть null) */
  emails?: Maybe<Scalars['String']>;
  /** Количество сотрудников (может быть null) */
  employee_count?: Maybe<Scalars['String']>;
  /** Финансовая информация (может быть null) */
  finance?: Maybe<Scalars['String']>;
  /** ФИО */
  fio?: Maybe<Fio>;
  /** HID */
  hid?: Maybe<Scalars['String']>;
  /** ИНН */
  inn?: Maybe<Scalars['String']>;
  /** Лицензии (может быть null) */
  licenses?: Maybe<Scalars['String']>;
  /** Название */
  name?: Maybe<Name>;
  /** ОГРН */
  ogrn?: Maybe<Scalars['String']>;
  /** Дата ОГРН */
  ogrn_date?: Maybe<Scalars['Float']>;
  /** ОКАТО */
  okato?: Maybe<Scalars['String']>;
  /** ОКФС */
  okfs?: Maybe<Scalars['String']>;
  /** ОКОГУ */
  okogu?: Maybe<Scalars['String']>;
  /** ОКПО */
  okpo?: Maybe<Scalars['String']>;
  /** ОКТМО */
  oktmo?: Maybe<Scalars['String']>;
  /** ОКВЭД */
  okved?: Maybe<Scalars['String']>;
  /** Тип ОКВЭД */
  okved_type?: Maybe<Scalars['String']>;
  /** ОКВЭДs (может быть null) */
  okveds?: Maybe<Scalars['String']>;
  /** ОПФ */
  opf?: Maybe<Opf>;
  /** Телефоны (может быть null) */
  phones?: Maybe<Scalars['String']>;
  /** QC (может быть null) */
  qc?: Maybe<Scalars['String']>;
  /** Источник (может быть null) */
  source?: Maybe<Scalars['String']>;
  /** Состояние */
  state?: Maybe<State>;
  /** Тип */
  type?: Maybe<Scalars['String']>;
};

/** Предложение Dadata */
export type DadataSuggestion = {
  __typename?: 'DadataSuggestion';
  /** Данные предложения (включает Fio, State и другие поля) */
  data?: Maybe<AddressData>;
  /** Полное значение предложения */
  unrestricted_value?: Maybe<Scalars['String']>;
  /** Значение предложения */
  value?: Maybe<Scalars['String']>;
};

/** Данные для админ панели */
export type DashboardDto = {
  __typename?: 'DashboardDTO';
  /** всего заказов */
  countOrders: Scalars['Float'];
  /** Всего товаров */
  countProducts: Scalars['Float'];
  /** Всего покупателей */
  countUsers: Scalars['Float'];
  /** User Login */
  customer: Scalars['String'];
  salesData: Array<SalesDataDto>;
  /** Сумма заказов */
  summOrders: Scalars['Float'];
};

/** Представляет запрос пользователя */
export type FeedBackDto = {
  __typename?: 'FeedBackDto';
  /** Уникальный идентификатор запроса */
  id: Scalars['ID'];
  /** Статус запроса (например, обработан или нет) */
  status: Scalars['Boolean'];
  /** Текст запроса */
  text: Scalars['String'];
  /** Пользователь, оставивший запрос */
  user: UserDto;
};

/** Данные, необходимые для идентификации запроса по ID */
export type FeedBackIdInput = {
  /** Уникальный идентификатор запроса */
  id: Scalars['ID'];
};

export type FeedBackListDto = {
  __typename?: 'FeedBackListDTO';
  /** список запросов */
  data: Array<FeedBackDto>;
  /** Количество запросов */
  total: Scalars['Float'];
};

/** Инпут для фильтров дерева категорий */
export type FeedBackListFilterAdminDto = {
  /** фильтр по статусу */
  filterStatus?: InputMaybe<Scalars['Boolean']>;
  /** фильтр по части текста */
  filterText?: InputMaybe<Scalars['String']>;
  /** фильтр по inn пользователя  */
  filterUserInn?: InputMaybe<Scalars['String']>;
};

/** ФИО */
export type Fio = {
  __typename?: 'Fio';
  /** Пол (может быть null) */
  gender?: Maybe<Scalars['String']>;
  /** Имя */
  name: Scalars['String'];
  /** Отчество */
  patronymic: Scalars['String'];
  /** QC (может быть null) */
  qc?: Maybe<Scalars['String']>;
  /** Источник (может быть null) */
  source?: Maybe<Scalars['String']>;
  /** Фамилия */
  surname: Scalars['String'];
};

/** DTO c ID блока на главной странице */
export type IdMainPageBlockInputDto = {
  /** UUID Блока */
  id: Scalars['ID'];
};

/** DTO информационной странички */
export type InformationDto = {
  __typename?: 'InformationDTO';
  /** Контент страницы */
  content: Scalars['String'];
  /** Идентификатор информационной странички */
  id: Scalars['String'];
  /** Имя страницы */
  name: Scalars['String'];
  /** Статус страницы */
  status: Scalars['Boolean'];
  /** Заголовок страницы */
  title: Scalars['String'];
};

/** DTO информационных странички */
export type InformationDataDto = {
  __typename?: 'InformationDataDTO';
  /** Информационные страницы */
  data: Array<InformationDto>;
  /** количество */
  total: Scalars['Float'];
};

/** Инпут для загрузки картинки в MINIO для баннера */
export type InputBannerImageUploadDto = {
  /** Прикрепить изображение */
  image?: InputMaybe<Scalars['Upload']>;
};

/** DTO для создания информационной странички */
export type InputCreateInformationDto = {
  /** Контент страницы */
  content: Scalars['String'];
  /** Имя страницы */
  name: Scalars['String'];
  /** Статус страницы */
  status: Scalars['Boolean'];
  /** Заголовок страницы */
  title: Scalars['String'];
};

/** Входные данные для создания продукта */
export type InputCreateProductDto = {
  /** Категории продукта */
  categories: Array<Scalars['String']>;
  /** Описание продукта */
  description: InputCreateProductDescriptionDto;
  /** Изображения продукта */
  images: Array<InputCreateProductImageDto>;
  /** Главная категория */
  maincategory: Scalars['String'];
  /** Модель продукта */
  model: Scalars['String'];
  /** Значения опций продукта */
  optionValues: Array<InputCreateProductOptionValueDto>;
  /** Цена продукта */
  price: Scalars['Float'];
  /** Количество продукта */
  quantity: Scalars['Float'];
  /** Порядок сортировки */
  sortOrder: Scalars['Float'];
  /** Статус продукта */
  status: Scalars['Boolean'];
};

/** Входные данные для создания описания продукта */
export type InputCreateProductDescriptionDto = {
  /** Уход */
  care?: InputMaybe<Scalars['String']>;
  /** Состав */
  compound?: InputMaybe<Scalars['String']>;
  /** Описание */
  description: Scalars['String'];
  /** Meta описание */
  meta_description?: InputMaybe<Scalars['String']>;
  /** Meta H1 */
  meta_h1?: InputMaybe<Scalars['String']>;
  /** Meta title */
  meta_title?: InputMaybe<Scalars['String']>;
  /** Параметры модели */
  model_parameters?: InputMaybe<Scalars['String']>;
  /** Название */
  name: Scalars['String'];
  /** Параметры изделия */
  parameters?: InputMaybe<Scalars['String']>;
  /** Тэг */
  tag?: InputMaybe<Scalars['String']>;
};

/** Входные данные для создания изображения продукта */
export type InputCreateProductImageDto = {
  /** Название изображения в Minio */
  imageNameMinio: Scalars['String'];
  /** Порядок сортировки */
  sortOrder: Scalars['Float'];
};

/** Входные данные для значений опций продукта */
export type InputCreateProductOptionValueDto = {
  /** Ссылка на другой товар, может его id */
  href?: InputMaybe<Scalars['String']>;
  /** ID опции */
  optionId: Scalars['String'];
  /** Цена значения опции */
  price?: Scalars['Float'];
  /** Количество товара у опции */
  quantity?: Scalars['Float'];
  /** ID значения опции */
  valueId: Scalars['String'];
};

/** Инпут для загрузки картинки в MINIO для товара */
export type InputProductImageUploadDto = {
  /** Прикрепить изображение */
  image?: InputMaybe<Scalars['Upload']>;
};

/** DTO для создания информационной странички */
export type InputUpdateInformationDto = {
  /** Контент страницы */
  content: Scalars['String'];
  /** Идентификатор информационной странички */
  id: Scalars['String'];
  /** Имя страницы */
  name: Scalars['String'];
  /** Статус страницы */
  status: Scalars['Boolean'];
  /** Заголовок страницы */
  title: Scalars['String'];
};

/** Входные данные для обноавление продукта */
export type InputUpdateProductDto = {
  /** Категории продукта */
  categories?: InputMaybe<Array<Scalars['String']>>;
  /** Описание продукта */
  description: InputCreateProductDescriptionDto;
  /** Ссылка на архив фото */
  hrefCloudPhotos?: InputMaybe<Scalars['String']>;
  /** ID товара */
  id: Scalars['ID'];
  /** Изображения продукта */
  images?: InputMaybe<Array<InputCreateProductImageDto>>;
  /** Главная категория */
  maincategory?: InputMaybe<Scalars['String']>;
  /** Значения опций продукта */
  optionValues: Array<InputCreateProductOptionValueDto>;
  /** Список товаров с другим цветом (ID) */
  otherColorsProductsIds?: InputMaybe<Array<Scalars['String']>>;
  /** Список связанных товаров (ID) */
  relatedProductsIds?: InputMaybe<Array<Scalars['String']>>;
  /** Порядок сортировки */
  sortOrder?: InputMaybe<Scalars['Float']>;
  /** Статус продукта */
  status?: Scalars['Boolean'];
};

/** Лог */
export type LogAdminDto = {
  __typename?: 'LogAdminDTO';
  /** Дополнительные данные, связанные с логом */
  additionalData?: Maybe<Scalars['JSON']>;
  /** Логин админа который все это сделал */
  admin?: Maybe<Scalars['String']>;
  /** Уникальный идентификатор лога */
  id: Scalars['ID'];
  /** Дата лога */
  registred: Scalars['DateTime'];
  /** Сервис, в котором это сделано */
  service: Scalars['String'];
  /** Действие */
  text: Scalars['String'];
};

/** Авторизация для админки */
export type LoginCustomerInputDto = {
  /** login */
  login: Scalars['String'];
  /** Пароль */
  password: Scalars['String'];
};

/** Ответ для пользователей */
export type LoginResponseDto = {
  __typename?: 'LoginResponseDTO';
  /** токен доступа */
  access_token: Scalars['String'];
  /** рефреш токен */
  refresh_token: Scalars['String'];
};

/** Авторизация для пользователя */
export type LoginUserInputDto = {
  /** email */
  email: Scalars['String'];
  /** Пароль */
  password: Scalars['String'];
};

/** Список логов */
export type LogsAdminDto = {
  __typename?: 'LogsAdminDTO';
  /** Список логов */
  logs: Array<LogAdminDto>;
  /** Количество логов */
  total: Scalars['Float'];
};

/** DTO для блока на главной странице */
export type MainPageBlockDto = {
  __typename?: 'MainPageBlockDTO';
  /** UUID Блока */
  id: Scalars['ID'];
  /** Ссылка блока */
  link?: Maybe<Scalars['String']>;
  /** Название блока */
  name?: Maybe<Scalars['String']>;
  /** Товары в блоке */
  products: Array<ProductDto>;
  /** Ссылка блока */
  sort: Scalars['Float'];
  /** Статус блока */
  status: Scalars['Boolean'];
  /** Заголовок блока */
  title?: Maybe<Scalars['String']>;
};

/** Список Блоков на главной странице */
export type MainPageBlockListDto = {
  __typename?: 'MainPageBlockListDTO';
  /** Список блоков  */
  blocks: Array<MainPageBlockDto>;
  /** Количество блоков */
  total: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Добавление товара в корзину */
  addToCart: ChangeCartItemDto;
  /** Изменение пароля пользователя */
  changePassword: UserDto;
  /** Удалить все товары в корзине */
  clearCart: Scalars['Boolean'];
  /** Создается новый баннер. При статусе true выключает остальные баннеры */
  createBanner: BannerDto;
  /** Создает новую категорию с описанием */
  createCategoryWithDescription: CategoryDto;
  /** Создание нового пользователя. */
  createCustomer: CustomerDto;
  /** Создание нового отзыва */
  createFeedback: FeedBackDto;
  /** Создать информационную страничку */
  createInformation: InformationDto;
  /** Создание нового блока */
  createMainPageBlock: MainPageBlockDto;
  /** Создать опцию */
  createOption: OptionDto;
  /** Создать значения опции */
  createOptionValues: Array<OptionValueDto>;
  createOrder: OrderDto;
  /** Создание продукта */
  createProduct: TransformedProductDto;
  /** Создание ссылки на соц сети */
  createSocialHref: SocialHrefDto;
  /** Создание группы синонимов */
  createSynonymGroup: SynonymGroupDto;
  /** Регистрирует нового пользователя в системе. */
  createUserAdmin: UserDto;
  /** Удаляет категорию по ID. */
  deleteCategory: Scalars['Boolean'];
  /** Удаление пользователя по ID. */
  deleteCustomer: Scalars['Boolean'];
  /** Удалить информационную страничку */
  deleteInformation: Scalars['Boolean'];
  /** Удалить опцию со всеми значениями */
  deleteOption: Scalars['Boolean'];
  /** Удалить значение опции */
  deleteOptionValue: Scalars['Boolean'];
  /** Удаление заказа по ID */
  deleteOrder: Scalars['Boolean'];
  /** Удаление соц сети */
  deleteSocialHref: Scalars['Boolean'];
  /** Удалить группу синонимов по ID */
  deleteSynonymGroup: Scalars['Boolean'];
  /** Получение всех пользователей */
  getAllUsers: UsersResultsDto;
  /** Получает информацию о текущем пользователе, авторизованном через токен. */
  getDadataData: DadataDataDto;
  /** Получение 1 заказа юзера */
  getOrderById: OrderWithProductsDto;
  /** Получение 1 заказа для админа */
  getOrderByIdAdmin: OrderWithProductsDto;
  /** Получение всех заказов юзера */
  getOrdersUsers: OrderListDto;
  /** Получение всех заказов */
  getOrdersUsersAdmin: OrderListDto;
  /** Выполняет вход пользователя в систему и возвращает токены. */
  login: LoginResponseDto;
  /** Выполняет вход пользователя в систему и возвращает токены. */
  loginCustomer: LoginResponseDto;
  /** Обновляет токен доступа с помощью переданного рефреш токена. */
  refreshToken: RefreshResponseDto;
  /** Обновляет токен доступа с помощью переданного рефреш токена. */
  refreshTokenCustomer: RefreshResponseDto;
  /** Удаляет баннер */
  removeBanner: Array<BannerDto>;
  /** Удаление товара из корзины */
  removeFromCart: ChangeCartItemDto;
  /** Удаление блока по id */
  removeMainPageBlock: Array<MainPageBlockDto>;
  /** Регистрирует нового пользователя в системе. */
  signUpUser: UserDto;
  /** Обновляет баннер. При статусе true выключает остальные баннеры */
  updateBanner: BannerDto;
  /** Обновление количества товара в корзине */
  updateCartItemQuantity: ChangeCartItemDto;
  /** бновляет существующую категорию. */
  updateCategory: CategoryDto;
  /** Обновление информации о компании пользователя */
  updateCompany: UserDto;
  /** Обновление существующего пользователя. */
  updateCustomer: CustomerDto;
  /** Обновление статуса отзыва */
  updateFeedbackStatus: FeedBackDto;
  /** Обновить информационную страничку */
  updateInformation: InformationDto;
  /** Обновление даты последнего входа в лк пользователя */
  updateLastLogin: UserDto;
  /** Обновление блока */
  updateMainPageBlock: MainPageBlockDto;
  /** Обновить значения опции */
  updateOptionValues: OptionDto;
  /** Обновление статуса заказа */
  updateOrderStatus: OrderWithProductsDto;
  /** Обновление продукта */
  updateProduct: TransformedProductDto;
  /** Изменение пароля при восстановлении доступа */
  updateResetPassword: Scalars['Boolean'];
  /** Обновление ссылки на соц сеть */
  updateSocialHref: SocialHrefDto;
  /** Обновление группы синонимов */
  updateSynonymGroup: SynonymGroupDto;
  /** Обновление основной информации о пользователе */
  updateUser: UserDto;
  /** Обновление основной информации о пользователе */
  updateUserAdmin: UserDto;
  /** Изменить статус пользователя (включить/отключить пользователя) */
  updateUserStatus: UserDto;
  /** Отправка файла изображения для баннера его в minio. Вернется его название */
  uploadBannerImageToMinio: BannerUploadImageDto;
  /** Отправка файла изображения для загрузки его в minio. Вернется его название */
  uploadProductImageToMinio: ProductUploadImageDto;
};


export type MutationAddToCartArgs = {
  input: AddToCartInput;
};


export type MutationChangePasswordArgs = {
  changePasswordDto: ChangePasswordDto;
};


export type MutationCreateBannerArgs = {
  createBannerInput: CreateBannerInputDto;
};


export type MutationCreateCategoryWithDescriptionArgs = {
  createCategoryWithDescriptionInput: CreateCategoryWithDescriptionDto;
};


export type MutationCreateCustomerArgs = {
  createCustomerDto: CreateCustomerDto;
};


export type MutationCreateFeedbackArgs = {
  createFeedbackInput: CreateFeedBackInput;
};


export type MutationCreateInformationArgs = {
  data: InputCreateInformationDto;
};


export type MutationCreateMainPageBlockArgs = {
  createMainPageBlockInput: CreateMainPageBlockInputDto;
};


export type MutationCreateOptionArgs = {
  createOptionInput: CreateOptionInput;
};


export type MutationCreateOptionValuesArgs = {
  createOptionValueForOptionInput: CreateOptionValueForOptionInput;
};


export type MutationCreateProductArgs = {
  createProductInput: InputCreateProductDto;
};


export type MutationCreateSocialHrefArgs = {
  input: CreateUpdateSocialHrefInputDto;
};


export type MutationCreateSynonymGroupArgs = {
  createSynonymGroupDto: CreateSynonymGroupDto;
};


export type MutationCreateUserAdminArgs = {
  createUserAdminInput: SignUpUserInputDto;
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['String'];
};


export type MutationDeleteCustomerArgs = {
  id: Scalars['String'];
};


export type MutationDeleteInformationArgs = {
  id: Scalars['String'];
};


export type MutationDeleteOptionArgs = {
  optionId: Scalars['ID'];
};


export type MutationDeleteOptionValueArgs = {
  optionValueId: Scalars['ID'];
};


export type MutationDeleteOrderArgs = {
  orderId: Scalars['ID'];
};


export type MutationDeleteSocialHrefArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteSynonymGroupArgs = {
  id: Scalars['ID'];
};


export type MutationGetAllUsersArgs = {
  filter?: InputMaybe<UsersFilterAdminDto>;
  pagination: OrdersPaginationAdminDto;
  sortBy?: InputMaybe<Scalars['String']>;
  sortOrder?: InputMaybe<Scalars['String']>;
};


export type MutationGetDadataDataArgs = {
  inn: Scalars['String'];
};


export type MutationGetOrderByIdArgs = {
  orderId: Scalars['ID'];
};


export type MutationGetOrderByIdAdminArgs = {
  orderId: Scalars['ID'];
};


export type MutationGetOrdersUsersArgs = {
  filter?: InputMaybe<OrdersFilterDto>;
  limit?: Scalars['Float'];
  offset?: Scalars['Float'];
  sortBy?: InputMaybe<Scalars['String']>;
  sortOrder?: InputMaybe<Scalars['String']>;
};


export type MutationGetOrdersUsersAdminArgs = {
  filter?: InputMaybe<OrdersFilterAdminDto>;
  pagination: OrdersPaginationAdminDto;
  sortBy?: InputMaybe<Scalars['String']>;
  sortOrder?: InputMaybe<Scalars['String']>;
};


export type MutationLoginArgs = {
  loginUserInput: LoginUserInputDto;
};


export type MutationLoginCustomerArgs = {
  loginCustomerInput: LoginCustomerInputDto;
};


export type MutationRefreshTokenArgs = {
  refreshToken: Scalars['String'];
};


export type MutationRefreshTokenCustomerArgs = {
  refreshToken: Scalars['String'];
};


export type MutationRemoveBannerArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveFromCartArgs = {
  input: RemoveFromCartInput;
};


export type MutationRemoveMainPageBlockArgs = {
  IdMainPageBlockInputDTO: IdMainPageBlockInputDto;
};


export type MutationSignUpUserArgs = {
  signUpUserInput: SignUpUserInputDto;
};


export type MutationUpdateBannerArgs = {
  updateBannerInput: UpdateBannerInputDto;
};


export type MutationUpdateCartItemQuantityArgs = {
  input: UpdateCartItemQuantityInput;
};


export type MutationUpdateCategoryArgs = {
  updateCategoryInput: UpdateCategoryDto;
};


export type MutationUpdateCompanyArgs = {
  updateCompanyDto: UpdateCompanyDto;
};


export type MutationUpdateCustomerArgs = {
  updateCustomerDto: UpdateCustomerDto;
};


export type MutationUpdateFeedbackStatusArgs = {
  input: FeedBackIdInput;
};


export type MutationUpdateInformationArgs = {
  data: InputUpdateInformationDto;
};


export type MutationUpdateMainPageBlockArgs = {
  updateMainPageBlockInput: UpdateMainPageBlockInputDto;
};


export type MutationUpdateOptionValuesArgs = {
  updateOptionValuesInput: UpdateOptionValueForOptionInput;
};


export type MutationUpdateOrderStatusArgs = {
  newState: StateOrder;
  orderId: Scalars['ID'];
};


export type MutationUpdateProductArgs = {
  updateProductInput: InputUpdateProductDto;
};


export type MutationUpdateResetPasswordArgs = {
  newPassword: NewUserPasswordInputDto;
};


export type MutationUpdateSocialHrefArgs = {
  input: UpdateSocialHrefInputDto;
};


export type MutationUpdateSynonymGroupArgs = {
  updateSynonymGroupDto: UpdateSynonymGroupDto;
};


export type MutationUpdateUserArgs = {
  updateUserDto: UpdateUserDto;
};


export type MutationUpdateUserAdminArgs = {
  updateUserForAdminDto: UpdateUserForAdminDto;
};


export type MutationUpdateUserStatusArgs = {
  id: Scalars['String'];
};


export type MutationUploadBannerImageToMinioArgs = {
  BannerUploadImageDTO: InputBannerImageUploadDto;
};


export type MutationUploadProductImageToMinioArgs = {
  ProductUploadImageDTO: InputProductImageUploadDto;
};

/** Название */
export type Name = {
  __typename?: 'Name';
  /** Полное название */
  full?: Maybe<Scalars['String']>;
  /** Полное название с ОПФ */
  full_with_opf?: Maybe<Scalars['String']>;
  /** Латинское название (может быть null) */
  latin?: Maybe<Scalars['String']>;
  /** Краткое название (может быть null) */
  short?: Maybe<Scalars['String']>;
  /** Краткое название с ОПФ */
  short_with_opf?: Maybe<Scalars['String']>;
};

/** ОПФ */
export type Opf = {
  __typename?: 'Opf';
  /** Код ОПФ */
  code?: Maybe<Scalars['String']>;
  /** Полное название ОПФ */
  full?: Maybe<Scalars['String']>;
  /** Сокращенное название ОПФ */
  short?: Maybe<Scalars['String']>;
  /** Тип ОПФ */
  type?: Maybe<Scalars['String']>;
};

/** Опция */
export type OptionDto = {
  __typename?: 'OptionDTO';
  /** ID опции */
  id: Scalars['ID'];
  /** Название опции */
  name: Scalars['String'];
  /** Порядок сортировки */
  sortOrder: Scalars['Float'];
  /** Тип опции */
  type: Scalars['String'];
  /** Значения опции */
  values: Array<OptionValueDto>;
};

/** Опции для фильтра */
export type OptionFilterDto = {
  __typename?: 'OptionFilterDTO';
  /** ID */
  id: Scalars['ID'];
  /** Название опции (размер цвет и прочая) */
  optionName: Scalars['String'];
  /** Актуальные значения */
  values: Array<Scalars['String']>;
};

/** Значение опции */
export type OptionValueDto = {
  __typename?: 'OptionValueDTO';
  /** COD TSVETA */
  colorCode?: Maybe<Scalars['String']>;
  /** ID значения опции */
  id: Scalars['ID'];
  /** Название значения опции */
  name: Scalars['String'];
  option: OptionDto;
  productOptionValues: Array<ProductOptionValueDto>;
  /** Порядок сортировки */
  sortOrder: Scalars['Float'];
};

/** Список опций */
export type OptionsListDto = {
  __typename?: 'OptionsListDTO';
  /** Список опций */
  options: Array<OptionDto>;
  /** Количество опций */
  total: Scalars['Float'];
};

/** Заказ пользователя */
export type OrderDto = {
  __typename?: 'OrderDTO';
  /** Товары в заказе */
  cart: Array<CartInput>;
  /** счетчик заказов */
  currentID: Scalars['Float'];
  /** Скидка на сумму заказа */
  discount?: Maybe<Scalars['Float']>;
  /** Ссылка на ордер в minio */
  hrefForInvoice?: Maybe<Scalars['String']>;
  /** Уникальный идентификатор заказа */
  id: Scalars['ID'];
  /** ID заказа в 1с */
  id1c?: Maybe<Scalars['String']>;
  /** Выгружен ли в 1с */
  inOneC: Scalars['Boolean'];
  /** Способ оплаты */
  paymentMethod: Scalars['String'];
  /** Дата создания заказа */
  registred: Scalars['String'];
  /** Статус заказа */
  state: Scalars['String'];
  /** Итоговая сумма заказа */
  total: Scalars['Float'];
  /** Общая сумма товаров в заказе */
  totalAmount: Scalars['Float'];
  /** Пользователь, сделавший заказ */
  user: UserDtoForOrder;
  /** Название банка */
  userCompany_bankName: Scalars['String'];
  /** БИК банка */
  userCompany_bikBank: Scalars['String'];
  /** Расчетный счет */
  userCompany_checkingAccount: Scalars['String'];
  /** Корреспондентский счет */
  userCompany_correspondentAccount: Scalars['String'];
  /** ИНН компании */
  userCompany_inn: Scalars['String'];
  /** КПП компании */
  userCompany_kpp?: Maybe<Scalars['String']>;
  /** Наименование компании */
  userCompany_name: Scalars['String'];
  /** ОГРН(-ИП) компании */
  userCompany_ogrn: Scalars['String'];
  /** Юридический адрес компании */
  userCompany_urAddress: Scalars['String'];
};

/** Список заказов */
export type OrderListDto = {
  __typename?: 'OrderListDTO';
  /** Список заказов */
  orders: Array<OrderWithProductsDto>;
  /** Количество заказов */
  total: Scalars['Float'];
};

/** Описание товара в заказе */
export type OrderProductDto = {
  __typename?: 'OrderProductDTO';
  /** Уникальный идентификатор товара */
  id: Scalars['String'];
  /** Изображение товара */
  image?: Maybe<Scalars['String']>;
  /** Модель товара */
  model: Scalars['String'];
  /** Наименование товара */
  name: Scalars['String'];
  /** Наименование выбранной опции (если есть) */
  optionName?: Maybe<Scalars['String']>;
  /** Цена товара */
  price: Scalars['Float'];
  /** Доступное количество товара */
  quantity?: Maybe<Scalars['Float']>;
};

/** Заказ пользователя c товарами и адресом для личного кабинета */
export type OrderWithProductsDto = {
  __typename?: 'OrderWithProductsDTO';
  /** счетчик заказов */
  currentID: Scalars['Float'];
  /** Скидка на сумму заказа */
  discount?: Maybe<Scalars['Float']>;
  /** Ссылка на ордер в minio */
  hrefForInvoice?: Maybe<Scalars['String']>;
  /** Уникальный идентификатор заказа */
  id: Scalars['ID'];
  /** ID заказа в 1с */
  id1c?: Maybe<Scalars['String']>;
  /** Выгружен ли в 1с */
  inOneC: Scalars['Boolean'];
  /** Способ оплаты */
  paymentMethod: Scalars['String'];
  /** Товары в заказе */
  products: Array<OrderProductDto>;
  /** Дата создания заказа */
  registred: Scalars['String'];
  /** Статус заказа */
  state: Scalars['String'];
  /** Итоговая сумма заказа */
  total: Scalars['Float'];
  /** Общая сумма товаров в заказе */
  totalAmount: Scalars['Float'];
  /** Название банка */
  userCompany_bankName: Scalars['String'];
  /** БИК банка */
  userCompany_bikBank: Scalars['String'];
  /** Расчетный счет */
  userCompany_checkingAccount: Scalars['String'];
  /** Корреспондентский счет */
  userCompany_correspondentAccount: Scalars['String'];
  /** ИНН компании */
  userCompany_inn: Scalars['String'];
  /** КПП компании */
  userCompany_kpp?: Maybe<Scalars['String']>;
  /** Наименование компании */
  userCompany_name: Scalars['String'];
  /** ОГРН(-ИП) компании */
  userCompany_ogrn: Scalars['String'];
  /** Юридический адрес компании */
  userCompany_urAddress: Scalars['String'];
};

/** Инпут для фильтров заказов */
export type OrdersFilterAdminDto = {
  /** Дата от */
  dateFrom?: InputMaybe<Scalars['String']>;
  /** Дата до */
  dateTo?: InputMaybe<Scalars['String']>;
  /** Поиск по номеру заказа */
  orderNumber?: InputMaybe<Scalars['Float']>;
  /** Часть имени продукта для фильтрации */
  productName?: InputMaybe<Scalars['String']>;
  /** Минимальная цена для фильтрации */
  totalAmountFrom?: InputMaybe<Scalars['Float']>;
  /** Максимальная цена для фильтрации */
  totalAmountTo?: InputMaybe<Scalars['Float']>;
};

/** Инпут для фильтров заказов */
export type OrdersFilterDto = {
  /** Дата от */
  dateFrom?: InputMaybe<Scalars['String']>;
  /** Дата до */
  dateTo?: InputMaybe<Scalars['String']>;
  /** Поиск по номеру заказа */
  orderNumber?: InputMaybe<Scalars['Float']>;
  /** Часть имени продукта для фильтрации */
  productName?: InputMaybe<Scalars['String']>;
  /** Минимальная цена для фильтрации */
  totalAmountFrom?: InputMaybe<Scalars['Float']>;
  /** Максимальная цена для фильтрации */
  totalAmountTo?: InputMaybe<Scalars['Float']>;
};

/** Инпут для пагинации заказов */
export type OrdersPaginationAdminDto = {
  /** Номер страницы */
  page?: Scalars['Float'];
  /** Количество элементов на странице */
  perPage?: Scalars['Float'];
};

/** Связанные товары */
export type OtherColorProductDto = {
  __typename?: 'OtherColorProductDTO';
  /** Уникальный идентификатор записи */
  id?: Maybe<Scalars['String']>;
  /** ID связанного товара */
  otherColorProductId?: Maybe<Scalars['String']>;
  /** Связанный товар (основной) */
  product: ProductDto;
};

/** Продукт */
export type ProductDto = {
  __typename?: 'ProductDTO';
  /** Категории продукта */
  categories: Array<Scalars['String']>;
  /** Дата добавления */
  dateAdded?: Maybe<Scalars['DateTime']>;
  /** Описание продукта */
  description: ProductDescriptionDto;
  /** Ссылка на облако */
  hrefCloudPhotos?: Maybe<Scalars['String']>;
  /** ID продукта */
  id: Scalars['ID'];
  /** ID продукта в 1сфизи */
  id1c: Scalars['String'];
  /** Изображения продукта */
  images?: Maybe<Array<ProductImageDto>>;
  /** Главная категория */
  maincategory: Scalars['String'];
  /** Модель продукта */
  model: Scalars['String'];
  /** Опции продукта */
  optionValues: Array<ProductOptionValueDto>;
  /** Товары с другим цветом */
  otherColorsProducts: Array<OtherColorProductDto>;
  /** Цена продукта */
  price: Scalars['Float'];
  /** Связанные товары */
  productsRelated: Array<ProductRelatedDto>;
  /** Количество продукта */
  quantity: Scalars['Float'];
  /** Порядок сортировки */
  sortOrder: Scalars['Float'];
  /** Статус продукта */
  status: Scalars['Boolean'];
};

/** Описание продукта */
export type ProductDescriptionDto = {
  __typename?: 'ProductDescriptionDTO';
  /** Уход */
  care?: Maybe<Scalars['String']>;
  /** Состав */
  compound?: Maybe<Scalars['String']>;
  /** Описание */
  description?: Maybe<Scalars['String']>;
  /** ID описания */
  id: Scalars['ID'];
  /** Meta описание */
  meta_description?: Maybe<Scalars['String']>;
  /** Meta H1 */
  meta_h1?: Maybe<Scalars['String']>;
  /** Meta title */
  meta_title?: Maybe<Scalars['String']>;
  /** Параметры модели */
  model_parameters?: Maybe<Scalars['String']>;
  /** Название */
  name: Scalars['String'];
  /** Параметры изделия */
  parameters?: Maybe<Scalars['String']>;
  /** Тэг */
  tag?: Maybe<Scalars['String']>;
};

/** Изображение продукта */
export type ProductImageDto = {
  __typename?: 'ProductImageDTO';
  /** BASE64 изображения */
  blurDataURL?: Maybe<Scalars['String']>;
  /** ID изображения */
  id: Scalars['ID'];
  /** URL изображения в minio */
  image?: Maybe<Scalars['String']>;
  /** Название изображения в minio */
  imageNameMinio: Scalars['String'];
  /** ID продукта */
  productId: Scalars['ID'];
  /** Порядок сортировки */
  sortOrder: Scalars['Float'];
};

/** Опция продукта */
export type ProductOptionDto = {
  __typename?: 'ProductOptionDTO';
  /** ID опции */
  id: Scalars['ID'];
  /** Название опции */
  name: Scalars['String'];
  /** Тип опции */
  type: Scalars['String'];
  /** Значения опции */
  values: Array<ProductOptionValueDto>;
};

/** Значение опции продукта */
export type ProductOptionValueDto = {
  __typename?: 'ProductOptionValueDTO';
  /** Либо ID товара либо ссылка на него сразу */
  href?: Maybe<Scalars['String']>;
  /** ID значения опции */
  id: Scalars['ID'];
  option?: Maybe<OptionDto>;
  /** Цена */
  price: Scalars['Float'];
  /** Количество товара с этой опцией */
  quantity: Scalars['Float'];
  value?: Maybe<OptionValueDto>;
};

/** Значение опции продукта для пользователя */
export type ProductOptionValueForUserDto = {
  __typename?: 'ProductOptionValueForUserDTO';
  /** Либо ID товара либо ссылка на него сразу */
  href?: Maybe<Scalars['String']>;
  /** ID значения опции */
  id: Scalars['ID'];
  option?: Maybe<OptionDto>;
  /** Цена */
  price: Scalars['Float'];
  /** Количество товара с этой опцией */
  quantity: Scalars['Float'];
  value?: Maybe<OptionValueDto>;
};

/** Связанные товары */
export type ProductRelatedDto = {
  __typename?: 'ProductRelatedDTO';
  /** Уникальный идентификатор записи */
  id?: Maybe<Scalars['String']>;
  /** Связанный товар (основной) */
  product: ProductDto;
  /** ID связанного товара */
  relatedProductId?: Maybe<Scalars['String']>;
};

/** Изображение товара */
export type ProductUploadImageDto = {
  __typename?: 'ProductUploadImageDTO';
  /** Название изображения в minio */
  imageName: Scalars['String'];
};

/** Продукты и категории */
export type ProductsAndCategoriesDto = {
  __typename?: 'ProductsAndCategoriesDTO';
  /** Категории */
  categories?: Maybe<Array<CategoryDto>>;
  /** Товары */
  products?: Maybe<Array<TransformedProductDto>>;
};

/** Инпут для фильтров товаров в админке */
export type ProductsFilterAdminDto = {
  /** Фильтр по категории */
  categoryId?: InputMaybe<Scalars['String']>;
  /** Фильтр по цветам */
  colors?: InputMaybe<Array<Scalars['String']>>;
  /** Фильтр по главной категории */
  mainCategoryId?: InputMaybe<Scalars['String']>;
  /** Часть имени продукта для фильтрации */
  name?: InputMaybe<Scalars['String']>;
  /** Минимальная цена для фильтрации */
  priceFrom?: InputMaybe<Scalars['Float']>;
  /** Максимальная цена для фильтрации */
  priceTo?: InputMaybe<Scalars['Float']>;
  /** Фильтр по размерам */
  sizes?: InputMaybe<Array<Scalars['String']>>;
  /** Фильтр по статусу */
  status?: InputMaybe<Scalars['Boolean']>;
};

/** Инпут для фильтров товаров */
export type ProductsFilterInputDto = {
  /** Фильтр по цветам */
  colors?: InputMaybe<Array<Scalars['String']>>;
  /** Часть имени продукта для фильтрации */
  name?: InputMaybe<Scalars['String']>;
  /** Минимальная цена для фильтрации */
  priceFrom?: InputMaybe<Scalars['Float']>;
  /** Максимальная цена для фильтрации */
  priceTo?: InputMaybe<Scalars['Float']>;
  /** Фильтр по размерам */
  sizes?: InputMaybe<Array<Scalars['String']>>;
};

export type Query = {
  __typename?: 'Query';
  /** Получить продукты и категории */
  GetProductsAndCategories: ProductsAndCategoriesDto;
  /** Получает один баннер по id */
  banner: BannerDto;
  /** Получает один включенный баннер */
  bannersTrue: Array<BannerDto>;
  /** Проверяет статус пользователя. */
  checkUserStatus: Scalars['Boolean'];
  /** Получает все баннеры */
  getAllBannersAdmin: BannersListDto;
  /** Возвращает список всех категорий без детей и описаний */
  getAllCategories: Array<CategoryDto>;
  /** Возвращает список всех дочерних категорий */
  getAllCildrenCategories: Array<CategoryDto>;
  /** Получение всех Customers */
  getAllCustomers: CustomersResultDto;
  /** Получение всех отзывов с фильтрацией по статусу */
  getAllFeedbacks: FeedBackListDto;
  /** Получить все информационные странички */
  getAllInformations: InformationDataDto;
  /** Получить все информационные странички */
  getAllInformationsTrue: Array<InformationDto>;
  /** Получить все логи */
  getAllLogs: LogsAdminDto;
  /** Получить все опции со значениями */
  getAllOptionsWithValues: OptionsListDto;
  /** Социальные сети в футер и может ещё куда-то для админа */
  getAllSocialHrefs: SocialHrefsDataDto;
  /** Социальные сети в футер и может ещё куда-то для пользователя */
  getAllSocialHrefsForUser: Array<SocialHrefDto>;
  /** Получить все группы синонимов */
  getAllSynonymGroups: SynonymGroupListDto;
  /** Получение корзины с актуальными ценами и остатками */
  getCart: CartDto;
  /** Возвращает дерево категорий только для главной. */
  getCategoriesForHomePage: Array<CategoryDto>;
  /** Возвращает категорию по ID. */
  getCategoryById?: Maybe<CategoryDto>;
  /** Возвращает категорию по ID с детьми и прочим гавном */
  getCategoryByIdForUser?: Maybe<CategoryDto>;
  /** Возвращает дерево категорий. */
  getCategoryTree: CategoryListDto;
  /** Возвращает дерево категорий только со включеннми статусами. */
  getCategoryTreeForUser: Array<CategoryDto>;
  /** Возвращает список всех дочерних категорий */
  getChildrenCategories: Array<CategoryDto>;
  /** Получает информацию о пользователе админки */
  getCustomer: CustomerDto;
  /** Получение дашборда для админки */
  getDashbord: DashboardDto;
  /** Получение одного отзыва по ID */
  getFeedbackById: FeedBackDto;
  /** Получить информационную страничку по ID */
  getInformation: InformationDto;
  /** Получить информационную страничку по NAME */
  getInformationByName: InformationDto;
  /** Получить информационную страничку по ID */
  getInformationTrue: InformationDto;
  /** Запрос по id одного блока */
  getMainPageBlock: MainPageBlockDto;
  /** Запрос только включенных  блоков */
  getMainPageBlocksOnlyTrue: Array<MainPageBlockDto>;
  /** Получить новинки */
  getNewProducts: Array<TransformedProductDto>;
  /** Получить опцию по идентификатору */
  getOptionById: OptionDto;
  /** Получить акутальные опции для фильтра */
  getOptionsForFilter: Array<OptionFilterDto>;
  /** Возвращает список всех родительских категорий */
  getParentCategories: Array<CategoryDto>;
  /** Получить продукт по ID */
  getProductById: TransformedProductDto;
  /** Получить продукт по ID */
  getProductByIdAdmin: TransformedProductDto;
  /** Получить все продукты */
  getProducts: TransformedProductsDto;
  /** Получить все продукты */
  getProductsAdmin: TransformedProductsDto;
  /** Получить 6 рандомных товарв */
  getRandProducts: Array<TransformedProductDto>;
  /** Социальная сеть для админа */
  getSocialHref: SocialHrefDto;
  /** Получить одну группу синонимов по ID */
  getSynonymGroupById: SynonymGroupDto;
  /** Получить пользователя по ID */
  getUserById: UserDto;
  /** Получение всех отзывов пользователя */
  getUserFeedbacks: Array<FeedBackDto>;
  /** Получает информацию о текущем пользователе по его ID из контекста токена. */
  getUserInfo?: Maybe<UserDto>;
  /** Запрос всех блоков */
  mainPageBlocks: MainPageBlockListDto;
  /** Получить 12 рандомных товарв из категории */
  randProductsByCategory: Array<TransformedProductDto>;
  /** Отправляет код подтверждения на email пользователя и сохраняет его у нас в системе */
  resetPassword: Scalars['Boolean'];
  /** Отправляет код подтверждения на email пользователя и сохраняет его у нас в системе */
  sendCodeResetPassword: Scalars['Boolean'];
  uptime: Scalars['Float'];
  /** Проверяет валидность токена. */
  verifyTokenCustomer: Scalars['Boolean'];
  /** Проверяет валидность токена. */
  verifyTokenUser: Scalars['Boolean'];
  /** Получает информацию о текущем пользователе, авторизованном через токен. */
  whoIAm: UserDto;
  /** Получает информацию о текущем пользователе админки, авторизованном через токен. */
  whoIAmCustomer: CustomerDto;
};


export type QueryGetProductsAndCategoriesArgs = {
  searchInput: SearchInputDto;
};


export type QueryBannerArgs = {
  id: Scalars['ID'];
};


export type QueryGetAllBannersAdminArgs = {
  pagination: OrdersPaginationAdminDto;
  sortBy?: InputMaybe<Scalars['String']>;
  sortOrder?: InputMaybe<Scalars['String']>;
};


export type QueryGetAllCustomersArgs = {
  filter?: InputMaybe<CustomersFilterAdminDto>;
  pagination: OrdersPaginationAdminDto;
  sortBy?: InputMaybe<Scalars['String']>;
  sortOrder?: InputMaybe<Scalars['String']>;
};


export type QueryGetAllFeedbacksArgs = {
  filter?: InputMaybe<FeedBackListFilterAdminDto>;
  pagination: OrdersPaginationAdminDto;
};


export type QueryGetAllInformationsArgs = {
  pagination: OrdersPaginationAdminDto;
};


export type QueryGetAllLogsArgs = {
  admin?: InputMaybe<Scalars['String']>;
  dataId?: InputMaybe<Scalars['String']>;
  fromDate?: InputMaybe<Scalars['String']>;
  pagination: OrdersPaginationAdminDto;
  service?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  toDate?: InputMaybe<Scalars['String']>;
};


export type QueryGetAllOptionsWithValuesArgs = {
  pagination: OrdersPaginationAdminDto;
};


export type QueryGetAllSocialHrefsArgs = {
  pagination: OrdersPaginationAdminDto;
};


export type QueryGetAllSynonymGroupsArgs = {
  filter?: InputMaybe<SynonymGroupFilterAdminDto>;
  pagination: OrdersPaginationAdminDto;
};


export type QueryGetCategoryByIdArgs = {
  id: Scalars['String'];
};


export type QueryGetCategoryByIdForUserArgs = {
  id: Scalars['String'];
};


export type QueryGetCategoryTreeArgs = {
  filter?: InputMaybe<CategoryListFilterAdminDto>;
  pagination: OrdersPaginationAdminDto;
};


export type QueryGetCustomerArgs = {
  id: Scalars['String'];
};


export type QueryGetFeedbackByIdArgs = {
  input: FeedBackIdInput;
};


export type QueryGetInformationArgs = {
  id: Scalars['String'];
};


export type QueryGetInformationByNameArgs = {
  name: Scalars['String'];
};


export type QueryGetInformationTrueArgs = {
  id: Scalars['String'];
};


export type QueryGetMainPageBlockArgs = {
  IdMainPageBlockInputDTO: IdMainPageBlockInputDto;
};


export type QueryGetOptionByIdArgs = {
  id: Scalars['String'];
};


export type QueryGetProductByIdArgs = {
  id: Scalars['String'];
};


export type QueryGetProductByIdAdminArgs = {
  id: Scalars['String'];
};


export type QueryGetProductsArgs = {
  categoryId?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<ProductsFilterInputDto>;
  limit?: Scalars['Float'];
  mainCategoryId?: InputMaybe<Scalars['String']>;
  offset?: Scalars['Float'];
  sortBy?: InputMaybe<Scalars['String']>;
  sortOrder?: InputMaybe<Scalars['String']>;
};


export type QueryGetProductsAdminArgs = {
  filter?: InputMaybe<ProductsFilterAdminDto>;
  pagination: OrdersPaginationAdminDto;
  sortBy?: InputMaybe<Scalars['String']>;
  sortOrder?: InputMaybe<Scalars['String']>;
};


export type QueryGetSocialHrefArgs = {
  id: Scalars['ID'];
};


export type QueryGetSynonymGroupByIdArgs = {
  id: Scalars['ID'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['String'];
};


export type QueryMainPageBlocksArgs = {
  pagination: OrdersPaginationAdminDto;
  sortBy?: InputMaybe<Scalars['String']>;
  sortOrder?: InputMaybe<Scalars['String']>;
};


export type QueryRandProductsByCategoryArgs = {
  mainCategory: Scalars['String'];
  productId: Scalars['String'];
};


export type QueryResetPasswordArgs = {
  resetPasswordInput: ResetPasswordInputDto;
};


export type QuerySendCodeResetPasswordArgs = {
  codeForResetPasswordInput: CodeForResetPasswordInputDto;
};

/** DTO для обновления токена */
export type RefreshResponseDto = {
  __typename?: 'RefreshResponseDTO';
  /** Токен доступа для новой сессии аутентификации */
  access_token: Scalars['String'];
  /** Токен обновления для получения нового access token */
  refresh_token: Scalars['String'];
};

/** DTO для удаления элемента корзины */
export type RemoveFromCartInput = {
  /** ID элемента корзины */
  itemId: Scalars['String'];
};

/** Входные данные для восстановления пароля пользователя */
export type ResetPasswordInputDto = {
  /** email человека */
  email: Scalars['String'];
};

export type SalesDataDto = {
  __typename?: 'SalesDataDTO';
  amount: Scalars['Float'];
  date: Scalars['String'];
};

/** Передаем строку для поиска */
export type SearchInputDto = {
  /** Строка с названием либо товара, либо категории. первый раз закинуть null */
  searchString?: InputMaybe<Scalars['String']>;
};

/** Входные данные для создания пользователя */
export type SignUpUserInputDto = {
  /** Компания пользователя */
  company: UserCompanyInputDto;
  /** Почта */
  email: Scalars['String'];
  /** Имя контактного лица */
  name: Scalars['String'];
  /** Пароль */
  password: Scalars['String'];
  /** Номер телефона */
  phone: Scalars['String'];
  /** Повтор пароля */
  secondPassword: Scalars['String'];
};

/** DTO социальной сети */
export type SocialHrefDto = {
  __typename?: 'SocialHrefDTO';
  /** Ссылка на соц сеть */
  href: Scalars['String'];
  /** UUID ссылки соц */
  id: Scalars['ID'];
  /** По большей части тэг, типа vk, inst, telegram, wa и тд */
  name: Scalars['String'];
  /** Порядок сортировки */
  sortOrder: Scalars['Float'];
};

/** DTO социальных сетей сети */
export type SocialHrefsDataDto = {
  __typename?: 'SocialHrefsDataDTO';
  /** Соц сетей */
  data: Array<SocialHrefDto>;
  /** Количество */
  total: Scalars['Float'];
};

/** Состояние */
export type State = {
  __typename?: 'State';
  /** Дата актуальности (в миллисекундах) */
  actuality_date?: Maybe<Scalars['Float']>;
  /** Код статуса (может быть null) */
  code?: Maybe<Scalars['String']>;
  /** Дата ликвидации (может быть null) */
  liquidation_date?: Maybe<Scalars['Float']>;
  /** Дата регистрации (в миллисекундах) */
  registration_date?: Maybe<Scalars['Float']>;
  /** Статус (например, ACTIVE) */
  status?: Maybe<Scalars['String']>;
};

/** Статус заказа */
export enum StateOrder {
  /** Закрыт */
  Closed = 'closed',
  /** Создан */
  Created = 'created',
  /** В обработке */
  Inprocessing = 'inprocessing',
  /** Оплачен */
  Paid = 'paid',
  /** Отправлен */
  Sent = 'sent'
}

/** группы синонимов */
export type SynonymGroupDto = {
  __typename?: 'SynonymGroupDto';
  /** ID группы синонимов */
  id: Scalars['ID'];
  /** Список обновленных синонимов, разделенных запятыми */
  synonyms: Scalars['String'];
};

/** Инпут для фильтров групп синонимов */
export type SynonymGroupFilterAdminDto = {
  /** фильтр по статусу */
  synonym?: InputMaybe<Scalars['String']>;
};

/** группы синонимов */
export type SynonymGroupListDto = {
  __typename?: 'SynonymGroupListDto';
  /** ID группы синонимов */
  data: Array<SynonymGroupDto>;
  /** Количество групп синонимов */
  total: Scalars['Float'];
};

/** Трансформированный продукт */
export type TransformedProductDto = {
  __typename?: 'TransformedProductDTO';
  /** Категории продукта */
  categories: Array<Scalars['String']>;
  /** Дата добавления */
  dateAdded?: Maybe<Scalars['DateTime']>;
  /** Описание продукта */
  description: ProductDescriptionDto;
  /** Ссылка на облако */
  hrefCloudPhotos?: Maybe<Scalars['String']>;
  /** ID продукта */
  id: Scalars['ID'];
  /** ID продукта */
  id1c: Scalars['String'];
  /** Изображения продукта */
  images: Array<ProductImageDto>;
  /** Главная категория */
  maincategory: Scalars['String'];
  /** Модель продукта */
  model: Scalars['String'];
  /** Опции продукта */
  options: Array<ProductOptionDto>;
  /** Товары c другими цветами */
  otherColorsProducts?: Maybe<Array<TransformedProductDto>>;
  /** Цена продукта */
  price: Scalars['Float'];
  /** Товары связанные */
  productsRelated?: Maybe<Array<TransformedProductDto>>;
  /** Количество продукта */
  quantity: Scalars['Float'];
  /** Порядок сортировки */
  sortOrder: Scalars['Float'];
  /** Статус продукта */
  status: Scalars['Boolean'];
};

/** Продукты */
export type TransformedProductsDto = {
  __typename?: 'TransformedProductsDTO';
  /** Товары */
  data?: Maybe<Array<TransformedProductDto>>;
  /** Общее количество товаров */
  total: Scalars['Float'];
};

/** DTO для обнновления полей баннера */
export type UpdateBannerInputDto = {
  /** UUID Баннера */
  id: Scalars['ID'];
  /** Изображение для десктопа */
  image: Scalars['String'];
  /** Изображение для мобилки */
  image_mob: Scalars['String'];
  /** Ссылка на баннере */
  link?: InputMaybe<Scalars['String']>;
  /** Название баннера */
  name: Scalars['String'];
  /** Статус баннера */
  status: Scalars['Boolean'];
  /** Заголовок на баннере */
  title?: InputMaybe<Scalars['String']>;
};

/** DTO для обновления товара */
export type UpdateCartItemQuantityInput = {
  /** ID элемента корзины */
  itemId: Scalars['String'];
  /** Количество товара */
  quantity: Scalars['Float'];
};

export type UpdateCategoryDto = {
  /** Описания категории */
  descriptions: Array<UpdateCategoryDescriptionDto>;
  id: Scalars['String'];
  /** Ссылка на изображение */
  image?: InputMaybe<Scalars['String']>;
  /** На главную */
  onHomePage?: InputMaybe<Scalars['Boolean']>;
  /** Родительская категория */
  parent_id?: InputMaybe<Scalars['String']>;
  /** Порядок сортировки */
  sort_order: Scalars['Float'];
  /** Статус категории */
  status?: InputMaybe<Scalars['Boolean']>;
};

export type UpdateCategoryDescriptionDto = {
  /** Описание категории */
  description?: InputMaybe<Scalars['String']>;
  /** Принадлежность к категории - id */
  id: Scalars['String'];
  /** meta_description */
  meta_description?: InputMaybe<Scalars['String']>;
  /** meta_h1 */
  meta_h1?: InputMaybe<Scalars['String']>;
  /** meta_keyword */
  meta_keyword?: InputMaybe<Scalars['String']>;
  /** meta_title */
  meta_title?: InputMaybe<Scalars['String']>;
  /** Название категории */
  name: Scalars['String'];
};

export type UpdateCompanyDto = {
  /** Название банка */
  bankName: Scalars['String'];
  /** БИК банка */
  bikBank: Scalars['String'];
  /** расчетный счет */
  checkingAccount: Scalars['String'];
  /** Корреспондентский счет */
  correspondentAccount: Scalars['String'];
  /** ИНН */
  inn: Scalars['String'];
  /** КПП */
  kpp?: InputMaybe<Scalars['String']>;
  /** Наименование компании */
  name: Scalars['String'];
  /** ОГРН(-ИП) */
  ogrn?: InputMaybe<Scalars['String']>;
  /** Юридический адрес */
  urAddress: Scalars['String'];
};

/** Обновление пользователя админки */
export type UpdateCustomerDto = {
  /** Почта */
  email: Scalars['String'];
  /** id пользователя */
  id: Scalars['String'];
  /** Логин пользователя */
  login: Scalars['String'];
  /** Пароль Если задан то новый, если нет, то старый */
  password?: InputMaybe<Scalars['String']>;
  /** Роль пользователя */
  role: CustomerRole;
};

/** DTO для обновления блока на главной странице */
export type UpdateMainPageBlockInputDto = {
  /** UUID Блока */
  id: Scalars['ID'];
  /** Ссылка блока */
  link: Scalars['String'];
  /** Название блока */
  name: Scalars['String'];
  /** Товары в блоке */
  products: Array<Scalars['String']>;
  /** Ссылка блока */
  sort: Scalars['Float'];
  /** Статус блока */
  status: Scalars['Boolean'];
  /** Заголовок блока */
  title: Scalars['String'];
};

export type UpdateOptionValueForOptionInput = {
  optionId: Scalars['ID'];
  values: Array<UpdateOptionValueInput>;
};

/** Обновление значения опции */
export type UpdateOptionValueInput = {
  colorCode?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  name: Scalars['String'];
  sortOrder?: InputMaybe<Scalars['Float']>;
};

/** DTO для обновления ссылки на соц сеть */
export type UpdateSocialHrefInputDto = {
  /** Заголовок на баннере */
  href?: InputMaybe<Scalars['String']>;
  /** UUID ссылки на соц сеть */
  id: Scalars['ID'];
  /** Название баннера */
  name: Scalars['String'];
  /** Порядок сортировки */
  sortOrder?: InputMaybe<Scalars['Float']>;
};

/** Входные данные для обновления группы синонимов */
export type UpdateSynonymGroupDto = {
  /** ID группы синонимов */
  id: Scalars['ID'];
  /** Список обновленных синонимов, разделенных запятыми */
  synonyms: Scalars['String'];
};

export type UpdateUserDto = {
  /** Имя контактного лица */
  name: Scalars['String'];
  phone: Scalars['String'];
  status: Scalars['Boolean'];
};

export type UpdateUserForAdminDto = {
  /** ID */
  id: Scalars['String'];
  /** Имя контактного лица */
  name: Scalars['String'];
  phone: Scalars['String'];
  status: Scalars['Boolean'];
};

/** Договор пользователя */
export type UserAgreementDto = {
  __typename?: 'UserAgreementDTO';
  /** Дата подписания */
  date?: Maybe<Scalars['DateTime']>;
  /** ID Договора */
  id: Scalars['ID'];
  /** Подписан или нет */
  signed: Scalars['Boolean'];
};

/** Компания пользователя */
export type UserCompanyDto = {
  __typename?: 'UserCompanyDTO';
  /** Название банка */
  bankName: Scalars['String'];
  /** БИК банка */
  bikBank: Scalars['String'];
  /** расчетный счет */
  checkingAccount: Scalars['String'];
  /** Корреспондентский счет */
  correspondentAccount: Scalars['String'];
  /** ID компании */
  id: Scalars['ID'];
  /** ИНН */
  inn: Scalars['String'];
  /** КПП */
  kpp?: Maybe<Scalars['String']>;
  /** Наименование компании */
  name: Scalars['String'];
  /** ОГРН(-ИП) */
  ogrn?: Maybe<Scalars['String']>;
  /** Юридический адрес */
  urAddress?: Maybe<Scalars['String']>;
};

/** Компания пользователя */
export type UserCompanyInputDto = {
  /** Название банка */
  bankName: Scalars['String'];
  /** БИК банка */
  bikBank: Scalars['String'];
  /** расчетный счет */
  checkingAccount: Scalars['String'];
  /** Корреспондентский счет */
  correspondentAccount: Scalars['String'];
  /** ИНН */
  inn: Scalars['String'];
  /** КПП */
  kpp?: InputMaybe<Scalars['String']>;
  /** Наименование компании */
  name: Scalars['String'];
  /** ОГРН(-ИП) */
  ogrn?: InputMaybe<Scalars['String']>;
  /** Юридический адрес */
  urAddress: Scalars['String'];
};

/** Пользователь */
export type UserDto = {
  __typename?: 'UserDTO';
  /** Договор пользователя */
  agreement?: Maybe<UserAgreementDto>;
  /** Компания пользователя */
  company: UserCompanyDto;
  /** Почта */
  email: Scalars['String'];
  /** ID пользователя */
  id: Scalars['ID'];
  /** Последняя авторизация */
  lastLogin?: Maybe<Scalars['DateTime']>;
  /** Наименование компании или имя и фамилия контактного лица */
  name: Scalars['String'];
  /** Номер телфона */
  phone: Scalars['String'];
  /** Дата регистрации */
  registrationDate: Scalars['DateTime'];
  /** Статус пользователя */
  status: Scalars['Boolean'];
};

/** Пользователь */
export type UserDtoForOrder = {
  __typename?: 'UserDTOForOrder';
  /** Почта */
  email: Scalars['String'];
  /** ID пользователя */
  id: Scalars['ID'];
  /** Наименование компании или имя и фамилия контактного лица */
  name: Scalars['String'];
  /** Номер телфона */
  phone: Scalars['String'];
  /** Статус пользователя */
  status: Scalars['Boolean'];
};

/** Инпут для фильтров списка пользователей магазина */
export type UsersFilterAdminDto = {
  /** фильтр по  email */
  filterEmail?: InputMaybe<Scalars['String']>;
  /** фильтр по части Имени  */
  filterName?: InputMaybe<Scalars['String']>;
  /** фильтр по части номера телефона */
  filterPhone?: InputMaybe<Scalars['String']>;
  /** фильтр по статусу */
  filterStatus?: InputMaybe<Scalars['Boolean']>;
};

/** Пользователи магазина */
export type UsersResultsDto = {
  __typename?: 'UsersResultsDTO';
  /** Общее количество пользователей */
  total?: Maybe<Scalars['Float']>;
  /** Информация о пользователях */
  users?: Maybe<Array<UserDto>>;
};

export type NewUserPasswordInputDto = {
  /** email человека */
  email: Scalars['String'];
  /** Новый пароль пользователя */
  newPassword: Scalars['String'];
};
