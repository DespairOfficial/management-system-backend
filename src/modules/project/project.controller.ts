import { Project } from '@prisma/client';
import { UserEntity } from './../users/entities/user.entity';
import { CreateRequestToJoinProjectDto } from './dto/create-request-to-join-project.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectEntity } from './entities/project.entity';
import { NO_RIGHTS, REQUEST_WAS_SEND } from '../../constants';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  ForbiddenException,
  UseGuards,
  InternalServerErrorException,
  BadRequestException,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Project')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create project' })
  @ApiCreatedResponse({
    type: ProjectEntity,
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @Post()
  async create(
    @Body() createProjectDto: CreateProjectDto,
    @Req() request: Request,
    @UploadedFile() image: Express.Multer.File,
  ) {
    try {
      return await this.projectService.create(request.user.id, createProjectDto, image);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update project' })
  @ApiOkResponse({
    type: ProjectEntity,
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @Req() request: Request,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const candidate = await this.projectService.findOne(id);
    if (request.user.id !== candidate.userId) {
      throw new ForbiddenException('You have no rights to do that!');
    }
    try {
      return await this.projectService.update(id, updateProjectDto, image);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete Project' })
  @ApiOkResponse({
    type: ProjectEntity,
  })
  @Delete(':id')
  async delete(@Param('id') id: string, @Req() request: Request) {
    try {
      const candidate = await this.projectService.findOne(id);
      if (request.user.id !== candidate.userId) {
        throw new ForbiddenException('You have no rights to do that!');
      }
      return await this.projectService.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get users to invite' })
  @ApiOkResponse({
    type: [UserEntity],
  })
  @Get('notInvitedUsers/:projectId')
  async getNotInvitedUsers(@Param('projectId') projectId: Project['id'], @Req() request: Request) {
    try {
			const project = await this.projectService.findOne(projectId)
			if(project.userId !== request.user.id){
				throw new ForbiddenException('You have no rights to do that!');
			}
      return await this.projectService.findUsersToInvite(projectId, request.user.id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all my projects' })
  @ApiOkResponse({
    type: [ProjectEntity],
  })
  @Get('my')
  async getMy(@Req() request: Request) {
    try {
      return await this.projectService.findAllMy(request.user.id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

	@UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get projects where user is participant' })
  @ApiOkResponse({
    type: [ProjectEntity],
  })
  @Get()
  async getWhereParticipant(@Req() request: Request) {
    try {
      return await this.projectService.findWhereParticipant(request.user.id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all invitations to me' })
  @ApiOkResponse({
    type: [ProjectEntity],
  })
  @Get('invitation')
  async getAllInvitations(@Req() request: Request) {
    try {
      return await this.projectService.findAllInvitationsToMe(request.user.id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @ApiOperation({ summary: 'Invitation to join project' })
  @ApiOkResponse({
    schema: {
      example: { message: 'Invitation was send!' },
    },
  })
  @UseGuards(JwtAuthGuard)
  @Post('invitation')
  async invitationToJoinTeam(
    @Req() request: Request,
    @Body() createRequestToJoinProjectDto: CreateRequestToJoinProjectDto,
  ) {
    const project = await this.projectService.findOne(createRequestToJoinProjectDto.projectId);
    if (project.userId !== request.user.id) {
      throw new ForbiddenException(NO_RIGHTS);
    }
    try {
      return await this.projectService.requestToJoinProject(createRequestToJoinProjectDto);
    } catch (error) {
      throw new BadRequestException(REQUEST_WAS_SEND);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Accept request to join project' })
  @ApiOkResponse({
    schema: {
      example: { message: 'Request was accepted!' },
    },
  })
  @Patch('join/:projectId')
  async acceptRequestToJoin(@Req() request: Request, @Param('projectId') projectId: string) {
    try {
      await this.projectService.acceptRequest(projectId, request.user.id);
      return { message: 'Request was accepted!' };
    } catch (error) {
      throw error;
    }
  }
}
