import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenPayload } from '../interfaces/token-payload.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request): string | null => {
          const cookies = request.cookies as Record<string, string> | undefined;
          const token = cookies?.Refresh;
          return typeof token === 'string' ? token : null;
        },
      ]),
      secretOrKey: configService.getOrThrow<string>('JWT_REFRESH_TOKEN_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: TokenPayload) {
    const cookies = request.cookies as Record<string, string> | undefined;
    const refreshToken = cookies?.Refresh;

    if (typeof refreshToken !== 'string') {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return this.authService.verifyUserRefreshToken(refreshToken, payload.userId);
  }
}
