import { ApiProperty } from '@nestjs/swagger';
import { CalendarEvent } from '@prisma/client';

export class CalendarEventEntity implements CalendarEvent {
  @ApiProperty({
    example: '01887b7e-c553-765c-94c2-16bef2666fdf',
    description: 'Id of an event',
  })
  id: string;

  @ApiProperty({
    example: '01887b7e-c553-765c-94c2-16bef2666fdf',
    description: 'Id of user, created event',
  })
  userId: string;

  @ApiProperty({
    example: '#949494',
  })
  color: string;

  @ApiProperty({
    example: 'You need to do smth',
  })
  description: string;

  @ApiProperty({
    example: '2023-05-26T07:30:15.561Z',
  })
  start: Date;

  @ApiProperty({
    example: '2023-05-26T07:30:15.561Z',
  })
  end: Date;

  @ApiProperty({
    example: 'Have a nice day, you dumb bugger!',
  })
  title: string;

  @ApiProperty({
    example: false,
  })
  allDay: boolean;
}
