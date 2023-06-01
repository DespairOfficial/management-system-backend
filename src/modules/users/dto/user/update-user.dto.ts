import { User } from '@prisma/client';
import { IsBoolean, IsDate, IsEmail, IsOptional, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto implements Omit<User, 'id' | 'isVerified' | 'lastActivity' | 'status'> {
  @ApiProperty({
    example: 'user@mail.com',
    description: 'Email of user',
  })
  @IsEmail()
  @IsString()
  email: string;

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
  country: string;

  @ApiProperty({
    example: '+99876543210',
  })
  phoneNumber: string;

  @ApiProperty({
    example: 'Google Inc.',
  })
  company: string;

  @ApiProperty({
    example: 'admin',
  })
  role: string;
}
