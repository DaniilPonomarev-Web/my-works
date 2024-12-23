import dayjs from 'dayjs';
import * as crypto from 'crypto';

export const getAuthHeader = () => {
  const authString = `${process.env['YOOMONEY_SHOPID']}:${process.env['YOOMONEY_API_KEY']}`;
  const base64Auth = Buffer.from(authString).toString('base64');
  return {
    base64Auth,
  };
};

// Функция для нормализации прайса
export const normalizePrice = (price: number): number => {
  const formattedPrice = (price / 100).toFixed(2); // Преобразуем число в строку с двумя десятичными знаками
  const trimmedPrice = formattedPrice.replace(/0+$/, ''); // Удаляем лишние нули в конце строки

  // Удаление разделителя запятой и преобразование строки в число
  const numericPrice = Number(trimmedPrice.replace(',', '.'));

  return numericPrice;
};

export const generateHash = (...args: string[]): string => {
  const hash = crypto.createHash('sha256');
  hash.update(args.join('')); // Конкатенируем аргументы и вычисляем хэш
  return hash.digest('hex'); // Возвращаем хэш в виде строки
};

export const generateShortHash = (...args: string[]): string => {
  const hash = crypto.createHash('sha256');
  hash.update(args.join(''));
  const fullHash = hash.digest('hex');
  const shortHash = fullHash.substring(0, 8); // Измените 8 на нужное количество символов
  return shortHash;
};

// Функция для приведения номера телефона к общему формату
export const normalizePhoneNumber = (phone: string) => {
  // Удаляем все символы, кроме цифр
  const normalized = phone.replace(/[^\d]/g, '');

  // Если номер начинается с '+7', удаляем префикс '+7'
  if (normalized.startsWith('+7')) {
    return normalized.slice(2);
  }

  // Если номер начинается с '8', удаляем префикс '8' и добавляем '+7'
  if (normalized.startsWith('8')) {
    return '7' + normalized.slice(1);
  }

  // Если номер уже имеет 11 цифр, возвращаем его как есть
  if (normalized.length === 11) {
    return normalized;
  }

  // Если номер имеет 10 цифр, добавляем к нему префикс '8'
  if (normalized.length === 10) {
    return '7' + normalized;
  }

  // Если ничего не подходит, возвращаем исходный номер
  return phone;
};

//Выясняем до  какого дня подписка
export const subscribeCheckWithText = (subscribeDate: Date) => {
  const userSubscribedDate = dayjs(subscribeDate);
  const currentDate = dayjs();
  if (userSubscribedDate.isBefore(currentDate, 'day')) {
    return 'Истекла';
  }
  if (userSubscribedDate.isSame(currentDate, 'day')) {
    return 'Сегодня последний день';
  }
  if (userSubscribedDate.isAfter(currentDate, 'day')) {
    const formattedDate = userSubscribedDate.format('DD.MM.YYYY');
    return `Активна до ${formattedDate}`;
  }
  return 'Ошибка получения даты подписки';
};

export const subscribeCheck = (subscribeDate: Date) => {
  const userSubscribedDate = dayjs(subscribeDate);
  const currentDate = dayjs();
  if (userSubscribedDate.isBefore(currentDate, 'day')) {
    return false;
  }
  return true;
};

// Сумму приводим в вид для кликхауса
export const normalizeSumma = (summa: string): number | false => {
  const cleanedSumma = summa.replace(',', '.');
  if (!/^\d+(\.\d+)?$/.test(cleanedSumma)) {
    return false;
  }
  return parseFloat(parseFloat(cleanedSumma).toFixed(2));
};

//Получаем знак больше или меньше для базы кликхауса чтобы смотреть доходы или расходы
export const getIncomeOrExpense = (type: string) => {
  switch (type) {
    case 'income':
      type = '>';
      break;
    case 'expense':
      type = '<';
      break;
    default:
      type = '>';
      break;
  }
  return type;
};

export const getStartDateOfCurrentWeek = (): Date => {
  const currentDate = new Date();
  const startDateOfCurrentWeek = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() - currentDate.getDay()
  );
  return startDateOfCurrentWeek;
};

export const getEndDateOfCurrentWeek = (): Date => {
  const currentDate = new Date();
  const endDateOfCurrentWeek = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() + (6 - currentDate.getDay())
  );
  return endDateOfCurrentWeek;
};

export const getEndDateOfCurrentMonth = (): Date => {
  const currentDate = new Date();
  const endOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  return endOfMonth;
};

export const getEndDateOfCurrentYear = (): Date => {
  const currentDate = new Date();
  const endOfYear = new Date(
    currentDate.getFullYear(),
    11, // December is 11th month in JavaScript Date object
    31
  );
  return endOfYear;
};
