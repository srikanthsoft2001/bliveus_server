import { Body, Controller, Get, Post, Put, Param, Delete, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Role } from './dto/roles.enum';
import { RolesGuard } from './auth/roles.guard';
import { Roles } from './auth/roles.decorator';


@Controller('users')
@UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Roles(Role.ADMIN,Role.CUSTOMER)
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.SUPPORT)
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':email')
  @Roles(Role.ADMIN, Role.SUPPORT, Role.SELLER, Role.CUSTOMER)
  async findOne(@Param('email') email: string) {
    return this.userService.findOneByEmail(email);
  }

  @Put(':email')
  @Roles(Role.ADMIN, Role.SUPPORT, Role.SELLER, Role.CUSTOMER)
  async update(
    @Param('email') email: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateByEmail(email, updateUserDto);
  }

  @Patch(':email/password')
  @Roles(Role.ADMIN, Role.SUPPORT, Role.SELLER, Role.CUSTOMER)
  async changePassword(
    @Param('email') email: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.userService.changePasswordByEmail(email, changePasswordDto);
  }

  @Delete(':email')
  @Roles(Role.ADMIN,Role.SELLER,Role.CUSTOMER)
  async remove(@Param('email') email: string) {
    return this.userService.removeByEmail(email);
  }
}
