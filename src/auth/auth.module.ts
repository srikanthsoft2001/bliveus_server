// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from 'src/user/user.module'; // Ensure this is imported
import { LocalStrategy } from './passport-local.strategy';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtRefreshStrategy } from './jwt-refresh.strategy';

@Module({
  imports: [
    UserModule,PassportModule,JwtModule 
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy,JwtStrategy,JwtRefreshStrategy],
})
export class AuthModule {}
