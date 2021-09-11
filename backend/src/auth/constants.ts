import { CookieOptions } from 'express';

export const jwtConstants = {
  secret: 'secretKey',
  expiresIn: 60,
  refreshSecret: 'refreshSecret',
  refreshMaxAge: 60 * 60 * 24,
};

export const refreshCookieOpts: CookieOptions = {
  maxAge: jwtConstants.refreshMaxAge * 1000,
  path: '/auth/refresh',
  domain: process.env.COOKIE_DOMAIN,
  httpOnly: true,
  sameSite: 'strict',
};
