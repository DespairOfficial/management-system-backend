import { ApiProperty } from '@nestjs/swagger';
import { KanbanColumn } from '@prisma/client';

export class ColumnEntity implements KanbanColumn {
  @ApiProperty({
    example: '01887b7e-c553-765c-94c2-16bef2666fdf',
    description: 'Id of a column',
  })
  id: string;

  @ApiProperty({
    example: 'Column',
  })
  name: string;

  @ApiProperty({
    example: '01887b7e-c553-765c-94c2-16bef2666fdf',
    description: 'Id of a board',
  })
  boardId: string;
}
