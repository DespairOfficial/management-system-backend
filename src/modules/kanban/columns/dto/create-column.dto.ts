import { IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { KanbanColumn } from '@prisma/client';

export class CreateColumnDto implements Omit<KanbanColumn, 'id'> {
  @ApiProperty({
    example: 'Fix',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: '01887b7e-c553-765c-94c2-16bef2666fdf',
  })
  @IsString()
  boardId: string;
}
