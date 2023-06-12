import { ConversationService } from './../chat/conversation/conversation.service';
import { existsSync } from 'fs';
import { FileService } from './../file/file.service';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateRequestToJoinProjectDto } from './dto/create-request-to-join-project.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { PrismaService } from '../database/prisma.service';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class ProjectService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly fileService: FileService,
    private readonly conversationService: ConversationService,
  ) {}
  async create(userId: User['id'], createProjectDto: CreateProjectDto, image: Express.Multer.File) {
    const filename = await this.fileService.updateMulterFile(image, 'projects');
    const project = await this.prismaService.project.create({
      data: { ...createProjectDto, userId, image: filename },
    });

    await this.conversationService.createWithProjectId(userId, project.id);

    return project;
  }

  async findAll() {
    return await this.prismaService.project.findMany();
  }

  async findAllMy(userId: User['id']) {
    return await this.prismaService.project.findMany({
      where: {
        userId,
      },
    });
  }

  async findOne(id: string) {
    return await this.prismaService.project.findFirst({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateProjectDto: UpdateProjectDto, image: Express.Multer.File) {
    const projectBeforeUpdate = await this.prismaService.user.findFirstOrThrow({
      where: { id },
    });

    const filename = await this.fileService.updateMulterFile(image, 'projects', projectBeforeUpdate.image);
    return await this.prismaService.project.update({
      data: { ...updateProjectDto, image: filename },
      where: {
        id,
      },
    });
  }

  async delete(id: string) {
    const project = await this.prismaService.project.findUniqueOrThrow({
      where: {
        id,
      },
    });

    if (project.image && existsSync(project.image)) {
      this.fileService.deleteFile(project.image);
    }
    return await this.prismaService.project.delete({
      where: {
        id,
      },
    });
  }

  async requestToJoinProject(userId: User['id'], projectId: string) {
    return await this.prismaService.requestToProject.create({
      data: {
        userId,
        projectId,
      },
    });
  }
  async acceptRequestToJoinMyProject(createRequestToJoinProjectDto: CreateRequestToJoinProjectDto) {
    await this.prismaService.requestToProject.delete({
      where: {
        userId_projectId: {
          userId: createRequestToJoinProjectDto.userId,
          projectId: createRequestToJoinProjectDto.projectId,
        },
      },
    });
    await this.prismaService.userOnProject.create({
      data: { projectId: createRequestToJoinProjectDto.projectId, userId: createRequestToJoinProjectDto.userId },
    });
  }
}
