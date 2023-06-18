import { normalize } from 'path';
import { FileService } from './../../file/file.service';
import { KanbanColumn, User } from '@prisma/client';
import { Injectable, Delete } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { ColumnsService } from '../columns/columns.service';

@Injectable()
export class CardService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly columnService: ColumnsService,
    private readonly fileService: FileService,
  ) {}
  private readonly cardRepository = this.prismaService.kanbanCard;
  async create(columnId: KanbanColumn['id'], createCardDto: CreateCardDto) {
    const column = await this.columnService.findOne(columnId);

    const { assignee, ...createDto } = createCardDto;
    const assigneesObjects = assignee
      ? assignee.map((item) => {
          return {
            assigneeId: item,
          };
        })
      : [];

    const card = await this.cardRepository.create({
      data: {
        ...createDto,
        boardId: column.boardId,
        assignees: {
          createMany: {
            data: assigneesObjects,
            skipDuplicates: true,
          },
        },
        column: {
          create: {
            columnId,
          },
        },
      },
    });
    return card;
  }

  findAll() {
    return `This action returns all card`;
  }

  async findOne(id: string) {
    return await this.cardRepository.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateCardDto: UpdateCardDto, attachments?: Express.Multer.File[]) {
    const card = await this.findOne(id);
    const { assignee, columnId, ...createDto } = updateCardDto;

    const filenames = await this.fileService.updateMultipleMulterFiles(
      card.attachments,
      updateCardDto.attachments,
      'kanban/attachments',
      attachments,
    );

    const assigneesObjects = assignee
      ? assignee.map((item) => {
          return {
            assigneeId: item,
          };
        })
      : [];

    return await this.cardRepository.update({
      where: {
        id,
      },
      data: {
        ...createDto,
        attachments: filenames,
        assignees: {
          deleteMany: {},
          createMany: {
            data: assigneesObjects,
            skipDuplicates: true,
          },
        },
        column: {
          update: {
            data: {
              columnId,
            },
            where: {
              cardId_columnId: {
                cardId: id,
                columnId,
              },
            },
          },
        },
      },
    });
  }

  async delete(id: string) {
    return await this.cardRepository.delete({
      where: {
        id,
      },
    });
  }
}
