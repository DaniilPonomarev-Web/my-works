/**
 * Тип `NN` определяет значение, которое может быть числом или `null`.
 *
 * @example
 * const example: NN = 42;  // допустимо
 * const example: NN = null;  // допустимо
 */
export type NN = number | null;

/**
 * Тип `SN` определяет значение, которое может быть строкой или `null`.
 *
 * @example
 * const example: SN = 'hello';  // допустимо
 * const example: SN = null;  // допустимо
 */
export type SN = string | null;

/**
 * Тип `EA` определяет пустой массив.
 *
 * @example
 * const example: EA = [];  // допустимо
 */
export type EA = [];
