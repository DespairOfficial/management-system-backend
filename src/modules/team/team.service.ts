import { JoinTeamDto } from './dto/join-team.dto';
import { PrismaService } from './../database/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { CreateRequestToJoinTeamDto } from './dto/create-request-to-join-team.dto';

@Injectable()
export class TeamService {
    constructor(private prismaService: PrismaService) {}
    async create(userId: number, createTeamDto: CreateTeamDto) {
        return await this.prismaService.team.create({
            data: { ...createTeamDto, userId },
        });
    }

    async requestToJoinTeam(userId: number, teamId: number) {
        return await this.prismaService.requestToTeam.create({
            data: {
                teamId,
                userId,
            },
        });
    }

    async acceptRequestToJoinMyTeam(createRequestToJoinTeamDto: CreateRequestToJoinTeamDto) {
        await this.prismaService.requestToTeam.delete({
            where: {
                userId_teamId: {
                    userId: createRequestToJoinTeamDto.userId,
                    teamId: createRequestToJoinTeamDto.teamId,
                },
            },
        });
        await this.prismaService.userTeams.create({
            data: { teamId: createRequestToJoinTeamDto.teamId, userId: createRequestToJoinTeamDto.userId },
        });
    }

    findAll() {
        return `This action returns all team`;
    }

    async findOne(id: number) {
        return await this.prismaService.team.findFirst({ where: { id } });
    }

    update(id: number, updateTeamDto: UpdateTeamDto) {
        return `This action updates a #${id} team`;
    }

    remove(id: number) {
        return `This action removes a #${id} team`;
    }
}
