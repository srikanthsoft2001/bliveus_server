import { Schema, Document, Types, model } from 'mongoose';

export interface Product extends Document {
  name: string;
  description: string;
  originalPrice: Types.Decimal128;
  salePrice: Types.Decimal128;
  discountPercentage?: number;
  mainImageUrl: string;
  subImageUrls: string[];
  stockQuantity: number;
  category: string;
  saleType: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const ProductSchema = new Schema<Product>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    originalPrice: { type: Schema.Types.Decimal128, required: true },
    salePrice: { type: Schema.Types.Decimal128, required: true },
    discountPercentage: { type: Number },
    mainImageUrl: { type: String, required: true },
    subImageUrls: { type: [String], required: true },
    stockQuantity: { type: Number, required: true },
    category: { type: String, required: true },
    saleType: { type: String, required: true, default: 'none' },
  },
  {
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (_: unknown, ret: Record<string, unknown>) => {
        ret.id = ret._id;
        delete ret._id;

        const decimalFields = ['originalPrice', 'salePrice'];
        decimalFields.forEach(field => {
          const value = ret[field] as Types.Decimal128 | undefined;
          if (value && typeof value.toString === 'function') {
            ret[field] = parseFloat(value.toString());
          }
        });
      },
    },
    timestamps: true,
  },
);

export const ProductModel = model<Product>('Product', ProductSchema);
