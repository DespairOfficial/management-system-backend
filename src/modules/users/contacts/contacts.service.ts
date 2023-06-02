import { PrismaService } from 'src/modules/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class ContactsService {
  constructor(private prismaService: PrismaService) {}

  async findMany(userId: User['id']) {
    return await this.prismaService.contacts.findMany({
      where: {
        userId: {
          equals: userId,
        },
      },
    });
  }
}
