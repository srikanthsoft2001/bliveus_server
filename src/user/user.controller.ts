import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from './schemas/user.schema';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    console.log('data is getting here' + JSON.stringify(CreateUserDto));
    return this.userService.createUser(createUserDto);
  }

  @Get(':_id')
  async getUserById(@Param('_id') _id: string) {
    return this.userService.getUserById(_id);
  }
  @Put(':_id')
  async updateUserById(
    @Param('_id') _id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const updatedUser = await this.userService.updateUser(_id, updateUserDto);
    if (!updatedUser) {
      throw new NotFoundException(`User with id ${_id} not found`);
    }
    return updatedUser;
  }
}
