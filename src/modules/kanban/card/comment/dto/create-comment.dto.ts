import { IsOptional, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { KanbanComment } from '@prisma/client';

export class CreateCommentDto implements Omit<KanbanComment, 'id' | 'createdAt'> {
  @ApiProperty({
    example: '[img1, img2]',
  })
  @IsOptional()
  image: string;

  @ApiProperty({
    example: 'New comment',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'New comment',
  })
  @IsString()
  message: string;

  @ApiProperty({
    example: '01887b7e-c553-765c-94c2-16bef2666fdf',
  })
  @IsString()
  cardId: string;
}
