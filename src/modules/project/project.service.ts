import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateRequestToJoinProjectDto } from './dto/create-request-to-join-project.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { PrismaService } from '../database/prisma.service';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class ProjectService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(userId: User['id'], createProjectDto: CreateProjectDto) {
    return await this.prismaService.project.create({
      data: { ...createProjectDto, userId },
    });
  }

  async findAll() {
    return await this.prismaService.project.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.project.findFirst({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    return await this.prismaService.project.update({
      data: updateProjectDto,
      where: {
        id,
      },
    });
  }

  async delete(id: number) {
    return await this.prismaService.project.delete({
      where: {
        id,
      },
    });
  }

  async requestToJoinProject(userId: User['id'], projectId: number) {
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
