import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from '@nestjs/class-validator';

export class AddToContactsDto {
  @ApiProperty({
    example: ['01887b7e-c553-765c-94c2-16bef2666fdf'],
    description: 'Array of user ids',
  })
  @IsArray()
  ids: string[];
}
