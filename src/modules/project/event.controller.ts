import { CreateRequestToJoinEventDto } from './dto/create-request-to-join-project.dto';
import { NO_RIGHTS, REQUEST_WAS_SEND } from './../../constants';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { EventEntity } from './entities/project.entity';
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
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-project.dto';
import { UpdateEventDto } from './dto/update-project.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('Events')
@Controller('events')
export class EventController {
    constructor(private readonly eventService: EventService) {}

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Create event' })
    @ApiCreatedResponse({
        type: EventEntity,
    })
    @Post()
    async create(@Body() createEventDto: CreateEventDto, @Req() request: Request) {
        try {
            return await this.eventService.create(request.user.id, createEventDto);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Update event' })
    @ApiOkResponse({
        type: EventEntity,
    })
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto, @Req() request: Request) {
        const candidate = await this.eventService.findOne(+id);
        if (request.user.id !== candidate.userId) {
            throw new ForbiddenException('You have no rights to do that!');
        }
        try {
            return await this.eventService.update(+id, updateEventDto);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Delete event' })
    @ApiOkResponse({
        type: EventEntity,
    })
    @Delete(':id')
    async delete(@Param('id') id: string, @Req() request: Request) {
        try {
            const candidate = await this.eventService.findOne(+id);
            if (request.user.id !== candidate.userId) {
                throw new ForbiddenException('You have no rights to do that!');
            }
            return await this.eventService.delete(+id);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    @ApiOperation({ summary: 'Get all events' })
    @ApiOkResponse({
        type: [EventEntity],
    })
    @Get()
    async getAll(@Req() request: Request) {
        try {
            return await this.eventService.findAll();
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    @ApiOperation({ summary: 'Request to join event' })
    @ApiOkResponse({
        schema: {
            example: { message: 'Request was send!' },
        },
    })
    @UseGuards(JwtAuthGuard)
    @Get('requestToJoin/:eventId')
    async requestToJoinTeam(@Req() request: Request, @Param('eventId') eventId: string) {
        try {
            return await this.eventService.requestToJoinEvent(request.user.id, +eventId);
        } catch (error) {
            throw new BadRequestException(REQUEST_WAS_SEND);
        }
    }

    @ApiOperation({ summary: 'Accept request to join event' })
    @ApiOkResponse({
        schema: {
            example: { message: 'Request was accepted!' },
        },
    })
    @Patch('acceptRequestToJoin')
    async acceptRequestToJoinMyTeam(
        @Req() request: Request,
        @Body() createRequestToJoinEventDto: CreateRequestToJoinEventDto,
    ) {
        try {
            const event = await this.eventService.findOne(createRequestToJoinEventDto.eventId);
            if (event.userId !== request.user.id) {
                throw new ForbiddenException(NO_RIGHTS);
            }
            await this.eventService.acceptRequestToJoinMyEvent(createRequestToJoinEventDto);
            return { message: 'Request was accepted!' };
        } catch (error) {
            throw error;
        }
    }
}
