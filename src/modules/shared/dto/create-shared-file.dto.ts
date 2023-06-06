import { Type } from '@nestjs/class-transformer';
import { IsDate, IsNumber, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SharedFile } from '@prisma/client';

export class CreateSharedFileDto implements Omit<SharedFile, 'id' | 'url'> {
  @ApiProperty({
    example: 'flying_pudge',
    description: 'Name of a file',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 1920000,
    description: 'Size of a created file',
  })
  @IsNumber()
  @Type(() => Number)
  size: number;

  @ApiProperty({
    example: '01887b7e-c553-765c-94c2-16bef2666fdf',
    description: 'Id of a creator',
  })
  @IsString()
  userId: string;

  @ApiProperty({
    example: 'pdf',
    description: 'Extension of a file',
  })
  @IsString()
  type: string;

  @ApiProperty({
    example: '/shared/asdfugsd-fayad6-fasd6f-9fy97fs/asdfu00asdf-asdf7asdfyas-fda7sdf-flying_pudge.pdf',
    description: 'Extension of a file',
  })
  @IsString()
  url: string;

  @ApiProperty({
    example: '2023-03-22T08:50:01.930Z',
    description: 'File created',
  })
  @IsDate()
  dateCreated: Date;

  @ApiProperty({
    example: '2023-03-22T08:50:01.930Z',
    description: 'File modified',
  })
  @IsDate()
  dateModified: Date;
}
