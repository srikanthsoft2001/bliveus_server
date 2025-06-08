import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}
  //crate user
  async createUser(data: CreateUserDto) {
    console.log('got data' + CreateUserDto);
    await new this.userModel({
      ...data,
      password: await bcrypt.hash(data.password, 10),
    }).save();
  }

  async getUserById(_id: string) {
    const user = await this.userModel.findById(_id).select('-password').lean();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateUser(_id: string, dto: UpdateUserDto) {
    const user = await this.userModel.findById(_id);
    if (!user) throw new NotFoundException('User not found');

    if (dto.name) user.name = dto.name;
    if (dto.email) user.email = dto.email;
    if (dto.address) user.address = dto.address;

    if (dto.newPassword && dto.currentPassword) {
      const isMatch = await bcrypt.compare(dto.currentPassword, user.password);
      if (!isMatch) throw new BadRequestException('Incorrect current password');
      user.password = await bcrypt.hash(dto.newPassword, 10);
    }

    return user.save();
  }

  async getUser(query: FilterQuery<User>) {
    const user = (await this.userModel.findOne(query))?.toObject();
    if (!user) {
      throw new NotFoundException('user not found!');
    }
    return user;
  }

  async getUsers() {
    return this.userModel.find({});
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec(); // returns Mongoose document or null
  }
}
