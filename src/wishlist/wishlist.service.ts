import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wishlist } from './schemas/wishlist.schema';
import { CreateWishlistDto } from './dtos/create-wishlist.dto';
import { UpdateWishlistDto } from './dtos/update-wishlist.dto';

@Injectable()
export class WishlistService {
  constructor(@InjectModel(Wishlist.name) private wishlistModel: Model<Wishlist>) {}

  async create(createWishlistDto: CreateWishlistDto): Promise<Wishlist> {
    const createdWishlist = new this.wishlistModel(createWishlistDto);
    return createdWishlist.save();
  }

  async findByUserId(userId: string): Promise<Wishlist | null> {
    return this.wishlistModel.findOne({ userId }).populate('products').exec();
  }

  async update(userId: string, updateWishlistDto: UpdateWishlistDto): Promise<Wishlist | null> {
    return this.wishlistModel
      .findOneAndUpdate({ userId }, updateWishlistDto, { new: true })
      .populate('products')
      .exec();
  }

  async addProduct(userId: string, productId: string): Promise<Wishlist> {
    const wishlist = await this.wishlistModel
      .findOneAndUpdate(
        { userId },
        { $addToSet: { products: productId } },
        { new: true, upsert: true },
      )
      .populate('products')
      .exec();

    if (!wishlist) {
      throw new NotFoundException('Wishlist not found');
    }
    return wishlist;
  }

  async removeProduct(userId: string, productId: string): Promise<Wishlist | null> {
    return this.wishlistModel
      .findOneAndUpdate({ userId }, { $pull: { products: productId } }, { new: true })
      .populate('products')
      .exec();
  }

  async delete(userId: string): Promise<Wishlist | null> {
    return this.wishlistModel.findOneAndDelete({ userId }).exec();
  }
}
