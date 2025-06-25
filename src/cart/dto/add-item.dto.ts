import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class AddItemDto {
  @IsNotEmpty()
  @IsString()
  product: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;

  @IsString()
  name?: string;

  @IsString()
  image?: string;
}
