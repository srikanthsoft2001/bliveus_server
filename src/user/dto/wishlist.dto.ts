import { IsMongoId } from 'class-validator';

export class AddToWishlistDto {
  @IsMongoId()
  productId: string;
}

export class RemoveFromWishlistDto {
  @IsMongoId()
  productId: string;
}