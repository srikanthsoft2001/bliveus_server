import { Schema, Document, Types } from 'mongoose';

export interface Product extends Document {
  name: string;
  description: string;
  originalPrice: Types.Decimal128;
  salePrice: string;
  discountPercentage: string;
  color?: string;
  size?: string;
  mainImageUrl: string;
  subimageUrls: string[];
  stockQuantity: number;
  category: string;
  rating?: number;
  saleType: string;
}

export const ProductSchema = new Schema<Product>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    originalPrice: { type: Schema.Types.Decimal128, required: true },
    salePrice: { type: String, required: true },
    discountPercentage: { type: String, required: true },
    color: { type: String },
    size: { type: String },
    mainImageUrl: { type: String, required: true },
    subimageUrls: { type: [String], required: true },
    stockQuantity: { type: Number, required: true },
    category: { type: String, required: true },
    rating: { type: Number, min: 0, max: 5 },
    saleType: { type: String, required: true },
  },
  {
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (_: unknown, ret: Record<string, unknown>) => {
        ret.id = ret._id;
        delete ret._id;

        const originalPrice = ret.originalPrice as Types.Decimal128 | undefined;
        if (originalPrice && typeof originalPrice.toString === 'function') {
          ret.originalPrice = originalPrice.toString();
        }
      },
    },
  },
);
