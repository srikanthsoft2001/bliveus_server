// src/cart/controllers/cart.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { CartService } from '../services/cart.service';
import { UpdateCartDto } from '../dto/update-cart.dto';
import { CartResponseDto } from '../dto/cart-response.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../auth/current-user.decorator';
import { User } from '../../user/schemas/user.schema';
import { CartItemDto } from '../dto/cart-item.dto';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async getCart(@CurrentUser() user: User): Promise<CartResponseDto> {
    return this.cartService.getCart(user._id.toString());
  }

  @Put()
  async updateCart(
    @CurrentUser() user: User,
    @Body() updateCartDto: UpdateCartDto,
  ): Promise<CartResponseDto> {
    return this.cartService.updateCart(user._id.toString(), updateCartDto);
  }

  @Delete('clear')
  async clearCart(@CurrentUser() user: User): Promise<CartResponseDto> {
    return this.cartService.clearCart(user._id.toString());
  }

  @Delete()
  async deleteCart(@CurrentUser() user: User): Promise<void> {
    return this.cartService.deleteCart(user._id.toString());
  }
  @Post('add')
  async addItemToCart(
    @CurrentUser() user: User,
    @Body() itemDto: CartItemDto,
  ): Promise<CartResponseDto> {
    console.log('Authenticated user:', user); //  Check if this is undefined

    return this.cartService.addItem(user._id.toString(), itemDto);
  }
}
