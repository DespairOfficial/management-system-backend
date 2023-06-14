import { BoardEntity } from './entities/board.entity';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BoardService } from './board.service';
import { UpdateBoardDto } from './dto/update-board.dto';

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardService.update(id, updateBoardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardService.remove(id);
  }
}
