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
                usersOnConversation: {
                    some: {
                        userId,
                    },
                },
            },
            include: {
                messages: true,
                usersOnConversation: true,
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
                usersOnConversation: {
                    some: {
                        userId,
                    },
                },
            },
        });
    }
}
