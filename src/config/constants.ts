import { Tokens } from '../interfaces/Tokens.interface';

export const PG_CONNECTION = 'PG_CONNECTION';
export const JWT_TOKEN_EXAMPLE =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
export const TOKEN_OBJECT_EXAMPLE: Tokens = {
  accessToken: JWT_TOKEN_EXAMPLE,
  refreshToken: JWT_TOKEN_EXAMPLE,
};
export const ITEM_DELETED = 'This item already deleted';
export const NOT_AUTHORIZED = 'You are not authorized';
export const NOT_AUTHORIZED_OR_BAD_TOKEN = 'You are not authorized or bad token';
export const UNKOWN_INTERNAL_ERROR = 'Something goes wrong...';
export const FORBIDDEN = 'You have no rigths for this';
export const WRONG_ARGUMENTS = 'Please, check arguments again. There might be odd';
export const ARGUMENT_ADDED = 'Please, check arguments again. You might be already have one of them';
export const ERROR_SAVING_TOKEN = 'Token wasnt saved';
export const ERROR_CREATING_SESSION = 'Session was not created';
export const ERROR_SAVING_FILE = 'Error occured during saving the file';

export const BAD_TARGET = 'Target does not exist';

export const AGE_OF_USER_REQUIRED = 'You need to specify your age in profile';

export const NO_CATEGORY_FOUND = "You don't fit into any of the categories ";

export const NOT_FOUND_ERROR = 'Target entity not found';

export const BAD_REQUEST = 'Bad or corrupted request';
export const BAD_AUTH = 'You cannot be authorized';

export const REQUEST_WAS_SEND = 'Request was already send';

export const DEVELOPMENT_FILES = 'You can not upload files in DEVELOPMENT mode';

export const EMPTY_PRODUCTS = 'Products array cannot be empty';
