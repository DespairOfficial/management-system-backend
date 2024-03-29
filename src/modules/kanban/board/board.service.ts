import { PrismaService } from './../../database/prisma.service';
import { Injectable } from '@nestjs/common';
import { UpdateBoardDto } from './dto/update-board.dto';
import { KanbanBoard, Project } from '@prisma/client';
import { NewColumnOrderDto } from './dto/new-columns-order.dto';

@Injectable()
export class BoardService {
  constructor(private readonly prismaService: PrismaService) {}
  private readonly boardRepository = this.prismaService.kanbanBoard;
  async create(projectId: Project['id']) {
    return await this.boardRepository.create({
      data: {
        projectId,
      },
    });
  }

  async findAll() {
    return await this.boardRepository.findMany();
  }

  async findOne(id: KanbanBoard['id']) {
    const board = await this.boardRepository.findFirstOrThrow({
      where: {
        id,
      },
      include: {
        columns: {
          include: {
            cards: true,
          },
        },
        cards: {
          include: {
            assignees: {
              include: {
                assignees: true,
              },
            },
            comments: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });

    const { columnOrder, columns, ...rest } = board;
    const newColumns = columns.map((col) => {
      const cardIds = col.cards.map((card) => card.cardId);
      const { cards, ...rest } = col;
      return {
        ...rest,
        cardIds,
      };
    });
    const newCards = board.cards.map((card) => {
      const { assignees, ...rest } = card;
      return {
        ...rest,
        assignee: assignees.map((assignee) => {
          return assignee.assignees;
        }),
      };
    });
    return { ...rest, columnOrder, columns: newColumns, cards: newCards };
  }

  async setNewOrder(id: string, newColumnOrderDto: NewColumnOrderDto) {
    return await this.boardRepository.update({
      where: {
        id,
      },
      data: {
        columnOrder: newColumnOrderDto.newColumnOrder,
      },
    });
  }

  remove(id: string) {
    return `This action removes a #${id} board`;
  }
}
