// src/cart/schemas/cart-item.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { Product } from '../../product/schemas/product.schema';

@Schema({ _id: false })
export class CartItem {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Product', required: true })
  product: string;

  @Prop({ required: true, min: 1 })
  quantity: number;

  @Prop({ required: true })
  price: number;

  @Prop()
  name?: string; // Optional, can be populated from product

  @Prop()
  image?: string; // Optional, can be populated from product
}

export const CartItemSchema = SchemaFactory.createForClass(CartItem);
