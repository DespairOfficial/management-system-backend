import { IsArray, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SetContributorsToFileDto {
  @ApiProperty({
    example: ['01887b7e-c553-765c-94c2-16bef2666fdf', '01887b7e-c553-765c-94c2-16bef2666fdf'],
    description: 'Ids of a new contributors',
  })
  @IsArray()
  contributorIds: string[];
}
