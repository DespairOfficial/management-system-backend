import { CreateCommentDto } from './dto/create-comment.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { FileService } from '../../../file/file.service';

@Injectable()
export class CommentService {
  constructor(private readonly prismaService: PrismaService, private readonly fileService: FileService) {}
  async create(createCommentDto: CreateCommentDto, image: Express.Multer.File) {
    const filename = await this.fileService.updateMulterFile(image, 'users');

    return await this.prismaService.kanbanComment.create({
      data: { ...createCommentDto, image: filename },
    });
  }
}
