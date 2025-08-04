import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Query,
  UploadedFiles,
  UseInterceptors,
  NotFoundException,
  BadRequestException,
  Body,
  Res,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Types } from 'mongoose';
import { Response } from 'express';
import { ProductService } from './product.service';
import { Product } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';

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

  @Get('images/:filename')
  getImage(@Param('filename') filename: string, @Res() res: Response) {
    res.sendFile(filename, { root: './uploads' });
  }

  @Post('add')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = uuidv4();
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          cb(null, true);
        } else {
          cb(new BadRequestException('Only image files are allowed'), false);
        }
      },
      limits: {
        fileSize: 1024 * 1024, // 1MB max file size
      },
    }),
  )
  async createProduct(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: CreateProductDto,
  ): Promise<{ product: Product; imageUrls: { main: string; subs: string[] } }> {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded');
    }

    const mainImage = files.find(f => f.fieldname === 'mainImage');
    const subImages = files.filter(f => f.fieldname === 'subImages');

    if (!mainImage) {
      throw new NotFoundException('Main image is required');
    }

    if (!subImages || subImages.length !== 4) {
      throw new NotFoundException('Exactly 4 sub-images are required');
    }

    const baseUrl = 'http://localhost:3000/products/images';
    const mainImageUrl = `${baseUrl}/${mainImage.filename}`;
    const subImageUrls = subImages.map(file => `${baseUrl}/${file.filename}`);

    const product = await this.productService.create({
      ...body,
      originalPrice: Types.Decimal128.fromString(body.originalPrice),
      salePrice: Types.Decimal128.fromString(body.salePrice),
      mainImageUrl,
      subImageUrls,
    });

    return {
      product,
      imageUrls: {
        main: mainImageUrl,
        subs: subImageUrls,
      },
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.productService.delete(id);
  }

  @Get('category/:categoryName')
  async getByCategory(@Param('categoryName') name: string): Promise<Product[]> {
    return this.productService.findByCategory(name);
  }
}
