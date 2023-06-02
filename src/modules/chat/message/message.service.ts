import { AttachmentEntity } from './attachment/entity/attachment.entity';
import { FileService } from './../../file/file.service';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { User } from '@prisma/client';

@Injectable()
export class MessageService {
  constructor(private prismaService: PrismaService, private readonly fileService: FileService) {}
  // получение всех сообщений
  async findAll() {
    return this.prismaService.message.findMany();
  }

  // удаление всех сообщений - для отладки в процессе разработки
  async clear() {
    return this.prismaService.message.deleteMany();
  }

  // создание сообщения
  async create(userId: User['id'], createMessageDto: CreateMessageDto) {
    const { attachments, ...createDto } = createMessageDto;

    const attachmentObjects: Pick<AttachmentEntity, 'name' | 'type' | 'size' | 'path'>[] = [];

    if (attachments && attachments.length > 0) {
      await Promise.all(
        attachments.map(async (attachment) => {
          const path = await this.fileService.updateBufferFile(attachment.file, attachment.name, 'attachments');
          attachmentObjects.push({
            name: attachment.name,
            type: attachment.type,
            size: attachment.size,
            path: path,
          });
        }),
      );
    }

    return this.prismaService.message.create({
      data: {
        senderId: userId,
        ...createDto,
        attachments: {
          createMany: {
            data: attachmentObjects,
          },
        },
      },
      include: {
        attachments: true,
      },
    });
  }

  // обновление сообщения
  // async updateMessage(id: number, createMessageDto: CreateMessageDto) {
  //   return this.prismaService.message.update({ where: { id }, data: createMessageDto });
  // }

  // удаление сообщения
  async removeMessage(id: number) {
    return this.prismaService.message.delete({ where: { id } });
  }
}
