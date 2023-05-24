import { ConversationService } from './conversation.service';
import { Module } from '@nestjs/common';
import { ConversationController } from './conversation.controller';
import { DatabaseModule } from '../../database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [ConversationController],
    providers: [ConversationService],
    exports: [ConversationService],
})
export class ConversationModule {}
