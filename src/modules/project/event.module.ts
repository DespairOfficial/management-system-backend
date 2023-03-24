import { DatabaseModule } from './../database/database.module';
import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
    controllers: [EventController],
    providers: [EventService],
    imports: [DatabaseModule, JwtModule],
})
export class EventModule {}
