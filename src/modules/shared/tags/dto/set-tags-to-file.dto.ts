import { IsArray, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SetTagsToFileDto {
  @ApiProperty({
    example: ['Dev', 'Fix'],
    description: 'tags',
  })
	@IsArray()
  tags: string[];
}
