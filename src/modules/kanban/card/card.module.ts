import { CommentService } from './comment/comment.service';
import { FileModule } from './../../file/file.module';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from './../../database/database.module';
import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { ColumnsModule } from '../columns/columns.module';
import { CommentController } from './comment/comment.controller';

@Module({
  controllers: [CardController, CommentController],
  providers: [CardService, CommentService],
  imports: [DatabaseModule, JwtModule, ColumnsModule, FileModule],
})
export class CardModule {}
