import {
  Controller,
  Post,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { RefreshAuthGuard } from './refresh-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService){}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req, @Res() res: Response) {
    const token = this.authService.generateToken(req.user);
    const refreshCookie = this.authService.generateRefreshTokenCookie(req.user);
    res.setHeader('Set-Cookie', [refreshCookie]);
    res.status(200).send({ token });
  }

  @UseGuards(RefreshAuthGuard)
  @Post('/refresh')
  async refresh(@Req() req, @Res() res: Response) {
    const token = this.authService.generateToken(req.user);
    res.status(200).send({ token });
  }
}
