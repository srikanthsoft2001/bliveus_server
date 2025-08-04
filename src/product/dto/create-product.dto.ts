export class CreateProductDto {
  name: string;
  description: string;
  originalPrice: string;
  salePrice: string;
  discountPercentage: number;
  stockQuantity: number;
  category: string;
  saleType: string;
}
