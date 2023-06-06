import { SetContributorsToFileDto } from './tags/dto/set-contributor-to-file.dto';
import { UPLOADS_PATH } from './../../config/paths';
import { CreateSharedFileDto } from './dto/create-shared-file.dto';
import { PrismaService } from 'src/modules/database/prisma.service';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { SharedFile, User } from '@prisma/client';
import { existsSync } from 'fs';
import { resolve, join, basename, extname } from 'path';
import { mkdir, writeFile } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import { FORBIDDEN } from '../../config/constants';
import { AddContributorToFileDto } from './tags/dto/add-contributor-to-file.dto';

@Injectable()
export class SharedService {
  constructor(private readonly prismaService: PrismaService) {}

  async createSharedFile(userId: User['id'], files: Array<Express.Multer.File>) {
    const targetUserFolder = resolve(UPLOADS_PATH, 'shared', userId);
    const sharedFiles: CreateSharedFileDto[] = [];

    if (!existsSync(targetUserFolder)) {
      await mkdir(targetUserFolder);
    }
    files.forEach((file) => {
      const fileRelativePath = uuidv4() + '-' + file.originalname;
      sharedFiles.push({
        dateCreated: new Date(),
        dateModified: new Date(),
        name: basename(file.originalname),
        type: extname(file.originalname),
        size: file.size,
        url: join('shared', userId, fileRelativePath),
        userId,
      });
      const fileAbsPath = resolve(targetUserFolder, fileRelativePath);
      writeFile(fileAbsPath, file.buffer);
    });

    console.log(sharedFiles);

    await this.prismaService.sharedFile.createMany({
      data: sharedFiles,
    });
  }

  async getFilesCreatedByUser(userId: User['id']) {
    const files = await this.prismaService.sharedFile.findMany({
      where: {
        userId,
      },
      include: {
        tags: true,
      },
    });

    return files.map((file) => {
      return {
        ...file,
        tags: file.tags.map((tag) => {
          return tag.tagName;
        }),
      };
    });
  }

  async setContributors(
    userId: User['id'],
    fileId: SharedFile['id'],
    setContributorsToFileDto: SetContributorsToFileDto,
  ) {
    const file = await this.prismaService.sharedFile.findUniqueOrThrow({
      where: {
        id: fileId,
      },
    });
    if (file.userId !== userId) {
      throw new ForbiddenException(FORBIDDEN);
    }
    await this.prismaService.fileContributors.deleteMany({
      where: {
        fileId,
      },
    });
    const contributorObjects = setContributorsToFileDto.contributorIds
      ? setContributorsToFileDto.contributorIds.map((contributorId) => {
          return {
            fileId,
            userId: contributorId,
          };
        })
      : [];

    await this.prismaService.fileContributors.createMany({
      data: contributorObjects,
    });
  }

  async addContributor(userId: User['id'], fileId: SharedFile['id'], addContributorToFileDto: AddContributorToFileDto) {
    const file = await this.prismaService.sharedFile.findUniqueOrThrow({
      where: {
        id: fileId,
      },
    });
    if (file.userId !== userId) {
      throw new ForbiddenException(FORBIDDEN);
    }
    const contributor = await this.prismaService.user.findUniqueOrThrow({
      where: {
        email: addContributorToFileDto.contributorEmail,
      },
    });

    await this.prismaService.fileContributors.create({
      data: {
        fileId,
        userId: contributor.id,
      },
    });
  }
}
