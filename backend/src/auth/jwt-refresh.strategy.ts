import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "./auth.service";
import { jwtConstants } from "./constants";

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        return request.cookies?.refresh;
      }]),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.refreshSecret,
      passReqToCallback: true,
    });
  }
  
  async validate(request: Request, payload: any) {
    const user = await this.authService.returnUserIfRefreshTokenMatch(
      payload,
      request.cookies?.refresh
    );
    
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
