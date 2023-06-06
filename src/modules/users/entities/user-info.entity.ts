import { OnlineStatus, User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserInfoEntity implements User {
  id: string;

  @ApiProperty({
    example: 'user@mail.com',
    description: 'Email of user',
  })
  email: string;

  @ApiProperty({
    example: 'Denis Wolf',
    description: 'Actual name of a user',
  })
  name: string;

  @ApiProperty({
    example: 'DW',
    description: 'Nickname of a user',
  })
  username: string;

  @ApiProperty({
    example: true,
    description: 'Is account verified',
  })
  isVerified: boolean;

  @ApiProperty({
    example: true,
    description: 'Is account public',
  })
  isPublic: boolean;

  @ApiProperty({
    example: 'Canada',
    description: 'Country of a user',
  })
  country: string;

  @ApiProperty({
    example: '+99876543210',
    description: 'Phone number of a user',
  })
  phone: string;

  @ApiProperty({
    example: 'USSR Inc.',
    description: 'Current company of a user',
  })
  company: string;

  @ApiProperty({
    example: 'Admin',
    description: 'Role of a user',
  })
  role: string;

  @ApiProperty({
    example: 'Im blue dabudi dabudai',
    description: 'Some extra informail about user',
  })
  about: string;

  @ApiProperty({
    example: 'Canada, Barcelona, Lenina, 2',
    description: 'Address',
  })
  address: string;

  @ApiProperty({
    example: 'new Date()',
    description: 'Role of a user',
  })
  lastActivity: Date;

  @ApiProperty({
    example: 'Offline',
    description: 'Online status of a user',
  })
  status: OnlineStatus;

  @ApiProperty({
    example: 'true',
    description: 'Untolerate boolean gender picker: true for Male, false for Female',
  })
  gender: boolean;

  @ApiProperty({
    example: 'me.jpg',
    description: 'Photo of profile',
  })
  image: string;

  @ApiProperty({
    example: '11.01.2011',
    description: 'Birth date',
  })
  birthDate: Date;
}
