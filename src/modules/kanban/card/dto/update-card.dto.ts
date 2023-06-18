import { Transform } from '@nestjs/class-transformer';
import { IsArray, IsBoolean, IsDate, IsOptional, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { KanbanCard } from '@prisma/client';

export class UpdateCardDto implements Omit<KanbanCard, 'id' | 'attachments' | 'boardId'> {
  @ApiProperty({
    example: 'Need to do smth',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'sadfasd-f6a-s7df6as9-7d5fas7df',
  })
  @IsString()
  columnId: string;

  @ApiProperty({
    example: 'low',
  })
  @IsString()
  prioritize: string;

  @ApiProperty({
    example: 'Cool good no',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: ['01887b7e-c553-765c-94c2-16bef2666fdf', '01887b7e-c553-765c-94c2-16bef2666fdf'],
  })
  @IsOptional()
  assignee: string[];

  @ApiProperty({
    example: '2023-05-26T07:30:15.561Z',
  })
  @IsArray()
  due: Date[];

  @ApiProperty({
    example: '[img1, img2]',
    description: 'Attachments files array',
  })
  @IsOptional()
  attachments: string[] | string;

  @ApiProperty({
    example: false,
  })
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  completed: boolean;
}
