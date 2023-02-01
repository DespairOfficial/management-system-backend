import { Tokens } from './interfaces/Tokens.interface';

export const PG_CONNECTION = 'PG_CONNECTION';
export const TOKEN_EXAMPLE =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IiJ9.eyJzdWIiOiIiLCJuYW1lIjoiIiwiaWF0IjoxMjAzMjN9.13hSdKXX8nSdbb7MnPjbIVMxp3r2jzNEaMs0r06pJsY';
export const TOKEN_OBJECT_EXAMPLE: Tokens = {
    accessToken: { token: TOKEN_EXAMPLE, expiresIn: 1800 },
    refreshToken: { token: TOKEN_EXAMPLE, expiresIn: 3600 },
};
export const ITEM_DELETED = 'This item already deleted';
export const NOT_AUTHORIZED = 'You are not authorized';
export const NOT_AUTHORIZED_OR_BAD_TOKEN = 'You are not authorized or bad token';
export const UNKOWN_INTERNAL_ERROR = 'Something goes wrong...';
export const TAGNAME_EXISTS = 'Tag with that name already exists';
export const NO_RIGHTS = 'You have no rigths for this';
export const WRONG_ARGUMENTS = 'Please, check arguments again. There might be odd';
export const ARGUMENT_ADDED = 'Please, check arguments again. You might be already have one of them';
export const ERROR_SAVING_TOKEN = 'Token wasnt saved';
export const BAD_REQUEST = 'Bad or corrupted request';
export const BAD_AUTH = 'You cannot be authorized';
