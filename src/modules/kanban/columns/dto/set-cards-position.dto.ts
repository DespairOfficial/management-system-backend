import { ColumnWithCardEntity } from '../entities/column-with-cardIds.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from '@nestjs/class-validator';

export class SetCardsPositionDto {
  @ApiProperty({
    type: ColumnWithCardEntity,
  })
  @IsNotEmpty()
  startColumn: ColumnWithCardEntity;

  @ApiProperty({
    type: ColumnWithCardEntity,
    required: false,
  })
  @IsOptional()
  finishColumn?: ColumnWithCardEntity;
}
