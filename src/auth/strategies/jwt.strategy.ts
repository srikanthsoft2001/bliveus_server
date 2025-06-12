import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // reject expired tokens
      secretOrKey: process.env.JWT_SECRET || 'defaultSecret', // better: use environment variable
    });
  }

  async validate(payload: any) {
    // This will be set as req.user in protected routes
    return { _id: payload.sub, email: payload.email };
  }
}
