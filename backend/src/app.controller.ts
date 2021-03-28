import {
  Controller,
  Post,
  UseGuards,
  Req,
  Res,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService){}

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req, @Res() res: Response) {
    const { token, maxAge } = await this.authService.login(req.user);
    res.cookie('authentication', token, {
      httpOnly: true,
      maxAge: maxAge,
    });
    res.status(200).send();
  }
}
