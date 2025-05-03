import { Body, Controller, Get, Post, Put, Param, Delete, Patch } from '@nestjs/common';
  import { UserService } from './user.service';
  import { CreateUserDto } from './dto/create-user.dto';
  import { UpdateUserDto } from './dto/update-user.dto';
  import { ChangePasswordDto } from './dto/change-password.dto';
  import { LoginUserDto } from './dto/login-user.dto';
  
  @Controller('users')
  export class UserController {
    constructor(private readonly userService: UserService) {}
  
    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
      return this.userService.create(createUserDto);
    }
  
    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto) {
      return this.userService.login(loginUserDto);
    }
  
    @Get()
    async findAll() {
      return this.userService.findAll();
    }
  
    @Get(':email')
    async findOne(@Param('email') email: string) {
      return this.userService.findOneByEmail(email);
    }
  
    @Put(':email')
    async update(
      @Param('email') email: string,
      @Body() updateUserDto: UpdateUserDto,
    ) {
      return this.userService.updateByEmail(email, updateUserDto);
    }
  
    @Patch(':email/password')
    async changePassword(
      @Param('email') email: string,
      @Body() changePasswordDto: ChangePasswordDto,
    ) {
      return this.userService.changePasswordByEmail(email, changePasswordDto);
    }
  
    @Delete(':email')
    async remove(@Param('email') email: string) {
      return this.userService.removeByEmail(email);
    }
  }
  
  