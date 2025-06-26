export class CreateOrderDto {
  customerId: string;
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    subtotal: number;
  }[];
  totalPrice: number;
}
