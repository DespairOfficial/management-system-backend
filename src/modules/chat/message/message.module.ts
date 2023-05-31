import { FileModule } from './../../file/file.module';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

@Module({
  imports: [DatabaseModule, FileModule],
  controllers: [MessageController],
  providers: [MessageService],
  exports: [MessageService],
})
export class MessageModule {}
