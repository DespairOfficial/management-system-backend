import { IsBoolean, IsDateString, IsOptional, IsString } from '@nestjs/class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CalendarEvent } from '@prisma/client';

export class UpdateCalendarEventDto implements Omit<CalendarEvent, 'id' | 'userId'> {
  @ApiProperty({
    example: '#949494',
  })
  @IsString()
  @IsOptional()
  color: string;

  @ApiProperty({
    example: 'You need to do smth',
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    example: '2023-05-26T07:30:15.561Z',
  })
  @IsDateString()
  @IsOptional()
  start: Date;

  @ApiProperty({
    example: '2023-05-26T07:30:15.561Z',
  })
  @IsDateString()
  @IsOptional()
  end: Date;

  @ApiProperty({
    example: 'Have a nice day, you dumb bugger!',
  })
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty({
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  allDay: boolean;
}
