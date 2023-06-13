import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from '@nestjs/class-validator';

export class RegisterUserDto {
  @ApiProperty({
    example: 'user@mail.com',
    description: 'Email of user, unique ',
  })
  @IsString({ message: 'Must be string' })
  @IsEmail({}, { message: 'Must be email' })
  readonly email: string;

  @ApiProperty({
    example: 'Denis Wolf',
    description: 'Fullanme of a user',
  })
  @IsString({ message: 'Must be string' })
  readonly name: string;

  @ApiProperty({
    example: 'DW',
    description: 'Custom username',
  })
  @IsString({ message: 'Must be string' })
  readonly username: string;

  // @ApiProperty({
  //     example: '123456',
  //     description: 'Verification code',
  // })
  // @IsNumber()
  // readonly emailVerificationCode: number;

  @ApiProperty({
    example: 'asdf_1s!@41$#afafg9',
    description: 'Password. Stored in hased form',
  })
  @IsString({ message: 'Must be string' })
  @Length(8, 24, {
    message: 'Password shoud be from 8 to 24 symbols',
  })
  readonly password: string;
}
