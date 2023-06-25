import { ColumnEntity } from './column.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ColumnWithCardEntity implements Omit<ColumnEntity, 'boardId'> {
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
    example: ['01887b7e-c553-765c-94c2-16bef2666fdf', '01887b7e-c553-765c-94c2-16bef2666fdf'],
  })
  cardIds: string[];
}
