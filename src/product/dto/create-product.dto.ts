export class CreateProductDto {
    name: string;
    description: string;
    price: string;  
    size: string;
    mainImageUrl: string;
    imageUrls: string[];
    stockQuantity: number;
    category: string;
  }
  