import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema()
export class User 
 {
  @Prop({ type: SchemaTypes.ObjectId, auto: true})
  _id: Types.ObjectId;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ select: true }) // if using this
password: string;

@Prop()
phoneNumber: string;

  @Prop()
  address: string;

  @Prop({ default: 'customer' })
  role: string;

@Prop({ select: false }) // optional: hide by default in queries
refreshToken: string; 
 }
export const UserSchema = SchemaFactory.createForClass(User);




