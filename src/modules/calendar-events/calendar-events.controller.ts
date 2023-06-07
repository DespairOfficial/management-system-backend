import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { CalendarEventEntity } from './entities/calendar-event.entity';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CalendarEventsService } from './calendar-events.service';
import { CreateCalendarEventDto } from './dto/create-calendar-event.dto';
import { UpdateCalendarEventDto } from './dto/update-calendar-event.dto';
import { Request } from 'express';

@ApiTags('CalendarEvents')
@Controller('calendar/events')
@UseGuards(JwtAuthGuard)
export class CalendarEventsController {
  constructor(private readonly calendarEventsService: CalendarEventsService) {}

  @Post()
  @ApiOperation({ summary: 'Create calendar event' })
  @ApiCreatedResponse({
    type: CalendarEventEntity,
  })
  async create(@Body() createCalendarEventDto: CreateCalendarEventDto, @Req() request: Request) {
    return await this.calendarEventsService.create(request.user.id, createCalendarEventDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all calendar events' })
  @ApiOkResponse({
    type: [CalendarEventEntity],
  })
  async findAll() {
    return await this.calendarEventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.calendarEventsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update calendar event' })
  @ApiOkResponse({
    type: CalendarEventEntity,
  })
  update(@Param('id') id: string, @Body() updateCalendarEventDto: UpdateCalendarEventDto, @Req() request: Request) {
    return this.calendarEventsService.update(id, request.user.id, updateCalendarEventDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete calendar event' })
  @ApiOkResponse({
    type: CalendarEventEntity,
  })
  delete(@Param('id') id: string) {
    return this.calendarEventsService.delete(id);
  }
}
