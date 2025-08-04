import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { Document } from 'mongoose';
import { Product } from 'src/product/schemas/product.schema';

@Schema({ timestamps: true })
export class User {
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  userId: Types.ObjectId;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  address: string;

  @Prop({ required: true, enum: ['seller', 'buyer'] })
  role: string;

  @Prop({ select: true })
  refreshToken?: string;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Product' }] })
  wishlist: Product[];
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;
