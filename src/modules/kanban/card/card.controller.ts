import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CardEntity } from './entities/card.entity';
import { Request, request } from 'express';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

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
    return this.cardService.create(columnId, { ...createCardDto });
  }

  @Get()
  findAll() {
    return this.cardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cardService.findOne(id);
  }

  @ApiOperation({ summary: 'Create kanban card' })
  @ApiOkResponse({
    type: CardEntity,
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'attachments' }]))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCardDto: UpdateCardDto,
    @UploadedFiles() files: { attachments?: Express.Multer.File[] },
  ) {
    return this.cardService.update(id, updateCardDto, files.attachments);
  }

  @ApiOperation({ summary: 'Delete kanban card' })
  @ApiOkResponse({
    type: CardEntity,
  })
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.cardService.delete(id);
  }
}
