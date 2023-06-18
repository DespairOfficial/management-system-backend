import { Transform } from '@nestjs/class-transformer';
import { IsBoolean, IsDate, IsDateString, IsOptional, IsString, IsUUID } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { KanbanCard } from '@prisma/client';

export class CreateCardDto implements Omit<KanbanCard, 'attachments' | 'id' | 'boardId'> {
  @ApiProperty({
    example: '01887b7e-c553-765c-94c2-16bef2666fdf',
    description: 'Id of a card - uuidv4',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    example: 'Need to do smth',
  })
  @IsString()
  name: string;

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
    example: ['2023-05-26T07:30:15.561Z', '2023-05-26T07:30:15.561Z'],
  })
  @IsDateString({}, { each: true })
  due: Date[];

  @ApiProperty({
    example: '[img1, img2]',
    description: 'Attachments files array',
    required: false,
  })
  @IsOptional()
  attachments: string[];

  @ApiProperty({
    example: false,
  })
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  completed: boolean;

  @ApiProperty({
    example: '[img1, img2]',
    description: 'Attachments files array',
  })
  @IsOptional()
  @IsString()
  prioritize: string;
}
