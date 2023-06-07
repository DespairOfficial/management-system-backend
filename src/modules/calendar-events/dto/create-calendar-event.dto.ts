import { IsBoolean, IsDate, IsDateString, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CalendarEvent } from '@prisma/client';

export class CreateCalendarEventDto implements Omit<CalendarEvent, 'id' | 'userId'> {

  @ApiProperty({
    example: '#949494',
  })
  @IsString()
  color: string;

  @ApiProperty({
    example: 'You need to do smth',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: '2023-05-26T07:30:15.561Z',
  })
  @IsDateString()
  start: Date;

  @ApiProperty({
    example: '2023-05-26T07:30:15.561Z',
  })
  @IsDateString()
  end: Date;

  @ApiProperty({
    example: 'Have a nice day, you dumb bugger!',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: false,
  })
  @IsBoolean()
  allDay: boolean;
}
