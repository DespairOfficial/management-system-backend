import { Injectable } from '@nestjs/common';
import { User, Project, Conversation } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class ConversationService {
  constructor(private readonly prismaService: PrismaService) {}

  async findByProjectId(projectId: string) {
    return await this.prismaService.conversation.findFirstOrThrow({
      where: {
        projectId,
      },
    });
  }

  async createWithUserId(userId: User['id'], contactId: User['id']) {

    const newConversation = await this.prismaService.conversation.create({
      data: {
        projectId: null,
        type: 'ONE_TO_ONE',
        participants: {
          createMany: {
            data: [{ userId }, { userId: contactId }],
          },
        },
        userOnUnseenConversation: {
          createMany: {
            data: [{ userId }, { userId: contactId }],
          },
        },
      },
    });
    return newConversation;
  }

  async createWithProjectId(userId: User['id'], projectId: Project['id']) {
    const newConversation = await this.prismaService.conversation.create({
      data: {
        projectId,
        type: 'GROUP',
        participants: {
          createMany: {
            data: {
              userId,
            },
          },
        },
        userOnUnseenConversation: {
          createMany: {
            data: [{ userId }],
          },
        },
      },
    });
    return newConversation;
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
        project: true,
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
        project: true,
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

  async addToConversation(conversationId: Conversation['id'], userId: User['id']) {
    return this.prismaService.userOnConversation.create({
      data: { conversationId, userId },
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
