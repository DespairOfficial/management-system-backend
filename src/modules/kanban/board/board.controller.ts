import { BoardEntity } from './entities/board.entity';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BoardService } from './board.service';
import { UpdateBoardDto } from './dto/update-board.dto';
import { NewColumnOrderDto } from './dto/new-columns-order.dto';

@Controller('kanban/board')
@ApiTags('KanbanBoard')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @ApiOperation({ summary: 'Get kanban board' })
  @ApiOkResponse({
    type: BoardEntity,
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.boardService.findOne(id);
  }

	@ApiOperation({ summary: 'Set new column order' })
  @ApiOkResponse({
    type: BoardEntity,
  })
  @Patch(':id/order')
  update(@Param('id') id: string, @Body() newColumnOrderDto: NewColumnOrderDto) {
    return this.boardService.setNewOrder(id, newColumnOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardService.remove(id);
  }
}
