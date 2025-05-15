export class CreateProductDto {
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
  saleType: string;
}
