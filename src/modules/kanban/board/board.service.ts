import { PrismaService } from './../../database/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { KanbanBoard } from '@prisma/client';

@Injectable()
export class BoardService {
  constructor(private readonly prismaService: PrismaService) {}
  private readonly boardRepository = this.prismaService.kanbanBoard;
  create(createBoardDto: CreateBoardDto) {
    return 'This action adds a new board';
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
            assignees: true,
            comments: true,
          },
        },
      },
    });

    const { columnOrder, columns, ...rest } = board;
    const newColumnOrder = board.columns.map((column) => {
      return column.id;
    });
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
        assignee: assignees.map((user) => user.assigneeId),
      };
    });
    return { ...rest, columnOrder: newColumnOrder, columns: newColumns, cards: newCards };
  }

  update(id: string, updateBoardDto: UpdateBoardDto) {
    return `This action updates a #${id} board`;
  }

  remove(id: string) {
    return `This action removes a #${id} board`;
  }
}
