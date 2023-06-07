import { UPLOADS_PATH } from './../../config/paths';
import { PrismaService } from 'src/modules/database/prisma.service';
import { Injectable, ForbiddenException, Delete } from '@nestjs/common';
import { SharedFile, User } from '@prisma/client';
import { existsSync } from 'fs';
import { resolve, join, basename, extname } from 'path';
import { mkdir, writeFile, rm } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import { FORBIDDEN } from '../../config/constants';

@Injectable()
export class SharedService {
  constructor(private readonly prismaService: PrismaService) {}

  async createSharedFile(userId: User['id'], files: Array<Express.Multer.File>) {
    const targetUserFolder = resolve(UPLOADS_PATH, 'shared', userId);
    // const sharedFiles: CreateSharedFileDto[] = [];

    if (!existsSync(targetUserFolder)) {
      await mkdir(targetUserFolder);
    }
    return await Promise.all(
      files.map((file) => {
        const fileRelativePath = uuidv4() + '-' + file.originalname;
        const newFile = {
          dateCreated: new Date(),
          dateModified: new Date(),
          name: basename(file.originalname),
          type: extname(file.originalname),
          size: file.size,
          url: join('shared', userId, fileRelativePath),
          userId,
        };
        const fileAbsPath = resolve(targetUserFolder, fileRelativePath);
        writeFile(fileAbsPath, file.buffer);

        return this.prismaService.sharedFile.create({
          data: newFile,
        });
      }),
    );
  }

  async getFiles(userId: User['id']) {
    const files = await this.prismaService.sharedFile.findMany({
      where: {
        OR: [
          {
            userId,
          },
          {
            contributors: {
              some: {
                userId,
              },
            },
          },
        ],
      },
      include: {
        tags: true,
        contributors: {
          include: {
            user: true,
          },
        },
      },
      distinct: 'id',
    });

    return files.map((file) => {
      return {
        ...file,
        contributors: file.contributors.map((contributor) => {
          return {
            id: contributor.user.id,
            name: contributor.user.name,
            email: contributor.user.email,
            avatar: contributor.user.image,
            permission: contributor.permission,
          };
        }),
        tags: file.tags.map((tag) => {
          return tag.tagName;
        }),
      };
    });
  }

  async delete(userId: User['id'], fileId: SharedFile['id']) {
    const file = await this.prismaService.sharedFile.findUniqueOrThrow({
      where: {
        id: fileId,
      },
    });
    if (file.userId !== userId) {
      throw new ForbiddenException(FORBIDDEN);
    }

    const pathToFile = resolve(UPLOADS_PATH, file.url);
    try {
      if (existsSync(pathToFile)) {
        await rm(pathToFile);
      }
    } catch (error) {
      throw error;
    }

    return await this.prismaService.sharedFile.delete({
      where: {
        id: fileId,
      },
    });
  }
}
