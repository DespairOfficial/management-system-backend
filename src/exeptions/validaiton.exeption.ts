import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationExeption extends HttpException {
  messages: string[];
  constructor(responseMessages: string[]) {
    super(responseMessages, HttpStatus.BAD_REQUEST);
    this.messages = responseMessages;
  }
}
