import * as crypto from 'crypto';

export const generateTokenContext = (context: any): string => {
  const token = context.req.headers.authorization?.replace('Bearer ', '');
  return token;
};
export const generateRandomPassword = (length: number): string => {
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset.charAt(randomIndex);
  }
  return password;
};

export const generateNormalizePhoneNumber = (phone: string) => {
  // Удаляем все символы, кроме цифр и символа "+"
  const normalized = phone.replace(/[^\d+]/g, '');

  // Удаляем "8" в начале строки, если присутствует
  if (normalized.startsWith('8')) {
    return Number(normalized.slice(1));
  }

  // Удаляем "+7" в начале строки, если присутствует
  if (normalized.startsWith('+7')) {
    return Number(normalized.slice(2));
  }

  return Number(normalized);
};

export const generateRandomNumber = () => {
  const randomNumber = Math.random();
  return randomNumber;
};

export const generateRandomBoolean = () => {
  const randomNumber = generateRandomNumber();
  if (randomNumber > 0.5) {
    return true;
  }
  return false;
};

export const formatDateOrderForDashbord = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Генерирует случайный шестизначный код на основе идентификатора учетной записи.
 * @param accountId Идентификатор учетной записи пользователя.
 * @returns {Promise<number>} Промис с сгенерированным шестизначным кодом.
 *
 * Этот метод создает входную строку на основе идентификатора учетной записи и текущего времени,
 * хеширует эту строку и преобразует полученный хеш в шестизначное число (код подтверждения).
 */
export const generateRandomCode = async (email: string): Promise<number> => {
  const now = Date.now();
  // Создаем входную строку на основе email и текущего времени
  const input = `${email}-${now}`;
  // Хешируем строку
  const hash = crypto.createHash('sha256').update(input).digest('hex');
  // Преобразуем хеш в число
  const hashInt = parseInt(hash, 16);
  // Получаем шестизначное число
  const code = (hashInt % 900000) + 100000; // Диапазон от 100000 до 999999
  return code;
};

export const hashEmailForCode = (email: string): string => {
  const hash = crypto.createHash('sha256');
  hash.update(email.toString() + 'code');
  return hash.digest('hex');
};

export const formatToHTML = (text: string | null): string => {
  if (!text) {
    return '';
  }
  return text
    .split('\n')
    .map((line) => `<p>${line}</p>`)
    .join('');
};
