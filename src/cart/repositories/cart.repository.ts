import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from '../schemas/cart.schema';
import { CartItems } from '../interfaces/cart-item.interface';

@Injectable()
export class CartRepository {
  constructor(@InjectModel(Cart.name) private cartModel: Model<CartDocument>) {}

  async addItemToCart(userId: string, item: CartItems): Promise<CartDocument | null> {
    return this.cartModel
      .findOneAndUpdate(
        { user: userId },
        {
          $push: { items: item },
          $inc: {
            totalPrice: item.price * item.quantity,
            totalItems: item.quantity,
          },
        },
        { new: true },
      )
      .exec();
  }

  async findCartByUserId(userId: string): Promise<CartDocument | null> {
    return this.cartModel.findOne({ user: userId }).exec();
  }

  async createCart(userId: string): Promise<CartDocument> {
    const newCart = new this.cartModel({
      user: userId,
      items: [],
      totalPrice: 0,
      totalItems: 0,
    });
    return newCart.save();
  }

  async updateCart(
    userId: string,
    items: CartItems[],
    totalPrice: number,
    totalItems: number,
  ): Promise<CartDocument | null> {
    return this.cartModel
      .findOneAndUpdate({ user: userId }, { items, totalPrice, totalItems }, { new: true })
      .exec();
  }

  async deleteCart(userId: string): Promise<CartDocument | null> {
    return this.cartModel.findOneAndDelete({ user: userId }).exec();
  }
}
