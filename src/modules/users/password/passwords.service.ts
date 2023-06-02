import { PrismaService } from 'src/modules/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { Password, User } from '@prisma/client';

@Injectable()
export class PasswordsService {
  constructor(private prismaService: PrismaService) {}
  async create(userId: User['id'], password: string): Promise<Password> {
    const passwordObject = await this.prismaService.password.create({
      data: {
        userId: userId,
        password: password,
      },
    });
    return passwordObject;
  }

  async findOneByUserId(userId: User['id']): Promise<Password> {
    return await this.prismaService.password.findUnique({
      where: {
        userId: userId,
      },
    });
  }
}
