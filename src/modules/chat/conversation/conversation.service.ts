import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class ConversationService {
  constructor(private prismaService: PrismaService) {}

  async findByProjectId(projectId: number) {
    return await this.prismaService.conversation.findFirstOrThrow({
      where: {
        projectId,
      },
    });
  }

  async findWhereUser(userId: number) {
    return await this.prismaService.conversation.findMany({
      where: {
        participants: {
          some: {
            userId,
          },
        },
      },
      include: {
        messages: true,
        participants: true,
      },
    });
  }

  async findById(id: number) {
    return await this.prismaService.conversation.findFirstOrThrow({
      where: {
        id,
      },
      include: {
        messages: true,
        participants: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  async getParticipants(id: number) {
    return await this.prismaService.user.findMany({
      where: {
        conversations: {
          some: {
            conversationId: id,
          },
        },
      },
    });
  }

  async getUserOnConversation(userId: number) {
    return this.prismaService.userOnConversation.findMany({
      where: {
        userId,
      },
    });
  }

  async findByUser(userId: number) {
    return this.prismaService.conversation.findMany({
      where: {
        participants: {
          some: {
            userId,
          },
        },
      },
    });
  }
}
