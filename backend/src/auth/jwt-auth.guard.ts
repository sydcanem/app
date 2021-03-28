import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // TODO: handle refreshing token if almost expires
  async canActivate(context: ExecutionContext) {
    try {
      await super.canActivate(context);
    } catch {
      return false;
    }
    return true;
  }
}
