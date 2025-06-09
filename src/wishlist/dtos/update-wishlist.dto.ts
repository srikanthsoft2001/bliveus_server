import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateWishlistDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  products?: string[];

  @IsOptional()
  @IsString()
  isActive?: boolean;
}
