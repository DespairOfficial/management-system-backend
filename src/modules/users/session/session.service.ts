import { Injectable } from '@nestjs/common';
import { Session, User } from '@prisma/client';
import { PrismaService } from 'src/modules/database/prisma.service';
import { Token } from 'src/interfaces/Token.interface';
import { CreateSessionDto } from '../dto/session/create-session.dto';

@Injectable()
export class SessionService {
  constructor(private prismaService: PrismaService) {}

  async findOneByRefreshToken(refreshToken: Token): Promise<Session> {
    const result = await this.prismaService.session.findFirst({
      where: {
        refreshToken: refreshToken,
      },
    });
    return result;
  }

  async findOneByFingerprint(fingerprint: string): Promise<Session> {
    const result = await this.prismaService.session.findFirst({
      where: {
        fingerprint: fingerprint,
      },
    });
    return result;
  }

  async deleteSessionByFingerPrint(fingerprint: string): Promise<Session> {
    const result = await this.prismaService.session.delete({
      where: {
        fingerprint: fingerprint,
      },
    });
    return result;
  }

  async deleteSessionByRefreshToken(refreshToken: Token): Promise<Session> {
    const result = await this.prismaService.session.delete({
      where: {
        refreshToken: refreshToken,
      },
    });
    return result;
  }

  async create(userId: User['id'], createSessionDto: CreateSessionDto): Promise<Session> {
    const result = await this.prismaService.session.create({
      data: {
        userId,
        ...createSessionDto,
      },
    });
    return result;
  }

  async upsertSessionByFingerPrint(userId: User['id'], createSessionDto: CreateSessionDto): Promise<Session> {
    const result = await this.prismaService.session.upsert({
      where: {
        fingerprint: createSessionDto.fingerprint,
      },
      update: {
        refreshToken: createSessionDto.refreshToken,
        expiresAt: createSessionDto.expiresAt,
      },
      create: {
        userId,
        ...createSessionDto,
      },
    });
    return result;
  }
}
