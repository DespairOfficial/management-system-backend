import { IsEmail, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RemoveContributorFromFileDto {
  @ApiProperty({
    example: '01887b7e-c553-765c-94c2-16bef2666fdf',
    description: 'Id of a contributor',
  })
  @IsString()
  contributorId: string;
}
