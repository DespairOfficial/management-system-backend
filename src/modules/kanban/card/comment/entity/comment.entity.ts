import { ApiProperty } from '@nestjs/swagger';
import { KanbanComment, MessageContentType } from '@prisma/client';

export class CommentEntity implements KanbanComment {
  @ApiProperty({
    example: '01887b7e-c553-765c-94c2-16bef2666fdf',
  })
  id: string;

  @ApiProperty({
    example: '[img1, img2]',
  })
  image: string;

  @ApiProperty({
    example: 'New comment',
  })
  name: string;

  @ApiProperty({
    example: '2023-03-22T08:50:01.930Z',
  })
  createdAt: Date;

  @ApiProperty({
    example: 'New comment',
  })
  message: string;

  @ApiProperty({
    example: '01887b7e-c553-765c-94c2-16bef2666fdf',
  })
  cardId: string;
}
