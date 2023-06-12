import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { KanbanService } from './kanban.service';
import { CreateKanbanDto } from './dto/create-kanban.dto';
import { UpdateKanbanDto } from './dto/update-kanban.dto';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiTags('Kanban')
@Controller('kanban')
export class KanbanController {
  constructor(private readonly kanbanService: KanbanService) {}

	
  @Post()
  create(@Body() createKanbanDto: CreateKanbanDto) {
    return this.kanbanService.create(createKanbanDto);
  }

  @Get()
  findAll() {
    return this.kanbanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kanbanService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKanbanDto: UpdateKanbanDto) {
    return this.kanbanService.update(+id, updateKanbanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kanbanService.remove(+id);
  }
}
