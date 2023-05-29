import { User } from '@prisma/client';
import { IsBoolean, IsDate, IsEmail, IsOptional, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserInfoEntity implements Partial<User> {
  @ApiProperty({
    example: 'user@mail.com',
    description: 'Email of user',
  })
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({
    example: 'Denis',
    description: 'Firstname of user',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    example: 'Wolf',
    description: 'Lastname of user',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    example: 'true',
    description: 'Untolerate boolean gender picker: true for Male, false for Female',
  })
  @IsBoolean()
  gender: boolean;

  @ApiProperty({
    example: 'me.jpg',
    description: 'Photo of profile',
  })
  @IsString()
  @IsOptional()
  image: string;

  @ApiProperty({
    example: '11.01.2011',
    description: 'Birth date',
  })
  @IsDate()
  @IsOptional()
  birthDate: Date;
}
