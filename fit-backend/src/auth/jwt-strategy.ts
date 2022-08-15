/* eslint-disable prettier/prettier */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-strategy') {
  constructor() {
    console.log('JWT STRATEGY');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  //this callback is call after GQL GUARD SUCCEED
  async validate(payload: any) {
    //decoded jwt from signed in payload
    console.log('PAYLOAD:   ', payload);
    return {
      id: payload.id,
      user: payload.name,
      email: payload.email,
      age: '28',
    }; //return user context -> available everywhere
  }
}
