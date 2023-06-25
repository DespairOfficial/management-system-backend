import { CreateCommentDto } from './dto/create-comment.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { FileService } from '../../../file/file.service';
import { User } from '@prisma/client';

@Injectable()
export class CommentService {
  constructor(private readonly prismaService: PrismaService, private readonly fileService: FileService) {}
  async create(userId: User['id'], createCommentDto: CreateCommentDto, image: Express.Multer.File) {
    const filename = await this.fileService.updateMulterFile(image, 'kanban/comments');

    console.log(image, filename);

    return await this.prismaService.kanbanComment.create({
      data: { ...createCommentDto, userId, image: filename },
      include: {
        user: true,
      },
    });
  }
}
