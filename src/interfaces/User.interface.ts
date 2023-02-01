import { ApiProperty } from '@nestjs/swagger';

export class User {
    /**
     * User's unique id
     */
    @ApiProperty({
        example: '96f65c90-5441-45df-b717-1b666ba06aae',
        description: 'Uid of user',
    })
    readonly uid: string;

    /**
     * User's email
     */
    @ApiProperty({
        example: 'user@mail.com',
        description: 'Email of user',
    })
    readonly email: string;

    /**
     * User's password
     */
    @ApiProperty({
        example: 'm10_!Fb24ga_.fga_1941-fdsa4',
        description: 'Password',
    })
    readonly password: string;

    /**
     * User's nickname
     */
    @ApiProperty({
        example: 'BestUser',
        description: 'Nickname of user',
    })
    readonly name: string;
}
