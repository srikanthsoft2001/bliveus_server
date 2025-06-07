import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CartDocument = Cart & Document;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function (doc, ret) {
      delete ret.__v;
      return ret;
    }
  }
})
export class Cart {
  @Prop({ required: true, index: true })
  userId: string;

  @Prop({ required: true, index: true })
  productId: string;

  @Prop({ required: true })
  productName: string;

  @Prop({ 
    required: true, 
    min: 0,
    validate: {
      validator: Number.isFinite,
      message: 'Price must be a valid number'
    }
  })
  price: number;

  @Prop({ 
    required: true, 
    min: 1,
    validate: {
      validator: Number.isInteger,
      message: 'Quantity must be an integer'
    }
  })
  quantity: number;

  @Prop({ 
    required: true, 
    min: 0,
    default: 0,
    validate: {
      validator: Number.isFinite,
      message: 'Subtotal must be a valid number'
    }
  })
  subtotal: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);

// Add index for faster queries
CartSchema.index({ userId: 1, productId: 1 }, { unique: true });