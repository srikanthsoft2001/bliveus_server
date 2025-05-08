import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto'; // Ensure CreateUserDto exists

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUsers(@CurrentUser() user: User) {
    return this.userService.getAllUsers();
  }

  //   @Post('login')
  //   async login(@Body() loginUserDto: LoginUserDto) {
  //     return this.userService.login(loginUserDto);
  //   }

  //   @Get(':email')
  //   async findOne(@Param('email') email: string) {
  //     return this.userService.findOneByEmail(email);
  //   }

  //   @Put(':email')
  //   async update(
  //     @Param('email') email: string,
  //     @Body() updateUserDto: UpdateUserDto,
  //   ) {
  //     return this.userService.updateByEmail(email, updateUserDto);
  //   }

  //   @Patch(':email/password')
  //   async changePassword(
  //     @Param('email') email: string,
  //     @Body() changePasswordDto: ChangePasswordDto,
  //   ) {
  //     return this.userService.changePasswordByEmail(email, changePasswordDto);
  //   }

  //   @Delete(':email')
  //   async remove(@Param('email') email: string) {
  //     return this.userService.removeByEmail(email);
  //   }
}
