import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

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

  // @Prop({ required: true })
  // lastName: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  address: string;

  @Prop({ default: 'customer' })
  role: string;

  @Prop({ select: true })
  // @Prop({ select: false })
  // error :  we need to look for security concerns in future.... for now it is disabled.
  refreshToken?: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Cart' })
  cart?: Types.ObjectId;
}
export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;
