import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // reject expired tokens
      secretOrKey: process.env.JWT_SECRET || 'defaultSecret', // better: use environment variable
    });
  }

  validate(payload: JwtPayload) {
    // This will be set as req.user in protected routes
    return { _id: payload.sub, email: payload.email };
  }
}
