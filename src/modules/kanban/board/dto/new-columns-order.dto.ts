import { IsArray } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NewColumnOrderDto {
  @ApiProperty({ example: ['1', '2'] })
  @IsArray()
  newColumnOrder: string[];
}
