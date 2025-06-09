import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from './schemas/cart.schema';
import { Product, ProductDocument } from './schemas/cart.product.schema';
import { AddToCartDto } from './dtos/add-to-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async addItem(dto: AddToCartDto) {
    // Validate input
    if (!dto.quantity || dto.quantity < 1) {
      throw new BadRequestException('Quantity must be at least 1');
    }

    const product = await this.productModel.findById(dto.productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // Ensure product has valid price
    if (typeof product.price !== 'number' || product.price < 0) {
      throw new BadRequestException('Product price is invalid');
    }

    const existing = await this.cartModel.findOne({
      userId: dto.userId,
      productId: dto.productId,
    });

    try {
      if (existing) {
        existing.quantity += dto.quantity;
        existing.subtotal = this.calculateSubtotal(existing.price, existing.quantity);
        await existing.save();
      } else {
        await this.cartModel.create({
          userId: dto.userId,
          productId: dto.productId,
          productName: product.name,
          price: product.price,
          quantity: dto.quantity,
          subtotal: this.calculateSubtotal(product.price, dto.quantity),
        });
      }

      return this.getCart(dto.userId);
    } catch (error) {
      throw new BadRequestException('Failed to update cart: ' + error.message);
    }
  }

  async getCart(userId: string) {
    const items = await this.cartModel.find({ userId });
    const subtotal = items.reduce((acc, item) => acc + (item.subtotal || 0), 0);
    
    return {
      items,
      subtotal,
      shipping: 'Free',
      total: subtotal,
    };
  }

  async updateQuantity(userId: string, productId: string, quantity: number) {
    if (!quantity || quantity < 1) {
      throw new BadRequestException('Quantity must be at least 1');
    }

    const item = await this.cartModel.findOne({ userId, productId });
    if (!item) {
      throw new NotFoundException('Cart item not found');
    }

    item.quantity = quantity;
    item.subtotal = this.calculateSubtotal(item.price, quantity);
    
    try {
      await item.save();
      return this.getCart(userId);
    } catch (error) {
      throw new BadRequestException('Failed to update quantity: ' + error.message);
    }
  }

  async removeItem(userId: string, productId: string) {
    const result = await this.cartModel.deleteOne({ userId, productId });
    if (result.deletedCount === 0) {
      throw new NotFoundException('Cart item not found');
    }
    return this.getCart(userId);
  }

  async applyCoupon(userId: string, code: string) {
    const cart = await this.getCart(userId);
    
    if (code === 'SAVE10') {
      const discount = cart.total * 0.10;
      return { 
        ...cart,
        discount, 
        total: cart.total - discount,
        couponApplied: true 
      };
    }
    
    return { 
      ...cart,
      message: 'Invalid coupon code',
      couponApplied: false 
    };
  }

  async checkout(userId: string) {
    const cart = await this.getCart(userId);
    
    if (cart.items.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    await this.cartModel.deleteMany({ userId });
    
    return {
      message: 'Checkout successful',
      order: cart,
      date: new Date(),
    };
  }

  private calculateSubtotal(price: number, quantity: number): number {
    if (typeof price !== 'number' || typeof quantity !== 'number') {
      throw new Error('Invalid price or quantity');
    }
    return parseFloat((price * quantity).toFixed(2));
  }
}