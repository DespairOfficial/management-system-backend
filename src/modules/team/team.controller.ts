import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    UseGuards,
    Req,
    InternalServerErrorException,
    BadRequestException,
    Patch,
    ForbiddenException,
} from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';
import { NO_RIGHTS, REQUEST_WAS_SEND } from 'src/constants';
import { CreateRequestToJoinTeamDto } from './dto/create-request-to-join-team.dto';

@UseGuards(JwtAuthGuard)
@Controller('team')
@ApiTags('Team')
export class TeamController {
    constructor(private readonly teamService: TeamService) {}

    @ApiOperation({ summary: 'Create team' })
    @ApiResponse({
        status: 201,
        type: CreateTeamDto,
    })
    @Post()
    async create(@Body() createTeamDto: CreateTeamDto, @Req() request: Request) {
        try {
            return this.teamService.create(request.user.id, createTeamDto);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    @ApiOperation({ summary: 'Request to join team' })
    @ApiResponse({
        status: 200,
        schema: {
            example: { message: 'Request was send!' },
        },
    })
    @Get('requestToJoin/:teamId')
    async requestToJoinTeam(@Req() request: Request, @Param('teamId') teamId: string) {
        try {
            await this.teamService.requestToJoinTeam(request.user.id, +teamId);
            return { message: 'Request was send!' };
        } catch (error) {
            throw new BadRequestException(REQUEST_WAS_SEND);
        }
    }

    @ApiOperation({ summary: 'Accept request to join team' })
    @ApiResponse({
        status: 200,
        schema: {
            example: { message: 'Request was accepted!' },
        },
    })
    @Patch('acceptRequestToJoin')
    async acceptRequestToJoinMyTeam(
        @Req() request: Request,
        @Body() createRequestToJoinTeamDto: CreateRequestToJoinTeamDto,
    ) {
        try {
            const team = await this.teamService.findOne(createRequestToJoinTeamDto.teamId);
            if (team.userId !== request.user.id) {
                throw new ForbiddenException(NO_RIGHTS);
            }
            await this.teamService.acceptRequestToJoinMyTeam(createRequestToJoinTeamDto);
            return { message: 'Request was accepted!' };
        } catch (error) {
            throw error;
        }
    }
}
