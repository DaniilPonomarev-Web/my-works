/**
 * Интерфейс для представления ошибки.
 */
export interface IError {
  status: boolean; // Флаг статуса ошибки
  message?: string; // Описание ошибки (необязательное поле)
}

export interface IValidationError {
  field: string;
  message: string;
}

export interface IValidationVariables {
  status: boolean;
  errors: IValidationError[];
}

/**
 * Интерфейс для представления ошибки HTTP.
 */
export interface HttpError {
  statusCode: number; // Код состояния HTTP
  message: string; // Сообщение об ошибке
  path: string; // Путь запроса
  method: string; // HTTP метод
  complete: boolean; // Флаг завершенности ошибки
  timestamp: string; // Временная метка ошибки
}

/**
 * Интерфейс для представления журнальной записи.
 */
export interface ILogger {
  serviceName: string; // Наименование службы
  message: string; // Сообщение журнала
  type: string; // Тип журнала
}

/**
 * Интерфейс для представления состояния здоровья API.
 */
export interface IApiMeHealth {
  ApimeCorePkg: boolean; // Состояние ядра API ME
}
