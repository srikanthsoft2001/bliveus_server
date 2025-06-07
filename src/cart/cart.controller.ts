import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dtos/add-to-cart.dto';


@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  addItem(@Body() dto: AddToCartDto) {
    return this.cartService.addItem(dto);
  }

  @Get(':userId')
  getCart(@Param('userId') userId: string) {
    return this.cartService.getCart(userId);
  }

  @Patch(':userId/:productId')
  updateQuantity(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
    @Body('quantity') quantity: number,
  ) {
    return this.cartService.updateQuantity(userId, productId, quantity);
  }

  @Delete(':userId/:productId')
  removeItem(@Param('userId') userId: string, @Param('productId') productId: string) {
    return this.cartService.removeItem(userId, productId);
  }

  @Post('coupon')
  applyCoupon(@Body('userId') userId: string, @Body('code') code: string) {
    return this.cartService.applyCoupon(userId, code);
  }

  @Post('checkout')
  checkout(@Body('userId') userId: string) {
    return this.cartService.checkout(userId);
  }
}
