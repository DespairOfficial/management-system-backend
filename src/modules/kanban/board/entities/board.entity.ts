import { KanbanBoard } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class BoardEntity implements KanbanBoard {
  @ApiProperty({
    example: '01887b7e-c553-765c-94c2-16bef2666fdf',
    description: 'Id of a board',
  })
  id: string;

  @ApiProperty({
    example: 2,
    description: 'Id of a project',
  })
  projectId: number;

  @ApiProperty({
    example: ['ds', 'sadf', 'sdf'],
    description: 'Orders of a columns',
  })
  columnOrder: string[];
}
