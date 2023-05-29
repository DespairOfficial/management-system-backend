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
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('Project')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create project' })
  @ApiCreatedResponse({
    type: ProjectEntity,
  })
  @Post()
  async create(@Body() createProjectDto: CreateProjectDto, @Req() request: Request) {
    try {
      return await this.projectService.create(+request.user.id, createProjectDto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update project' })
  @ApiOkResponse({
    type: ProjectEntity,
  })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto, @Req() request: Request) {
    const candidate = await this.projectService.findOne(+id);
    if (request.user.id !== candidate.userId) {
      throw new ForbiddenException('You have no rights to do that!');
    }
    try {
      return await this.projectService.update(+id, updateProjectDto);
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
      const candidate = await this.projectService.findOne(+id);
      if (request.user.id !== candidate.userId) {
        throw new ForbiddenException('You have no rights to do that!');
      }
      return await this.projectService.delete(+id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @ApiOperation({ summary: 'Get all projects' })
  @ApiOkResponse({
    type: [ProjectEntity],
  })
  @Get()
  async getAll(@Req() request: Request) {
    try {
      return await this.projectService.findAll();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @ApiOperation({ summary: 'Request to join project' })
  @ApiOkResponse({
    schema: {
      example: { message: 'Request was send!' },
    },
  })
  @UseGuards(JwtAuthGuard)
  @Get('requestToJoin/:projectId')
  async requestToJoinTeam(@Req() request: Request, @Param('projectId') projectId: string) {
    try {
      return await this.projectService.requestToJoinProject(+request.user.id, +projectId);
    } catch (error) {
      throw new BadRequestException(REQUEST_WAS_SEND);
    }
  }

  @ApiOperation({ summary: 'Accept request to join project' })
  @ApiOkResponse({
    schema: {
      example: { message: 'Request was accepted!' },
    },
  })
  @Patch('acceptRequestToJoin')
  async acceptRequestToJoinMyTeam(
    @Req() request: Request,
    @Body() createRequestToJoinProjectDto: CreateRequestToJoinProjectDto,
  ) {
    try {
      const project = await this.projectService.findOne(createRequestToJoinProjectDto.projectId);
      if (project.userId !== request.user.id) {
        throw new ForbiddenException(NO_RIGHTS);
      }
      await this.projectService.acceptRequestToJoinMyProject(createRequestToJoinProjectDto);
      return { message: 'Request was accepted!' };
    } catch (error) {
      throw error;
    }
  }
}
