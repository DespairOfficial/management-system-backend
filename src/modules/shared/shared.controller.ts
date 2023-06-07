import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { SharedService } from './shared.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SharedFileEntity } from './entity/shared-file.entity';
import { Request } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AddContributorToFileDto } from './contributors/dto/add-contributor-to-file.dto';
import { ContributorsService } from './contributors/contributors.service';
import { SetContributorsToFileDto } from './contributors/dto/set-contributor-to-file.dto';
import { RemoveContributorFromFileDto } from './contributors/dto/remove-contributor-from-file.dto';

@UseGuards(JwtAuthGuard)
@ApiTags('Shared')
@Controller('shared')
export class SharedController {
  constructor(
    private readonly sharedService: SharedService,
    private readonly contributorsService: ContributorsService,
  ) {}

  @ApiOperation({ summary: 'Upload file' })
  @ApiCreatedResponse({
    type: [SharedFileEntity],
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files'))
  @Post()
  async uploadSharedFile(@UploadedFiles() files: Array<Express.Multer.File>, @Req() request: Request) {
    return await this.sharedService.createSharedFile(request.user.id, files);
  }

  @ApiOperation({ summary: 'Set contributors' })
  @ApiOkResponse({
    type: SharedFileEntity,
  })
  @Patch(':id/contributors')
  async setContributorsToFile(
    @Param('id') id: string,
    @Req() request: Request,
    @Body() setContributorsToFileDto: SetContributorsToFileDto,
  ) {
    return await this.contributorsService.setContributors(request.user.id, id, setContributorsToFileDto);
  }

  @ApiOperation({ summary: 'Add contributors' })
  @ApiCreatedResponse({
    type: SharedFileEntity,
  })
  @Post(':id/contributors')
  async addContributorsToFile(
    @Param('id') id: string,
    @Req() request: Request,
    @Body() addContributorToFileDto: AddContributorToFileDto,
  ) {
    return await this.contributorsService.addContributor(request.user.id, id, addContributorToFileDto);
  }

	@ApiOperation({ summary: 'Remove contributor' })
  @ApiCreatedResponse({
    type: SharedFileEntity,
  })
  @Post(':id/contributors/remove')
  async removeContributorFromFile(
    @Param('id') id: string,
    @Req() request: Request,
    @Body() removeContributorFromFileDto: RemoveContributorFromFileDto,
  ) {
    return await this.contributorsService.removeContributor(request.user.id, id, removeContributorFromFileDto);
  }

  @ApiOperation({ summary: 'Get shared files for current user' })
  @ApiOkResponse({
    type: [SharedFileEntity],
  })
  @Get()
  async getFiles(@Req() request: Request) {
    return await this.sharedService.getFiles(request.user.id);
  }

  @ApiOperation({ summary: 'Delete file' })
  @ApiOkResponse({
    type: SharedFileEntity,
  })
  @Delete(':id')
  async delete(@Param('id') id: string, @Req() request: Request) {
    return await this.sharedService.delete(request.user.id, id);
  }
}
