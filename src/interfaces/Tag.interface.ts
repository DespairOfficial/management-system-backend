import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from '@nestjs/class-validator';

export class Tag {
    @ApiProperty({
        example: '2',
        description: 'Id of tag',
    })
    readonly id: number;

    @ApiProperty({
        example: '96f65c90-5441-45df-b717-1b666ba06aae',
        description: "Uid of  tag's creator",
    })
    @IsString({ message: 'Must be string' })
    readonly creator: string;

    @ApiProperty({
        example: 'Best tag#1',
        description: 'Title of tag, not longer, than 40 symbols',
    })
    @IsString({ message: 'Must be string' })
    @Length(0, 40, {
        message: 'Can not be longer than 40 symbols',
    })
    readonly name: string;

    @IsString({ message: 'Must be string' })
    @ApiProperty({
        example: '0',
        description: 'Sort order of tag',
    })
    readonly sort_order: number;
}
