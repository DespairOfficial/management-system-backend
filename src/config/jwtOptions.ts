const accTokenExp = 24 * 60 * 60;
const refTokenExp = 3 * 24 * 60 * 60;
export const accessTokenOptions = {
  expiresIn: accTokenExp,
  secret: process.env.JWT_ACCESS_SECRET,
};
export const refreshTokenOptions = {
  expiresIn: refTokenExp,
  secret: process.env.JWT_REFRESH_SECRET,
};
