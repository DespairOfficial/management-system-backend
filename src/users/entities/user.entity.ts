import { JWT_TOKEN_EXAMPLE } from './../../constants';
import { User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

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
        example: 'CoolUser1337',
        description: 'Name of user',
    })
    name: string;

    @ApiProperty({
        example: 'm10_!Fb24ga_.fga_1941-fdsa4',
        description: 'Password',
    })
    password: string;

	@ApiProperty({
        example: JWT_TOKEN_EXAMPLE,
        description: 'Current refresh token of user',
    })
    refreshToken: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
