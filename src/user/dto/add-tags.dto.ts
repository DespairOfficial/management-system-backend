import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from '@nestjs/class-validator';

export class AddTagsDto {
    @ApiProperty({
        example: '[1, 2, 3]',
        description: 'Tags, user want to add',
    })
    @IsArray({ message: 'Must be array of numbers' })
    readonly tags: Array<number>;
}
