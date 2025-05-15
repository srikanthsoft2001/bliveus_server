import { Schema, Document, Types } from 'mongoose';

export interface Product extends Document {
  name: string;
  description: string;
  originalPrice: string;
  salePrice: any;
  discountPercentage: string;
  color: string;
  size: string;
  mainImageUrl: string;
  imageUrls: string[];
  stockQuantity: number;
  category: string;
  rating: number;
  saleType:string;
}

export const ProductSchema = new Schema<Product>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    originalPrice: { type: String, required: true },
    salePrice: { type: Schema.Types.Mixed, required: true },
    discountPercentage: { type: String, required: true },
    color: { type: String, required: true },
    size: { type: String, required: true },
    mainImageUrl: { type: String, required: true },
    imageUrls: { type: [String], required: true },
    stockQuantity: { type: Number, required: true },
    category: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    saleType: { type: String, enum: ['flash', 'best', 'none'], required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;

        if (ret.price && typeof ret.price.toString === 'function') {
          ret.price = ret.price.toString();
        }
      },
    },
  },
);
