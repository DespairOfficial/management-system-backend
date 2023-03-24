import { CreateRequestToJoinProjectDto } from './dto/create-request-to-join-project.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { PrismaService } from './../database/prisma.service';
import { Injectable } from '@nestjs/common';
import { UpdateEventDto } from './dto/update-project.dto';

@Injectable()
export class EventService {
    constructor(private readonly prismaService: PrismaService) {}
    async create(userId: number, createProjectDto: CreateProjectDto) {
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

    async update(id: number, updateEventDto: UpdateEventDto) {
        return await this.prismaService.project.update({
            data: updateEventDto,
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

    async requestToJoinEvent(userId: number, projectId: number) {
        return await this.prismaService.requestToProject.create({
            data: {
                userId,
                projectId,
            },
        });
    }
    async acceptRequestToJoinMyEvent(createRequestToJoinProjectDto: CreateRequestToJoinProjectDto) {
        await this.prismaService.requestToProject.delete({
            where: {
                userId_projectId: {
                    userId: createRequestToJoinProjectDto.userId,
                    projectId: createRequestToJoinProjectDto.projectId,
                },
            },
        });
        await this.prismaService.userProjects.create({
            data: { projectId: createRequestToJoinProjectDto.projectId, userId: createRequestToJoinProjectDto.userId },
        });
    }
}
