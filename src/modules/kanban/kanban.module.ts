import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { KanbanService } from './kanban.service';
import { KanbanController } from './kanban.controller';
import { BoardModule } from './board/board.module';
import { ColumnsModule } from './columns/columns.module';

@Module({
  controllers: [KanbanController],
  providers: [KanbanService],
  imports: [BoardModule, ColumnsModule, JwtModule],
})
export class KanbanModule {}
