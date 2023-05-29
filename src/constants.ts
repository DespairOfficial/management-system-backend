import { Tokens } from './interfaces/Tokens.interface';

export const PG_CONNECTION = 'PG_CONNECTION';
export const JWT_TOKEN_EXAMPLE =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
export const TOKEN_OBJECT_EXAMPLE: Tokens = {
  accessToken: JWT_TOKEN_EXAMPLE,
  refreshToken: JWT_TOKEN_EXAMPLE,
};
export const ITEM_DELETED = 'This item already deleted';
export const UNAUTHORIZED = 'You are not authorized';
export const UNAUTHORIZED_OR_BAD_TOKEN = 'You are not authorized or bad token';
export const UNKOWN_INTERNAL_ERROR = 'Something goes wrong...';
export const NO_RIGHTS = 'You have no rigths for this';
export const WRONG_ARGUMENTS = 'Please, check arguments again. There might be odd';
export const ARGUMENT_ADDED = 'Please, check arguments again. You might be already have one of them';
export const ERROR_SAVING_TOKEN = 'Token wasnt saved';
export const ERROR_CREATING_SESSION = 'Session was not created';

export const BAD_TARGET = 'Target does not exist';

export const BAD_REQUEST = 'Bad or corrupted request';
export const BAD_AUTH = 'You cannot be authorized';

export const REQUEST_WAS_SEND = 'Request was already send';
