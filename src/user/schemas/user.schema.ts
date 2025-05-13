import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ select: true })
  password: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  address: string;

  @Prop({ default: 'customer' })
  role: string;

  @Prop()
  // @Prop({ select: false })
  // error :  we need to look for security concerns in future.... for now it is disabled.
  refreshToken?: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
