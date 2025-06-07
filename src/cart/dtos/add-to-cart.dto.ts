import { IsNotEmpty, IsMongoId, IsInt, Min } from 'class-validator';

export class AddToCartDto {
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @IsNotEmpty()
  @IsMongoId()
  productId: string;

  @IsInt()
  @Min(1)
  quantity: number;
}