import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dtos/create-order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  findByCustomer(@Query('customerId') customerId: string) {
    return this.orderService.findByCustomerId(customerId);
  }
}

// @Get(':id')
// findOne(@Param('id') id: string) {
//   return this.orderService.findOne(id);
// }

// @Put(':id')
// update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
//   return this.orderService.update(id, updateOrderDto);
// }

// @Delete(':id')
// remove(@Param('id') id: string) {
//   return this.orderService.remove(id);
// }

// @Get('customer/:customerId')
// findByCustomer(@Param('customerId') customerId: string) {
//   return this.orderService.findByCustomer(customerId);
// }

// @Put(':id/status')
// updateStatus(@Param('id') id: string, @Query('status') status: string) {
//   return this.orderService.updateStatus(id, status);
// }
