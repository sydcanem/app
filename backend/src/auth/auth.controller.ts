import { Controller, Post, UseGuards, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtRefreshAuthGuard } from './jwt-refresh-auth.guard';
import { jwtConstants } from './constants';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req, @Res() res: Response) {
    const token = this.authService.generateToken(req.user);
    const refreshToken = this.authService.generateRefreshToken(req.user);

    await this.authService.saveRefreshTokenForUser(req.user, refreshToken);

    res.cookie('refresh', refreshToken, {
      maxAge: jwtConstants.refreshMaxAge,
      path: '/auth/refresh',
      domain: '/',
      httpOnly: true,
    });

    res.status(200).send({ token });
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Post('/refresh')
  async refresh(@Req() req, @Res() res: Response) {
    const token = this.authService.generateToken(req.user);
    res.status(200).send({ token });
  }
}
