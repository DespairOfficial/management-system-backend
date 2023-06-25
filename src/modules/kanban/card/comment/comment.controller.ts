import { CommentEntity } from './entity/comment.entity';

import { Request } from 'express';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { Body, Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiConsumes, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@UseGuards(JwtAuthGuard)
@ApiTags('KanbanComment')
@Controller('kanban/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({ summary: 'Create kanban card comment' })
  @ApiCreatedResponse({
    type: CommentEntity,
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @Post()
  create(
    @Body() createCommentDto: CreateCommentDto,
    @Req() request: Request,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.commentService.create(request.user.id, createCommentDto, image);
  }
}
