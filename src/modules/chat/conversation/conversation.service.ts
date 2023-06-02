import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
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

  async findWhereUser(userId: User['id']) {
    const conversations = await this.prismaService.conversation.findMany({
      where: {
        participants: {
          some: {
            userId,
          },
        },
      },
      include: {
        messages: {
          include: {
            attachments: true,
          },
        },
        participants: {
          select: {
            user: true,
          },
        },
      },
    });
    return conversations.map((item) => {
      const participants = item.participants.map((participant) => {
        return participant.user;
      });
      return { ...item, participants };
    });
  }

  async findById(id: number) {
    const conversation = await this.prismaService.conversation.findFirstOrThrow({
      where: {
        id,
      },
      include: {
        messages: {
          include: {
            attachments: true,
          },
        },
        participants: {
          select: {
            user: true,
          },
        },
      },
    });
    const participants = conversation.participants.map((item) => item.user);
    return { ...conversation, participants };
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

  async getUserOnConversation(userId: User['id']) {
    return this.prismaService.userOnConversation.findMany({
      where: {
        userId,
      },
    });
  }

  async findByUser(userId: User['id']) {
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

  async markAsSeen(userId: User['id'], conversationId: number) {
    const candidate = await this.prismaService.userOnUnseenConversation.findFirst({
      where: {
        conversationId,
        userId,
      },
    });

    if (candidate) {
      return this.prismaService.userOnUnseenConversation.delete({
        where: {
          conversationId_userId: {
            conversationId,
            userId,
          },
        },
      });
    }
  }
}
