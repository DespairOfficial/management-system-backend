import { User } from '@prisma/client';
import { IsBoolean, IsDate, IsOptional, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from '@nestjs/class-transformer';

export class UpdateUserDto implements Omit<User, 'id' | 'isVerified' | 'lastActivity' | 'status' | 'email' | 'role'> {
  // @ApiProperty({
  //   example: 'user@mail.com',
  //   description: 'Email of user',
  // })
  // @IsEmail()
  // @IsString()
  // email: string;

  @ApiProperty({
    example: 'Denis Wolf',
    description: 'Actual name of user',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'DW',
    description: 'Username',
  })
  @IsString()
  username: string;

  @ApiProperty({
    example: 'true',
    description: 'Untolerate boolean gender picker: true for Male, false for Female',
  })
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  gender: boolean;

  @ApiProperty({
    example: 'me.jpg',
    description: 'Photo of profile',
  })
  @IsOptional()
  image: string;

  @ApiProperty({
    example: '11.01.2011',
    description: 'Birth date',
  })
  @IsDate()
  @IsOptional()
  birthDate: Date;

  @ApiProperty({
    example: true,
    description: 'Used when users wants to delete his image',
  })
  @IsBoolean()
  @IsOptional()
  setImageToNull: boolean;

  @ApiProperty({
    example: 'Canada',
  })
  @IsString()
  country: string;

  @ApiProperty({
    example: '+99876543210',
  })
  @IsString()
  phone: string;

  @ApiProperty({
    example: 'Google Inc.',
  })
  @IsString()
  company: string;

  @ApiProperty({
    example: 'developer',
  })
  @IsString()
  about: string;

  @ApiProperty({
    example: 'USSR, Moskov, Lenin, 17',
  })
  @IsString()
  address: string;

  @ApiProperty({
    example: 'Is profile public',
  })
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  isPublic: boolean;
}
