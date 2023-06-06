import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { SharedService } from './shared.service';
import { Body, Controller, Get, Param, Patch, Post, Req, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiConsumes, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SharedFileEntity } from './entity/shared-file.entity';
import { Request } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';
import { SetContributorsToFileDto } from './tags/dto/set-contributor-to-file.dto';
import { AddContributorToFileDto } from './tags/dto/add-contributor-to-file.dto';

@UseGuards(JwtAuthGuard)
@ApiTags('Shared')
@Controller('shared')
export class SharedController {
  constructor(private readonly sharedService: SharedService) {}

  @ApiOperation({ summary: 'Upload file' })
  @ApiOkResponse({
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
    return await this.sharedService.setContributors(request.user.id, id, setContributorsToFileDto);
  }

	@ApiOperation({ summary: 'Set contributors' })
  @ApiOkResponse({
    type: SharedFileEntity,
  })
  @Post(':id/contributors')
  async addContributorsToFile(
    @Param('id') id: string,
    @Req() request: Request,
    @Body() addContributorToFileDto: AddContributorToFileDto,
  ) {
    return await this.sharedService.addContributor(request.user.id, id, addContributorToFileDto);
  }

  @ApiOperation({ summary: 'Get shared files for current user' })
  @ApiOkResponse({
    type: [SharedFileEntity],
  })
  @Get()
  async getFiles(@Req() request: Request) {
    return await this.sharedService.getFilesCreatedByUser(request.user.id);
  }
}
