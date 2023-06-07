import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { CalendarEventsService } from './calendar-events.service';
import { CalendarEventsController } from './calendar-events.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [CalendarEventsController],
  providers: [CalendarEventsService],
  imports: [DatabaseModule, JwtModule],
})
export class CalendarEventsModule {}
