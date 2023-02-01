import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Tag } from 'src/interfaces/Tag.interface';

export class UserAddedTagsDto {
    @ApiProperty({
        description: 'Array of tags, created by current user',
        type: [OmitType(Tag, ['creator'])],
    })
    tags: [Omit<Tag, 'creator'>];
}
