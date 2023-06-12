import { KanbanColumn, User } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { ColumnsService } from '../columns/columns.service';

@Injectable()
export class CardService {
  constructor(private readonly prismaService: PrismaService, private readonly columnService: ColumnsService) {}
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

  findOne(id: number) {
    return `This action returns a #${id} card`;
  }

  update(id: number, updateCardDto: UpdateCardDto) {
    return `This action updates a #${id} card`;
  }

  remove(id: number) {
    return `This action removes a #${id} card`;
  }
}
