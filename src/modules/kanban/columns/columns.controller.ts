import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { ColumnEntity } from './entities/column.entity';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { SetCardsPositionDto } from './dto/set-cards-position.dto';

@Controller('kanban/columns')
@UseGuards(JwtAuthGuard)
@ApiTags('KanbanColumns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @ApiOperation({ summary: 'Set new cards on columns  order' })
  @ApiOkResponse({
    type: ColumnEntity,
  })
  @Patch('cardsPosition')
  setCardsPosition(@Body() setCardsPositionDto: SetCardsPositionDto) {
    return this.columnsService.setCardsPosition(setCardsPositionDto);
  }

  @ApiOperation({ summary: 'Create kanban column' })
  @ApiCreatedResponse({
    type: ColumnEntity,
  })
  @Post()
  create(@Body() createColumnDto: CreateColumnDto) {
    return this.columnsService.create(createColumnDto);
  }

  @Get()
  findAll() {
    return this.columnsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.columnsService.findOne(id);
  }

  @ApiOperation({ summary: 'Update kanban column' })
  @ApiOkResponse({
    type: ColumnEntity,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateColumnDto: UpdateColumnDto) {
    return this.columnsService.update(id, updateColumnDto);
  }

  @ApiOperation({ summary: 'Delete kanban column' })
  @ApiOkResponse({
    type: ColumnEntity,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.columnsService.delete(id);
  }
}
