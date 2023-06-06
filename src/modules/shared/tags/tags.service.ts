import { SharedFile } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { SetTagsToFileDto } from './dto/set-tags-to-file.dto';

@Injectable()
export class TagsServcie {
  constructor(private readonly prismaService: PrismaService) {}
  async getAllTags() {
    const tags = await this.prismaService.tag.findMany();
    return tags.map((tag) => {
      return tag.name;
    });
  }

  async setTagsForFile(fileId: SharedFile['id'], setTagsToFileDto: SetTagsToFileDto) {
    await this.prismaService.tagsOnFile.deleteMany({
      where: {
        fileId,
      },
    });
    const tagOnFileObj = setTagsToFileDto.tags
      ? setTagsToFileDto.tags.map((tag) => {
          return {
            fileId,
            tagName: tag,
          };
        })
      : [];
    await this.prismaService.tagsOnFile.createMany({
      data: tagOnFileObj,
    });
  }
}
