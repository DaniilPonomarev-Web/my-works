import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@erist-opt/jwt-user';
import { CartService } from './card.service';
import {
  AddToCartInput,
  CartDTO,
  ChangeCartItemDTO,
  ICartItem,
  RemoveFromCartInput,
  UpdateCartItemQuantityInput,
} from '@erist-opt/shared';

@UseGuards(JwtAuthGuard)
@Resolver(() => CartDTO)
export class CartResolver {
  constructor(private readonly cartService: CartService) {}

  @Query(() => CartDTO, {
    name: 'getCart',
    description: 'Получение корзины с актуальными ценами и остатками',
  })
  async getCart(@Context() context: any): Promise<CartDTO> {
    const userId = context.req.user.id;
    const cart = await this.cartService.getCart(userId);
    // console.warn(cart.items);

    const updatedCart = await this.cartService.updateCartItems(cart);

    return updatedCart;
  }

  @Mutation(() => ChangeCartItemDTO, {
    name: 'addToCart',
    description: 'Добавление товара в корзину',
  })
  async addToCart(
    @Context() context: any,
    @Args('input') input: AddToCartInput
  ): Promise<ChangeCartItemDTO> {
    if (input.quantity <= 0) {
      throw new BadRequestException(
        `Количество товара не должно быть меньше или равно нулю`
      );
    }
    const userId = context.req.user.id;

    let input2: ICartItem = {
      productId: input.productId,
      quantity: input.quantity,
    };

    if (input.optionValueId) {
      const optionId = await this.cartService.findOptionIdByValue(
        input.optionValueId
      );

      if (!optionId) {
        throw new BadRequestException(`Такой опции не существует`);
      }
      input2 = {
        productId: input.productId,
        quantity: input.quantity,
        optionId: optionId,
        optionValueId: input.optionValueId,
      };
    }
    const data = await this.cartService.addToCart(userId, input2);
    return data;
  }

  @Mutation(() => ChangeCartItemDTO, {
    name: 'updateCartItemQuantity',
    description: 'Обновление количества товара в корзине',
  })
  async updateCartItemQuantity(
    @Context() context: any,
    @Args('input') input: UpdateCartItemQuantityInput
  ): Promise<ChangeCartItemDTO> {
    const userId = context.req.user.id;
    return await this.cartService.updateCartItemQuantity(
      userId,
      input.itemId,
      input.quantity
    );
  }

  @Mutation(() => ChangeCartItemDTO, {
    name: 'removeFromCart',
    description: 'Удаление товара из корзины',
  })
  async removeFromCart(
    @Context() context: any,
    @Args('input') input: RemoveFromCartInput
  ): Promise<ChangeCartItemDTO> {
    const userId = context.req.user.id;

    const success = await this.cartService.removeFromCart(userId, input.itemId);

    return success;
  }

  @Mutation(() => Boolean, {
    name: 'clearCart',
    description: 'Удалить все товары в корзине',
  })
  async clearCart(@Context() context: any): Promise<boolean> {
    const userId = context.req.user.id;

    const success = await this.cartService.clearCart(userId);

    if (!success) {
      throw new BadRequestException('Не удалось очистить корзину');
    }

    return success;
  }
}
