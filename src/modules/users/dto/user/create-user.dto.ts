import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsOptional, IsPhoneNumber, IsString, Length } from '@nestjs/class-validator';
import { User } from '@prisma/client';

export class CreateUserDto implements Partial<User> {
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
}
