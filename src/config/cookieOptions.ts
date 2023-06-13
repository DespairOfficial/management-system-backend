import { CookieOptions } from 'express';

export const refreshCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'none',
};
