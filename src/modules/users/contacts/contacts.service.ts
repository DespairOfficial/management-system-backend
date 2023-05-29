import { PrismaService } from 'src/modules/database/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ContactsService {
  constructor(private prismaService: PrismaService) {}

  async findMany(userId: number) {
    return await this.prismaService.contacts.findMany({
      where: {
        userId: {
          equals: userId,
        },
      },
    });
  }
}
