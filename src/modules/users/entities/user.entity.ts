import { ApiProperty } from '@nestjs/swagger';
import { OnlineStatus, User } from '@prisma/client';
import { PasswordEntity } from './password.enitity';

export class UserEntity implements User {
  @ApiProperty({
    example: '1',
    description: 'Id of user',
  })
  id: number;

  @ApiProperty({
    example: 'user@mail.com',
    description: 'Email of user',
  })
  email: string;

	@ApiProperty({
    example: 'Denis Wolf',
    description: 'Fullanme of a user',
  })
  readonly name: string;

  @ApiProperty({
    example: 'DW',
    description: 'Custom username',
  })
  readonly username: string;

  @ApiProperty({
    example: false,
    description: 'Is user had verified his email',
  })
  isVerified: boolean;

  @ApiProperty({
    example: 'true',
    description: 'Untolerate boolean gender picker: true for Male, false for Female',
  })
  gender: boolean;

  @ApiProperty({
    example: 'me.jpg',
    description: 'Image of a  profile',
  })
  image: string;

  @ApiProperty({
    example: '11.01.2011',
    description: 'Birth date',
  })
  birthDate: Date;

	@ApiProperty({
    example: '11.01.2011',
    description: 'Last activity',
  })
  lastActivity: Date;

	@ApiProperty({
    example: 'online',
    description: 'user online status',
  })
  status: OnlineStatus;

  @ApiProperty({
    type: PasswordEntity,
  })
  password?: PasswordEntity;
}
