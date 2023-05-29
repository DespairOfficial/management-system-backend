import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { ConversationService } from './conversation.service';
import { ConversationEntity } from './entity/conversation.entity';
import { Controller, Get, Param, ParseIntPipe, Req, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@UseGuards(JwtAuthGuard)
@ApiTags('Conversation')
@Controller('chat/conversation')
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

  @ApiOperation({ summary: 'Get participants by key' })
  @ApiOkResponse({
    type: ConversationEntity,
  })
  @Get('participants/:conversationKey')
  async getParticipantsByKey(@Param('conversationKey') conversationKey: string) {
    const id = conversationKey.split('_')[1];
    return await this.conversationService.getParticipants(+id);
  }
	
	@ApiOperation({ summary: 'Get by conversation key' })
  @ApiOkResponse({
    type: ConversationEntity,
  })
  @Get(':conversationKey')
  async getByConversationKey(@Param('conversationKey') conversationKey: string) {
    console.log(conversationKey);

    const id = conversationKey.split('_')[1];
    return await this.conversationService.findById(+id);
  }

  @ApiOperation({ summary: 'Get for current user' })
  @ApiOkResponse({
    type: ConversationEntity,
  })
  @Get()
  async getForCurrentUser(@Req() request: Request) {
    return await this.conversationService.findWhereUser(+request.user.id);
  }

 
}
