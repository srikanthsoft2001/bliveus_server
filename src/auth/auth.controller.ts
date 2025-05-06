// src/auth/auth.controller.ts
import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { response, Response } from 'express';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import { User } from 'src/user/schema/user.schema';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtRefreshStrategy } from './jwt-refresh.strategy';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(JwtAuthGuard)
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.login(user, response);
  }

  // @Post('refresh')
  // @UseGuards(JwtRefreshStrategy)
  // async refreshToken(
  //   @CurrentUser() user:User,
  //   @Res({passthrough:true}) response:Response,
  // ){
  //   await this.authService.login(user,response);
  // }
  
}
