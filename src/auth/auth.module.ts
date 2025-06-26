import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserModule } from 'src/user/user.module'; // ensure this exists
import { AuthController } from './auth.controller';
import { OrderModule } from 'src/order/order.module';

@Module({
  imports: [
    UserModule,
    PassportModule,
    OrderModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController], // ✅ add controller here

  exports: [AuthService],
})
export class AuthModule {}
