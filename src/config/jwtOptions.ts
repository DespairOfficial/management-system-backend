const accTokenExp = 30 * 60;
const refTokenExp = 3 * 24 * 60 * 60;
export const accessTokenOptions = {
    expiresIn: accTokenExp,
    secret: process.env.JWT_ACCESS_SECRET || 'DesperateSecretKey',
};
export const refreshTokenOptions = {
    expiresIn: refTokenExp,
    secret: process.env.JWT_REFRESH_SECRET || 'refresh_token_secret_8a1lma@#$!ds_15',
};
