import { Document } from 'mongoose';

export interface Wishlist extends Document {
  userId: string;
  products: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
