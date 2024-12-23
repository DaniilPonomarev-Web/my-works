import { variablesForUser } from './variables';

export const HttpExceptionMessagesGraphQL = {
  emailError: 'Ошибка при отправке письма с кодом, повторите попытку.',
  /* Товары */
  validationProduct: {
    id: { not: 'Укажите ID товара' },
    errorCharter:
      'Порядок сортировки не должен содержать букв или других символов',
    image: {
      not: 'Укажите ссылку на изображение товара',
      length: `Ссылка на изображение товара должна содержать от 1 до 100 символов `,
      sortOrder: `Сортировка не может быть пустой`,
    },

    name: {
      not: 'Введите название товара',
      length: `Название товара должно содержать от 1 до 30 символов `,
    },
    description: {
      not: 'Введите описание товара',
      length: `Описание товара должно содержать от 1 до 1000 символов `,
    },
    tag: {
      not: 'Укажите тег товара',
      length: `Тэг товара должен быть от 1 до 10 символов`,
    },
    meta_title: {
      not: 'Введите заголовок для SEO',
      length: `Заголовок для SEO должен содержать от 1 до 30 символов `,
    },

    meta_h1: {
      not: 'Введите заголовок H1 для SEO',
      length: `Заголовок H1 для SEO должен содержать от 1 до 30 символов `,
    },
    meta_description: {
      not: 'Введите описание для SEO',
      length: `Описание для SEO должно содержать от 1 до 300 символов `,
    },
    model: {
      not: 'Укажите модель товара',
      length: `Модель товара должна содержать от 1 до 30 символов `,
    },
    price: {
      not: 'Укажите цену товара',
      min: 'Цена товара не может быть меньше 0',
      max: 'Цена товара не может быть больше 1000000000',
      number: `Цена товара должна быть числом`,
    },
    quantity: {
      not: 'Укажите количество товара',
      number: `Количество товара товара должна быть числом`,
      min: 'Количество товара не может быть меньше 0',
      max: 'Количество товара не может быть больше 1000000000',
    },
    maincategory: { not: 'Укажите основную товарную категорию' },
    categories: { not: 'Укажите категории товара' },
    options: {
      not: 'Укажите опции товара',
    },
    status: { not: 'Укажите статус' },
    sortOrder: {
      not: 'Укажите порядок сортировки',
      number: `Порядок сортировкитовара должна быть числом`,
    },
    images: {
      not: 'Укажите изображения товара',
    },

    productDescription: {
      id: { not: 'Укажите ID описания' },
    },
  },
  /* Товары */
  /* Авторизация  */
  auth: {
    errorTokenValid: 'Передан невалидный токен',
    errorToken: 'Ошибка проверки токена.',
    errorTokenTime: 'Токен истек.',
    dataNotCorrect: 'Указан неверный логин или пароль',
    errorRule: 'Нет доступа на выполнение операции',
    errorRuler: (userRole: string, needRoles: string[]) =>
      `Ошибка доступа, Ваша роль - ${userRole}. Требуется - ${needRoles}.`,
  },

  /* Авторизация  */

  /* Юзер*/
  user: {
    notUserId: 'Идентификатор пользователя не был предоставлен',
    notUser: 'Пользователь не найден в системе',
    userDown:
      'Ошибка авторизации. Пожалуйста, свяжитесь с нашим менеджером по тел. +7 912 050-76-66',
    notUsers: 'Пользователи не найдены в системе',
    userWithPhoneWasCreated:
      'Пользователь с таким номером телефона уже зарегистрирован в системе',
    userWithEmailWasCreated:
      'Пользователь с таким email уже зарегистрирован в системе',
    userWithInnWasCreated:
      'Пользователь с таким ИНН уже зарегистрирован в системе',
    userWithOgrnWasCreated:
      'Пользователь с таким ОГРН(-ИП) уже зарегистрирован в системе',
    dadata: `Недостоверные сведения об организации (ИНН)`,
    errorRegister: 'При регистрации произошла ошибка',
    errorCreate: 'При создании пользователя произошла ошибка',
    errorResetPassword: 'Упс... Повторите попытку еще раз',
    errorUpdateLastLogin: 'Ошибка обновления последней даты входа',
    errorUpdateUserData: 'Ошибка обновления данных пользователя',
    errorUpdateUserStatusData: 'Ошибка обновления статуса пользователя',
    errorUpdateUserPassword: 'Ошибка изменения пароля',
    notPasswordCorrect: 'Указан некорректный пароль',
    notOldPassNotNewPassword: 'Пароли не совподают',
    company: {
      errorUpdate: 'Ошибка обновления компании пользователя',
    },
    address: {
      errorAdd: 'Ошибка добавления адреса',
      errorUpdate: 'Ошибка обновления адреса пользователя',
      errorDelete: 'Ошибка удаления адреса пользователя',
      errorAlone: 'Адрес всегда должен быть один',
    },
  },
  /* Юзер*/

  /* Блок товаров на главной странице */
  mainPageBlock: {
    errorFindBlock: (id: string) => `Блок с ${id} не найден`,
    errorDelete: 'Ошибка удаления блока',
  },

  validationMainPageBlock: {
    id: {
      not: 'Введите ID блока',
    },
    name: {
      not: 'Введите название блока',
      length: `Название блока должно содержать от 1 до 30 символов `,
    },
    sort: {
      not: 'Введите порядок сортировки',
      errorCharter:
        'Порядок сортировки не должен содержать букв или других символов',
    },
    title: {
      not: 'Введите заголовок блока',
      length: `Заголовок блока должен содержать от 3 до 30 символов `,
    },
    link: {
      not: 'Укажите ссылку на баннер',
      notValid: 'Ссылка на баннер должна быть строкой',
      length: `Ссылка на баннер должна содержать от 1 до 100 символов`,
    },
    status: {
      not: 'Укажите статус',
    },
    products: {
      not: 'Нужно выбрать товары',
    },
  },
  /* Блок товаров на главной странице */

  category: {
    notError: `Категория не найдена`,
    notUpdate: `Не удалось обновить категорию`,
    notCreate: `Не удалось создать категорию`,
    notTree: `Не удалось получить категории`,
    notStatue: `Категория отключена`,
    validations: {
      id: {
        not: 'Введите ID категории',
      },
      main: {
        not: 'Укажите главная ли это категория',
      },
      name: {
        not: 'Введите название категории',
        length: `Название категории должно содержать от 1 до 30 символов `,
      },
      description: {
        not: 'Введите описание категории',
        length: `Описание категории должно содержать от 1 до 255 символов `,
      },

      sort: {
        not: 'Введите порядок сортировки',
        errorCharter:
          'Порядок сортировки не должен содержать букв или других символов',
      },
    },
  },
  /* Баннеры */
  banner: {
    errorFind: 'Баннер не найден',
    errorUpdate: 'Ошибка обновления баннера',
    errorDelete: 'Ошибка удаления баннера',
    errorAdd: 'Ошибка добавления баннера',
    errorDeleteCount: 'Должен быть всегда один баннер',
  },
  validationsBanner: {
    id: {
      not: 'Введите ID баннера',
    },
    name: {
      not: 'Введите название баннера',
      length: `Название баннера должно содержать от 1 до 30 символов `,
    },
    status: {
      not: 'Укажите статус',
    },
    title: {
      not: 'Введите заголовок на баннере',
      length: `Заголовок на баннере должен содержать от 1 до 30 символов`,
    },
    link: {
      not: 'Укажите ссылку на баннер',
      notValid: 'Ссылка на баннер должна быть строкой',
      length: `Ссылка на баннер должна содержать от 1 до 100 символов`,
    },
    image: {
      not: 'Укажите ссылку на десктоп изображение',
    },
    image_mob: {
      not: 'Укажите ссылку на мобильное изображение',
    },
  },
  /* Баннеры */

  /* feedback */
  validationsFeedBack: {
    id: {
      not: 'Укажите ID запроса!',
    },
    text: {
      not: 'Введите текст запроса!',
    },
  },
  /* feedback */

  /* ВАЛИДАЦИИ Пользователя */
  valiadtions: {
    phone: {
      phoneMinLenght: `Номер телефона должен содержать минимум ${variablesForUser.signUpUser.phone.min} символов`,
      phoneMaxLenght: `Номер телефона должен содержать максимум ${variablesForUser.signUpUser.phone.max} символов`,
      phoneFixLengh: `Номер телефона должен содержать ${variablesForUser.signUpUser.phone.fix} символов`,
      notPhone: `Укажите номер телефона`,
      notValid: `Введен некорректный номер телефона`,
    },
    status: {
      notStatus: 'Укажите статус',
    },
    name: {
      maxLenght: `Имя контактного лица должно содержать максимум ${variablesForUser.signUpUser.name.max} символов`,
      notName: `Укажите имя контактного лица`,
    },
    code: {
      not: 'Введите код!',
      notAllowed: 'Код неверный!',
    },
    email: {
      notEmail: 'Укажите email',
      emailCorrect: 'Указан некорректный email',
    },

    login: {
      notLogin: 'Укажите логин (email)',
      loginCorrect: 'Указан некорректный логин',
    },
    loginCustomer: {
      notLogin: 'Укажите логин ',
      loginCorrect: 'Указан некорректный логин',
    },
    oldPassword: {
      nototOldPassword: 'Укажите старый пароль',
    },
    password: {
      notPassword: 'Укажите пароль',
      notSecondPassword: 'Укажите повторный пароль',
      minLength: `Пароль должен содержать не менее  ${variablesForUser.signUpUser.password.min} символов`,
      maxLength: `Пароль должен содержать не более  ${variablesForUser.signUpUser.password.max} символов`,
      length: `Пароль должен содержать от ${variablesForUser.signUpUser.password.min}  до  ${variablesForUser.signUpUser.password.max} символов`,
      mismatch: 'Пароли не совпадают!',
      strong: `Пароль должен включать хотя бы одну прописную букву, одну строчную букву, одну цифру и один из следующих символов: @$!%*?&`,
    },
    passwordNew: {
      notPassword: 'Укажите новый пароль',
      minLength: `Новый пароль должен содержать не менее  ${variablesForUser.signUpUser.password.min} символов`,
      maxLength: `Новый пароль должен содержать не более  ${variablesForUser.signUpUser.password.max} символов`,
      strong: `Новый пароль должен включать хотя бы одну прописную букву, одну строчную букву, одну цифру и один из следующих символов: @$!%*?&`,
    },
    company: {
      name: {
        minLenght: `Наименование компании должно содержать минимум ${variablesForUser.signUpUser.company.name.min} символов`,
        maxLenght: `Наименование компании должно содержать максимум ${variablesForUser.signUpUser.company.name.max} символов`,
        notName: `Укажите нименование компании`,
      },
      urAddress: {
        minLenght: `Юридический адрес компании должно содержать минимум ${variablesForUser.signUpUser.company.urAddress.min} символов`,
        maxLenght: `Юридический адрес компании должно содержать максимум ${variablesForUser.signUpUser.company.urAddress.max} символов`,
        notName: `Укажите юридический адрес компании`,
      },
      inn: {
        errorValid: 'Указан некорректный ИНН',
        notINN: 'Введите ИНН',
        errorCharter: 'ИНН не должен содержать букв или других символов',
        minLenght: `ИНН должен содержать минимум ${variablesForUser.signUpUser.company.inn.min} символов`,
        maxLenght: `ИНН должен содержать максимум ${variablesForUser.signUpUser.company.inn.max} символов`,
        length: `ИНН должен содержать от ${variablesForUser.signUpUser.company.inn.min}  до   ${variablesForUser.signUpUser.company.inn.max} символов`,
      },
      ogrn: {
        notOGRN: 'Введите ОГРН(-ИП)',
        errorValid: 'Указан некорректный ОГРН(-ИП)',
        errorCharter: 'ОГРН(-ИП) не должен содержать букв или других символов',
      },
      kpp: {
        notKPP: 'Введите КПП',
        errorValid: 'Указан некорректный КПП',
        errorCharter: 'КПП не должен содержать букв или других символов',
        FixedLength: `КПП должен содержать  ${variablesForUser.signUpUser.company.kpp.fix} символов`,
      },
    },

    addresses: {
      id: `Укажите id адерса`,
      country: {
        not: 'Введите Cтрану',
        length: `ИНН должен содержать от ${variablesForUser.signUpUser.addresses.country.min}  до   ${variablesForUser.signUpUser.addresses.country.max} символов`,
      },
      city: {
        not: 'Введите город',
        length: `Город должен содержать от ${variablesForUser.signUpUser.addresses.city.min}  до    ${variablesForUser.signUpUser.addresses.city.max} символов`,
      },
      street: {
        not: 'Введите улицу',
        length: `Улица должен содержать от  ${variablesForUser.signUpUser.addresses.street.min}  до    ${variablesForUser.signUpUser.addresses.street.max} символов`,
      },
      home: {
        not: 'Введите номер дома',
        length: `Номер дома должен содержать от ${variablesForUser.signUpUser.addresses.home.min}  до     ${variablesForUser.signUpUser.addresses.home.max} символов`,
      },
      apartmentORoffice: {
        not: 'Введите номер офиса либо квартиры',
        length: `Номер офиса либо квартиры должен содержать от  ${variablesForUser.signUpUser.addresses.apartmentORoffice.min}  до    ${variablesForUser.signUpUser.addresses.apartmentORoffice.max} символов`,
      },
    },
    imageError: {
      fileSize: 'Файл слишком большой. Максимальный размер 5МБ.',
      fileException:
        'Недопустимый формат файла. Допустимые форматы: *.doc, *.docx, *.rtf, *.pdf, *.odt, * .jpg,* .jpeg, *.png, *.xlsx, *.xls, *.csv, *.rar, *.zip, *.7z ',
    },
  },
  /* ВАЛИДАЦИИ Пользователя */

  /* Вопросы Ответы */
  notAnswerError: 'Ответа не существует.',
  notAnswersError: 'Ответов не существует.',
  notAnswersByQuestionError: 'Ответов по данному вопросу не существует.',
  answerCreateError: 'Ошибка создания ответа.',
  answerUpdateError: 'Не удалось обновить ответ.',
  answerTextError: 'Название ответа должено быть от 3 до 255 символов.',

  notQuestionError: 'Вопроса не существует.',
  notQuestionsError: 'Вопросов не существует.',
  questionCreateError: 'Ошибка создания вопроса.',
  questionUpdateError: 'Ошибка создания вопроса.',
  questionShutdownError: 'Ошибка отключения вопроса.',
  questionTextError: 'Название вопроса должено быть от 3 до 255 символов.',

  answerQuestionCreateError: 'Ошибка создания вопрос-ответа.',
  notAnswerQuestionError: 'Вопрос-ответа не существует.',
  notAnswerQuestionEnebledError: 'Включенных вопрос-ответов не существует.',
  answerQuestionUpdateError: 'Не удалось обновить вопрос-ответ.',
  answerQuestionShutdownError: 'Не удалось отключить вопрос-ответ.',
  /* Вопросы Ответы */
};

export const errorMessages = {
  files: {
    errorLoadToMinio: ' Ошибка при загрузке файла в хранилище',
  },
};
