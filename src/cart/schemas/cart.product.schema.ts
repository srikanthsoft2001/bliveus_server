import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({
    required: true,
    min: 0,
    validate: {
      validator: (v: any) => typeof v === 'number' && !isNaN(v) && isFinite(v),
      message: 'Price must be a valid positive number'
    }
  })
  price: number;

  @Prop()
  description: string;

  @Prop({ default: true })
  inStock: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);