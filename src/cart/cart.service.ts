import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cart } from './schemas/cart.schema';
import { Product } from 'src/product/schemas/product.schema';
import { Coupon } from './schemas/coupon.schema';
import { AddToCartDto } from './dtos/add-to-cart.dto';
import { ApplyCouponDto } from './dtos/apply-coupon.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectModel('Cart') private cartModel: Model<Cart>,
    @InjectModel('Product') private productModel: Model<Product>,
    @InjectModel('Coupon') private couponModel: Model<Coupon>,
  ) {}

  async addToCart(dto: AddToCartDto) {
    const { userId, productId, quantity = 1 } = dto;

    
    if (!Types.ObjectId.isValid(productId)) {
      throw new Error('Invalid productId');
    }

    const product = await this.productModel.findById(productId);
    if (!product) throw new Error('Product not found');

   
    let cart = await this.cartModel.findOne({ userId });
    if (!cart) {
      cart = await this.cartModel.create({ userId, items: [] });
    }

   
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId,
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({
        productId: new Types.ObjectId(productId),
        quantity,
      });
    }

    await cart.save();
    return cart;
  }

  async getCart(userId: string) {
    const cart = await this.cartModel
      .findOne({ userId })
      .populate('items.productId');

    if (!cart) {
      return { items: [], subtotal: 0, discount: 0, total: 0, couponCode: null };
    }

    let subtotal = 0;

    const items = cart.items.map((item) => {
      const product = item.productId as unknown as Product;
      const itemSubtotal = product.salePrice * item.quantity;
      subtotal += itemSubtotal;

      return {
        productId: product._id,
        name: product.name,
        mainImageUrl: product.mainImageUrl,
        price: product.salePrice,
        quantity: item.quantity,
        subtotal: itemSubtotal,
      };
    });

    let discount = 0;
    if (cart.couponCode) {
      const coupon = await this.couponModel.findOne({ code: cart.couponCode });
      if (coupon) {
        discount = (subtotal * coupon.discount) / 100;
      }
    }

    const total = subtotal - discount;

    return {
      items,
      subtotal,
      discount,
      total,
      couponCode: cart.couponCode,
    };
  }

  async applyCoupon(dto: ApplyCouponDto) {
    const { userId, couponCode } = dto;

    const coupon = await this.couponModel.findOne({ code: couponCode });
    if (!coupon) throw new Error('Invalid coupon');

    const cart = await this.cartModel.findOne({ userId });
    if (!cart) throw new Error('Cart not found');

    cart.couponCode = couponCode;
    await cart.save();

    return { message: 'Coupon applied successfully' };
  }
}
