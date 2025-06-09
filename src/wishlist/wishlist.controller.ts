import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { CreateWishlistDto } from './dtos/create-wishlist.dto';
import { UpdateWishlistDto } from './dtos/update-wishlist.dto';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post()
  async create(@Body() createWishlistDto: CreateWishlistDto) {
    return this.wishlistService.create(createWishlistDto);
  }

  @Get(':userId')
  async findByUserId(@Param('userId') userId: string) {
    const wishlist = await this.wishlistService.findByUserId(userId);
    if (!wishlist) {
      throw new NotFoundException('Wishlist not found');
    }
    return wishlist;
  }

  @Put(':userId')
  async update(@Param('userId') userId: string, @Body() updateWishlistDto: UpdateWishlistDto) {
    const wishlist = await this.wishlistService.update(userId, updateWishlistDto);
    if (!wishlist) {
      throw new NotFoundException('Wishlist not found');
    }
    return wishlist;
  }

  @Post(':userId/add/:productId')
  async addProduct(@Param('userId') userId: string, @Param('productId') productId: string) {
    return this.wishlistService.addProduct(userId, productId);
  }

  @Delete(':userId/remove/:productId')
  async removeProduct(@Param('userId') userId: string, @Param('productId') productId: string) {
    const wishlist = await this.wishlistService.removeProduct(userId, productId);
    if (!wishlist) {
      throw new NotFoundException('Wishlist not found');
    }
    return wishlist;
  }

  @Delete(':userId')
  async delete(@Param('userId') userId: string) {
    const wishlist = await this.wishlistService.delete(userId);
    if (!wishlist) {
      throw new NotFoundException('Wishlist not found');
    }
    return wishlist;
  }
}
