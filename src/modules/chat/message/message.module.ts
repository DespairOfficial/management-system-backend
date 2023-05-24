import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

@Module({
    imports: [DatabaseModule],
    controllers: [MessageController],
    providers: [MessageService],
		exports: [MessageService]
})
export class MessageModule {}
