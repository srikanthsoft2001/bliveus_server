import { Controller, Get, Post, Body, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './schemas/product.schema';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

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

  @Get('category/:categoryName')
  async getByCategory(@Param('categoryName') name: string) {
    return this.productService.findByCategory(name);
  }

  // 🔒 Example protected route
  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getProtectedData() {
    return { message: 'You are authenticated!' };
  }
}
