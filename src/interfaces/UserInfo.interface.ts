import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Tag } from './Tag.interface';

export class UserInfo {
    @ApiProperty({
        example: 'user@mail.com',
        description: 'Email of user',
    })
    readonly email: string;
    @ApiProperty({
        example: 'BestUser',
        description: 'Nickname of user',
    })
    readonly nickname: string;
    @ApiProperty({
        description: 'Tags of user',
        type: OmitType(Tag, ['creator']),
    })
    readonly tags: Omit<Tag, 'creator'>[];
}
