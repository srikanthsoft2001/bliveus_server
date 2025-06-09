import { Schema, Document, Types } from 'mongoose';

export interface Product extends Document {
  name: string;
  description: string;
  price: Types.Decimal128;
  salePrice: string;
  discountPercentage: string;
  color: string;
  size: string;
  mainImageUrl: string;
  imageUrls: string[];
  stockQuantity: number;
  category: string;
  rating: number;
  
}

export const ProductSchema = new Schema<Product>(
  {
     name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Schema.Types.Decimal128, required: true },
    salePrice: { type: String, required: true },
    color: { type: String, required: true },
    size: { type: String, required: true },
    mainImageUrl: { type: String, required: true },
    imageUrls: { type: [String], required: true },
    stockQuantity: { type: Number, required: true },
    category: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, max: 5 }
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
  }
);
