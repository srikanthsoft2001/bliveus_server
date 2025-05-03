import { Injectable, NotFoundException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { LoginUserDto } from './dto/login-user.dto';


  
  @Injectable()
  export class UserService {
    constructor(
      @InjectModel(User.name) private readonly userModel: Model<User>,
    ) {}
  
    async create(createUserDto: CreateUserDto): Promise<User> {
      const existingUser = await this.userModel.findOne({ email: createUserDto.email });
      if (existingUser) {
        throw new ConflictException('Email already in use');
      }
  
      const createdUser = new this.userModel({
        ...createUserDto,
        password: createUserDto.password,
      });
  
      return createdUser.save();
    }
  
    async login(loginUserDto: LoginUserDto): Promise<any> {
      const user = await this.userModel
        .findOne({ email: loginUserDto.email })
        .select('+password');
  
      if (!user || user.password !== loginUserDto.password) {
        throw new UnauthorizedException('Invalid credentials');
      }
  
      return { message: 'Login successful', userId: user._id };
    }
  
    async findAll(): Promise<User[]> {
      return this.userModel.find().exec();
    }
  
    async findOneByEmail(email: string): Promise<User> {
      const user = await this.userModel.findOne({ email }).exec();
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    }
  
    async updateByEmail(email: string, updateUserDto: UpdateUserDto): Promise<User> {
      const user = await this.userModel
        .findOneAndUpdate({ email }, updateUserDto, { new: true })
        .exec();
  
      if (!user) {
        throw new NotFoundException('User not found');
      }
  
      return user;
    }
  
    async changePasswordByEmail(
      email: string,
      changePasswordDto: ChangePasswordDto,
    ): Promise<User> {
      const user = await this.userModel
        .findOneAndUpdate(
          { email },
          { password: changePasswordDto.newPassword },
          { new: true },
        )
        .exec();
  
      if (!user) {
        throw new NotFoundException('User not found');
      }
  
      return user;
    }
  
    async removeByEmail(email: string): Promise<void> {
      const result = await this.userModel.findOneAndDelete({ email }).exec();
      if (!result) {
        throw new NotFoundException('User not found');
      }
    }
  }
  