import { CartItemDto } from './cart-item.dto';

export class CartResponseDto {
  items: CartItemDto[];
  totalPrice: number;
  totalItems: number;
}
