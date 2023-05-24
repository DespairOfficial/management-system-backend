import { ConversationService } from './conversation.service';
import { ConversationEntity } from './entity/conversation.entity';
import { Controller, Get, Param, ParseIntPipe, Req } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('Conversation')
@Controller('conversation')
export class ConversationController {
    constructor(private readonly conversationService: ConversationService) {}
    @ApiOperation({ summary: 'Get by project id' })
    @ApiOkResponse({
        type: ConversationEntity,
    })
    @Get('byProjectId/:projectId')
    async getByProjectId(@Param('projectId', ParseIntPipe) projectId: number) {
        return await this.conversationService.findByProjectId(projectId);
    }

    @ApiOperation({ summary: 'Get for current user' })
    @ApiOkResponse({
        type: ConversationEntity,
    })
    @Get()
    async getForCurrentUser(@Req() request: Request) {
        return await this.conversationService.findWhereUser(request.user.id);
    }
}
