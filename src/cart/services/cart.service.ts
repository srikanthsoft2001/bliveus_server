import { Injectable, NotFoundException } from '@nestjs/common';
import { CartRepository } from '../repositories/cart.repository';
import { UpdateCartDto } from '../dto/update-cart.dto';
import { CartResponseDto } from '../dto/cart-response.dto';
import { CartItemDto } from '../dto/cart-item.dto';
import { CartItems } from '../interfaces/cart-item.interface';

@Injectable()
export class CartService {
  constructor(private readonly cartRepository: CartRepository) {}

  private calculateTotals(items: CartItems[]): { totalPrice: number; totalItems: number } {
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    return { totalPrice, totalItems };
  }

  async getCart(userId: string): Promise<CartResponseDto> {
    let cart = await this.cartRepository.findCartByUserId(userId);

    if (!cart) {
      cart = await this.cartRepository.createCart(userId);
    }

    return {
      items: cart.items,
      totalPrice: cart.totalPrice,
      totalItems: cart.totalItems,
    };
  }

  async updateCart(userId: string, updateCartDto: UpdateCartDto): Promise<CartResponseDto> {
    const { totalPrice, totalItems } = this.calculateTotals(updateCartDto.items);

    const cart = await this.cartRepository.updateCart(
      userId,
      updateCartDto.items,
      totalPrice,
      totalItems,
    );

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    return {
      items: cart.items,
      totalPrice: cart.totalPrice,
      totalItems: cart.totalItems,
    };
  }

  async clearCart(userId: string): Promise<CartResponseDto> {
    const cart = await this.cartRepository.updateCart(userId, [], 0, 0);

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    return {
      items: cart.items,
      totalPrice: cart.totalPrice,
      totalItems: cart.totalItems,
    };
  }

  async deleteCart(userId: string): Promise<void> {
    await this.cartRepository.deleteCart(userId);
  }

  async addItem(userId: string, itemDto: CartItemDto): Promise<CartResponseDto> {
    let cart = await this.cartRepository.findCartByUserId(userId);
    if (!cart) {
      cart = await this.cartRepository.createCart(userId);
    }
    const existingItemIndex = cart.items.findIndex(
      item => item.product.toString() === itemDto.product.toString(),
    );
    if (existingItemIndex >= 0) {
      cart.items[existingItemIndex].quantity += itemDto.quantity;
    } else {
      cart.items.push(itemDto);
    }
    const { totalPrice, totalItems } = this.calculateTotals(cart.items);
    const updatedCart = await this.cartRepository.updateCart(
      userId,
      cart.items,
      totalPrice,
      totalItems,
    );
    if (!updatedCart) {
      throw new NotFoundException('Cart not found');
    }
    return {
      items: updatedCart.items,
      totalPrice: updatedCart.totalPrice,
      totalItems: updatedCart.totalItems,
    };
  }
}
