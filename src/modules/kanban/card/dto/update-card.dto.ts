import { ApiProperty } from '@nestjs/swagger';
import { KanbanCard } from '@prisma/client';

export class UpdateCardDto implements Omit<KanbanCard, 'id' | 'attachments'> {


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
  attachments: Express.Multer.File[];

  @ApiProperty({
    example: false,
  })
  completed: boolean;

  @ApiProperty({
    example: '01887b7e-c553-765c-94c2-16bef2666fdf',
  })
  boardId: string;
}
