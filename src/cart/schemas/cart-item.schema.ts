// src/cart/schemas/cart-item.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';

@Schema({ _id: false })
export class CartItem {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Product', required: true })
  product: string;

  @Prop({ required: true, min: 1 })
  quantity: number;

  @Prop({ required: true })
  price: number;
}

export const CartItemSchema = SchemaFactory.createForClass(CartItem);
