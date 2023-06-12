import { KanbanColumn } from '@prisma/client';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateColumnDto } from './create-column.dto';
import { IsArray, IsString } from '@nestjs/class-validator';

export class UpdateColumnDto implements Omit<KanbanColumn, 'id' | 'boardId'> {
  @ApiProperty({
    example: 'Column',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: ['asdf4', 'sadf', 'fasd'],
  })
  @IsArray()
  cardIds: string[];
}
