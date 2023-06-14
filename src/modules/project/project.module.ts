import { ConversationModule } from './../chat/conversation/conversation.module';
import { FileModule } from './../file/file.module';
import { ProjectService } from './project.service';
import { DatabaseModule } from '../database/database.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ProjectController } from './project.controller';
import { BoardModule } from '../kanban/board/board.module';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService],
  imports: [DatabaseModule, JwtModule, FileModule, ConversationModule, BoardModule],
})
export class ProjectModule {}
