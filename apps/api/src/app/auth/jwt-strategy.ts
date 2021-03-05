import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { environment } from '../../environments/environment';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      //secretOrKey: `-----BEGIN RSA PUBLIC KEY-----\n${environment.secret}\n-----END RSA PUBLIC KEY-----`,            
      secretOrKeyProvider:
        passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,        
        jwksUri: `${environment.issuer}/.well-known/jwks.json`
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //audience: environment.audience,
      //issuer: environment.issuer,
      algorithms: ['RS256'],
      
    });
  }

  async validate(payload: unknown) {
    console.log('---', payload);
    return payload;
  }


}
