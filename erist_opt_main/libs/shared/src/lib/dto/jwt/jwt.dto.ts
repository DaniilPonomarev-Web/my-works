import { ObjectType, Field } from '@nestjs/graphql';

/**
 * DTO (Data Transfer Object) для обновления токена.
 * Описывает структуру данных для ответа на запрос обновления токена.
 */
@ObjectType({ description: 'DTO для обновления токена' })
export class RefreshResponseDTO {
  @Field({ description: 'Токен доступа для новой сессии аутентификации' })
  access_token: string;

  @Field({ description: 'Токен обновления для получения нового access token' })
  refresh_token: string;

  /**
   * Создает новый экземпляр RefreshResponseDTO.
   * @param access_token Access token.
   * @param refresh_token Refresh token.
   */
  constructor(access_token: string, refresh_token: string) {
    this.access_token = access_token;
    this.refresh_token = refresh_token;
  }
}
