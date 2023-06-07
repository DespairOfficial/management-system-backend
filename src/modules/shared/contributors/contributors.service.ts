import { ForbiddenException, Injectable } from '@nestjs/common';
import { SharedFile, User } from '@prisma/client';
import { FORBIDDEN } from '../../../config/constants';
import { PrismaService } from '../../database/prisma.service';
import { AddContributorToFileDto } from './dto/add-contributor-to-file.dto';
import { RemoveContributorFromFileDto } from './dto/remove-contributor-from-file.dto';
import { SetContributorsToFileDto } from './dto/set-contributor-to-file.dto';

@Injectable()
export class ContributorsService {
  constructor(private readonly prismaService: PrismaService) {}

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

  async removeContributor(
    userId: User['id'],
    fileId: SharedFile['id'],
    removeContributorFromFileDto: RemoveContributorFromFileDto,
  ) {
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
        id: removeContributorFromFileDto.contributorId,
      },
    });

    await this.prismaService.fileContributors.delete({
      where: {
        fileId_userId: {
          fileId,
          userId: contributor.id,
        },
      },
    });
  }
}
