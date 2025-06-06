import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Coupon extends Document {
  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true })
  discount: number; // percentage (e.g., 10 = 10%)
}

export const CouponSchema = SchemaFactory.createForClass(Coupon);
