/**
 * Интерфейс для данных токена пользователя.
 */
export interface IUserTokenData {
  id: string; // Уникальный идентификатор пользователя
  email: string; // Почтовый адрес пользователя
  iat: number; // Время выдачи токена (в формате Unix time)
  exp: number; // Время истечения токена (в формате Unix time)
}
