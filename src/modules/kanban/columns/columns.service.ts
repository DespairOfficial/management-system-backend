import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';

@Injectable()
export class ColumnsService {
  constructor(private readonly prismaService: PrismaService) {}
  private readonly columnsRepository = this.prismaService.kanbanColumn;

  async create(createColumnDto: CreateColumnDto) {
    const column = await this.columnsRepository.create({
      data: {
        name: createColumnDto.name,
        boardId: createColumnDto.boardId,
      },
    });
    return { ...column, cardIds: [] };
  }

  findAll() {
    return `This action returns all columns`;
  }

  async findOne(id: string) {
    const { cards, ...rest } = await this.columnsRepository.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        cards: true,
      },
    });
    const cardIds = cards.map((card) => {
      return card.cardId;
    });

    return { ...rest, cardIds };
  }

  async update(id: string, updateColumnDto: UpdateColumnDto) {
    return await this.columnsRepository.update({
      data: {
        name: updateColumnDto.name,
        cards: {
          deleteMany: { columnId: id },
          createMany: {
            data: updateColumnDto.cardIds.map((item) => ({
              cardId: item,
            })),
          },
        },
      },
      where: {
        id,
      },
    });
  }

  async delete(id: string) {
    return await this.columnsRepository.delete({
      where: {
        id,
      },
    });
  }
}
