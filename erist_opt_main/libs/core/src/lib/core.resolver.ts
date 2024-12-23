import { Context, Float, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class CoreResolver {
  @Query(() => Float)
  uptime(@Context() context: any) {
    return process.uptime();
  }
}
