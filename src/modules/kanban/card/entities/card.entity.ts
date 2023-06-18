import { ApiProperty } from '@nestjs/swagger';
import { KanbanCard } from '@prisma/client';

export class CardEntity implements KanbanCard {
  @ApiProperty({
    example: '01887b7e-c553-765c-94c2-16bef2666fdf',
    description: 'Id of a card',
  })
  id: string;

  @ApiProperty({
    example: 'Need to do smth',
  })
  name: string;

  @ApiProperty({
    example: 'Cool good no',
  })
  description: string;

  @ApiProperty({
    example: '01887b7e-c553-765c-94c2-16bef2666fdf',
  })
  assigneeId: string;

  @ApiProperty({
    example: '2023-05-26T07:30:15.561Z',
  })
  due: Date[];

  @ApiProperty({
    example: '[img1, img2]',
    description: 'Attachments files array',
  })
  attachments: string[];

  @ApiProperty({
    example: false,
  })
  completed: boolean;

  @ApiProperty({
    example: '01887b7e-c553-765c-94c2-16bef2666fdf',
  })
  boardId: string;

  @ApiProperty({
    example: 'low',
  })
  prioritize: string;
}
