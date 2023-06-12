import { PrismaService } from 'src/modules/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateCalendarEventDto } from './dto/create-calendar-event.dto';
import { UpdateCalendarEventDto } from './dto/update-calendar-event.dto';
import { User } from '@prisma/client';

@Injectable()
export class CalendarEventsService {
  constructor(private readonly prismaService: PrismaService) {}
  private readonly calendarEventsRepository = this.prismaService.calendarEvent;

  async create(userId: User['id'], createCalendarEventDto: CreateCalendarEventDto) {
    return await this.calendarEventsRepository.create({
      data: { ...createCalendarEventDto, userId },
    });
  }

  async findAll() {
    return await this.calendarEventsRepository.findMany();
  }

  async findOne(id: string) {
    return await this.calendarEventsRepository.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  async update(id: string, userId: User['id'], updateCalendarEventDto: UpdateCalendarEventDto) {
    return await this.calendarEventsRepository.update({
      where: {
        id,
      },
      data: { ...updateCalendarEventDto, userId },
    });
  }

  async delete(id: string) {
    return await this.calendarEventsRepository.delete({
      where: {
        id,
      },
    });
  }
}
