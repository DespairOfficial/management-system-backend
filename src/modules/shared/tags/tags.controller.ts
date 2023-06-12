import { SetTagsToFileDto } from './dto/set-tags-to-file.dto';
import { TagsServcie } from './tags.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('Tags')
@Controller('shared/tags')
export class TagsController {
  constructor(private readonly tagsServcie: TagsServcie) {}

  @ApiOperation({ summary: 'Get all tags' })
  @ApiOkResponse({})
  @Get()
  async getTags() {
    return await this.tagsServcie.getAllTags();
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all tags' })
  @ApiOkResponse({})
  @Patch(':id')
  async setTagsForFile(@Param('id') id: string, @Req() request: Request, @Body() setTagsToFileDto: SetTagsToFileDto) {
    return await this.tagsServcie.setTagsForFile(id, setTagsToFileDto);
  }
}
