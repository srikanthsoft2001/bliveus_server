import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "src/user/user.service";
import { TokenPayload } from "./jwt-payload.interface";
import { Request } from 'express';

import { Injectable } from "@nestjs/common";
import { AuthService } from "./auth.service";
``
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    
    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UserService,
        private readonly authService: AuthService, 

      ) {
        super({
          jwtFromRequest: ExtractJwt.fromExtractors([
            (request: Request) => request?.cookies?.Authentication,
          ]),
          secretOrKey: configService.getOrThrow('JWT_REFRESH_TOKEN_SECRET'),
          passReqToCallback: true,
        });
      }
      async validate(request:Request, payload: TokenPayload) {
        return this.authService
        .verifyUserRefreshToken(request.cookies?.Refresh,payload.userId

        )
          
      } 
          
      
}