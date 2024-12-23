import { Context, Float, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class CoreResolver {
  @Query(() => Float, {
    description: 'Возвращает время работы сервера в секундах',
  })
  uptime(@Context() context: any): number {
    return process.uptime();
  }
}
