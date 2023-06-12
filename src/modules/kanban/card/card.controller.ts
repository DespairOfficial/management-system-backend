import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CardEntity } from './entities/card.entity';
import { Request, request } from 'express';

@UseGuards(JwtAuthGuard)
@ApiTags('KanbanCard')
@Controller('kanban/card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @ApiOperation({ summary: 'Create kanban card' })
  @ApiCreatedResponse({
    type: CardEntity,
  })
  @Post(':columnId')
  create(@Body() createCardDto: CreateCardDto, @Param('columnId') columnId: string, @Req() request: Request) {
    const userId = request.user.id;
    return this.cardService.create(columnId, { ...createCardDto, assignee: [...createCardDto.assignee, userId] });
  }

  @Get()
  findAll() {
    return this.cardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardService.update(+id, updateCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardService.remove(+id);
  }
}
