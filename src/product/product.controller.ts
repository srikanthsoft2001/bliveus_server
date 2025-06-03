import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './schemas/product.schema';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAll(): Promise<Product[]> {
    return this.productService.findAll();
  }
  @Get('search')
  async search(@Query('query') query: string): Promise<Product[]> {
    return this.productService.searchProducts(query);
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Product> {
    return this.productService.findOne(id);
  }

  @Post()
  async create(@Body() productData: Partial<Product>): Promise<Product> {
    return this.productService.create(productData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.productService.delete(id);
  }
}
