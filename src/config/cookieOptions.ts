import { CookieOptions } from 'express';

export const refreshCookieOptions: CookieOptions = {
  httpOnly: true,
  // path: '/',
  secure: true,
  sameSite: 'strict',
};
