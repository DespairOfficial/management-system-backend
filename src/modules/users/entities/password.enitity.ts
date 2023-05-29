import { Password } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length } from '@nestjs/class-validator';

export class PasswordEntity implements Password {
  @ApiProperty({
    example: '2',
    description: 'Id of a user',
  })
  userId: number;

  @ApiProperty({
    example: 'asdf_1s!@41$#afafg9',
    description: 'Password. Stored in hased form',
  })
  readonly password: string;
}
