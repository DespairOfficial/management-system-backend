import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
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
        example: 'Denis',
        description: 'Firstname of user',
    })
    firstName: string;

    @ApiProperty({
        example: false,
        description: 'Is user had verified his email',
    })
    isVerified: boolean;

    @ApiProperty({
        example: 'Wolf',
        description: 'Lastname of user',
    })
    lastName: string;

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
        type: PasswordEntity,
    })
    password?: PasswordEntity;
}
