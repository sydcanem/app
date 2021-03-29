import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { Request } from 'express';

@Injectable()
export class RefreshAuthGuard implements CanActivate {
  // TODO: need to validate if refresh token is blacklisted or not
  // attach user details into the request
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const refreshToken = request.cookies.Refresh;

    if (!refreshToken) {
      return false;
    }

    return true;
  }
}