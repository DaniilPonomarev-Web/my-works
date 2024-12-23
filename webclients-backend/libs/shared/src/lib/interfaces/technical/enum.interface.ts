/**
 * Интерфейс для описания структур данных, связывающих значения перечислений с их метками.
 *
 * Используется для:
 * - Связывания программно-ориентированных значений (например, идентификаторов или кодов)
 *   с их человеко-читаемыми метками.
 * - Упрощения отображения данных в пользовательских интерфейсах (UI), таких как выпадающие списки, таблицы и т.д.
 * - Обеспечения связи между логикой приложения и визуальной частью.
 *
 * Пример:
 * Если  есть перечисление `UserRole` с ключами, можно создать массив значений, где каждому
 * ключу соответствует метка для отображения пользователю.
 *
 * Пример использования:
 * ```typescript
 * enum UserRole {
 *   ADMIN = 'admin',
 *   USER = 'user',
 *   GUEST = 'guest',
 * }
 *
 * const roles: IEnum<UserRole>[] = [
 *   { value: UserRole.ADMIN, label: 'Администратор' },
 *   { value: UserRole.USER, label: 'Пользователь' },
 *   { value: UserRole.GUEST, label: 'Гость' },
 * ];
 * ```
 *
 * @template T Тип значений в перечислении.
 */
export interface IEnum<T> {
  /**
   * Значение перечисления.
   */
  value: T;

  /**
   * Метка для отображения значения.
   */
  label: string;
}
