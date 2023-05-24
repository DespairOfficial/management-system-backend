import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessageService {
    constructor(private prismaService: PrismaService) {}
    // получение всех сообщений
    async findAll() {
        return this.prismaService.message.findMany();
    }

    // удаление всех сообщений - для отладки в процессе разработки
    async clear() {
        return this.prismaService.message.deleteMany();
    }

    // создание сообщения
    async create(userId: number, createMessageDto: CreateMessageDto) {
        return this.prismaService.message.create({
            data: {
                userId,
                ...createMessageDto,
            },
        });
    }

    // обновление сообщения
    async updateMessage(id: number, createMessageDto: CreateMessageDto) {
        return this.prismaService.message.update({ where: { id }, data: createMessageDto });
    }

    // удаление сообщения
    async removeMessage(id: number) {
        return this.prismaService.message.delete({ where: { id } });
    }
}
