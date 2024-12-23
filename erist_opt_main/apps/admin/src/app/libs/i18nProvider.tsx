import polyglotI18nProvider from 'ra-i18n-polyglot';
import russianMessages from 'ra-language-russian';

const customRussianMessages = {
  ...russianMessages,
  resources: {
    customers: {
      name: 'Пользователь |||| Пользователи',
    },
  },
  ra: {
    action: {
      delete: 'Удалить',
      show: 'Просмотр',
      list: 'Список',
      save: 'Сохранить',
      create: 'Создать',
      unselect: 'Отменa выбора',
      undo: 'Отменить',
      edit: 'Редактировать',
      cancel: 'Завершить',
      add_filter: 'Добавить фильтр',
      remove_filter: 'Удалить фильтр',
      back: 'Назад',
      bulk_actions: 'Выбрано %{smart_count}',
      export: 'Экспорт в excel',
      sort: 'Сортировать',
      move_down: 'Вниз',
      move_up: 'Вверх',
      remove: 'Удалить',
      add: 'Добавить',
      clear_array_input: 'Удалить все значения',
      confirm: 'Принять',
      clear_input_value: 'Очитить поле ввода',
    },
    sort: {
      ASC: 'По возрастанию',
      DESC: 'По убыванию',
    },
    boolean: {
      true: 'Да',
      false: 'Нет',
    },
    configurable: {
      customize: 'customize',
    },
    page: {
      list: 'Список %{name}',
      edit: '%{name} #%{id}',
      show: '%{name} #%{id}',
      create: 'Создать %{name}',
      delete: 'Удалить %{name} #%{id}',
      dashboard: 'Главная',
      not_found: 'Не найдено',
      loading: 'Загрузка',
      empty: 'Данные не найдены',
      invite: 'Создать:',
    },
    input: {
      file: {
        upload_several: 'Перетащите файлы сюда или нажмите для выбора.',
        upload_single: 'Перетащите файл сюда или нажмите для выбора.',
      },
      image: {
        upload_several: 'Перетащите изображения сюда или нажмите для выбора.',
        upload_single: 'Перетащите изображение сюда или нажмите для выбора.',
      },
      references: {
        all_missing: 'Связанные данные не найдены.',
        many_missing: 'Некоторые из связанных данных недоступны.',
        single_missing: 'Связанный объект недоступен.',
      },
    },
    message: {
      yes: 'Да',
      no: 'Нет',
      are_you_sure: 'Вы уверены?',
      about: 'О программе',
      not_found:
        'Либо вы набрали неверный URL, либо вы перешли по неверной ссылке.',
      loading: 'Загрузка страницы, пожалуйста подождите.',
      invalid_form: 'Форма заполнена неверно, проверьте ошибки',
      delete_title: 'Удалить %{name} #%{id}',
      bulk_delete_title:
        'Удалить %{name} |||| Удалить %{smart_count} %{name} объектов',
      details: 'Детали',
      error: 'Произошла ошибка при выполнении запроса',
      refresh: 'Обновить',
      clear_array_input: 'Очищен массив данных',
    },
    navigation: {
      no_results: 'Результатов не найдено',
      no_more_results: 'Страница %{page} вне диапазона. Попробуйте предыдущую.',
      page_out_of_boundaries: 'Страница %{page} вне диапазона',
      page_out_from_end: 'Дальше нет страниц',
      page_out_from_begin: 'Страница не может быть раньше первой',
      page_range_info: '%{offsetBegin}-%{offsetEnd} из %{total}',
      next: 'Следующая',
      prev: 'Предыдущая',
      page_rows_per_page: 'Показывать',
    },
    auth: {
      user_menu: 'Профиль',
      username: 'Имя пользователя',
      password: 'Пароль',
      sign_in: 'Вход',
      sign_in_error: 'Аутентификация не удалась, попробуйте снова',
      logout: 'Выход',
    },
    notification: {
      updated: 'Элемент обновлен',
      created: 'Элемент создан',
      deleted: 'Элемент удален',
      bad_item: 'Некорректный элемент',
      item_doesnt_exist: 'Элемент не существует',
      http_error: 'Ошибка сервера',
      data_provider_error: 'Ошибка dataProvider.',
      i18n_error: 'Невозможно загрузить переводы для указанного языка',
      canceled: 'Действие отменено',
      logged_out: 'Ваша сессия завершена, пожалуйста, заново зайдите.',
    },
    validation: {
      required: 'Обязательно для заполнения',
      minLength: 'Минимальная длина %{min} символов',
      maxLength: 'Максимальная длина %{max} символов',
      minValue: 'Минимальное значение %{min}',
      maxValue: 'Максимальное значение %{max}',
      number: 'Должно быть числом',
      email: 'Должно быть действительным email',
      oneOf: 'Должно быть одним из: %{options}',
      regex: 'Должно соответствовать формату (regexp): %{pattern}',
    },
  },
};

const i18nProvider = polyglotI18nProvider(() => customRussianMessages, 'ru');

export default i18nProvider;

// import i18n from 'i18next';
// import {
//   useI18nextProvider,
//   convertRaTranslationsToI18next,
// } from 'ra-i18n-i18next';

// const i18nInstance = i18n.use(
//   resourcesToBackend((language) => {
//     if (language === 'ru') {
//       return import(`ra-language-russian`).then(({ default: messages }) =>
//         convertRaTranslationsToI18next(messages)
//       );
//     }
//     return import(`ra-language-english`).then(({ default: messages }) =>
//       convertRaTranslationsToI18next(messages)
//     );
//   })
// );

// export const useMyI18nProvider = () =>
//   useI18nextProvider({
//     i18nInstance,
//     availableLocales: [
//       { locale: 'en', name: 'English' },
//       { locale: 'ru', name: 'Russian' },
//     ],
//   });
