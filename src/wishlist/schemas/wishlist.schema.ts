import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Wishlist extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ type: [{ type: String, ref: 'Product' }], default: [] })
  products: string[];

  @Prop({ default: true })
  isActive: boolean;
}

export const WishlistSchema = SchemaFactory.createForClass(Wishlist);
