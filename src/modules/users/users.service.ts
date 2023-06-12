import { existsSync } from 'fs';
import { FileService } from './../file/file.service';
import { PrismaService } from 'src/modules/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user/create-user.dto';
import { UpdateUserDto } from './dto/user/update-user.dto';
import { OnlineStatus, User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService, private fileService: FileService) {}
  async create(createUserDto: CreateUserDto, password: string): Promise<User> {
    const user = await this.prismaService.user.create({
      data: {
        ...createUserDto,
        password: {
          create: { password: password },
        },
      },
    });
    return user;
  }

  async findOne(id: User['id']): Promise<User> {
    return await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findAll(): Promise<User[]> {
    return await this.prismaService.user.findMany();
  }

  async findNotInContacts(userId: User['id']): Promise<User[]> {
    return await this.prismaService.user.findMany({
      where: {
        id: {
          not: {
            equals: userId,
          },
        },
        contacts: {
          every: {
            NOT: {
              userId,
            },
          },
        },
      },
    });
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async update(id: User['id'], updateUserDto: UpdateUserDto, image: Express.Multer.File): Promise<User> {
    const userBeforeUpdate = await this.prismaService.user.findFirstOrThrow({
      where: { id },
    });
    const { setImageToNull, ...updateDto } = updateUserDto;

    const filename = await this.fileService.updateMulterFile(image, 'users', userBeforeUpdate.image, setImageToNull);

    return await this.prismaService.user.update({
      where: {
        id: id,
      },
      data: { ...updateDto, image: filename },
    });
  }

  async setOnlineStatus(id: User['id'], status: OnlineStatus) {
    return await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  }

  async delete(id: User['id']): Promise<User> {
    const user = await this.prismaService.user.findUniqueOrThrow({
      where: {
        id,
      },
    });

    if (user.image && existsSync(user.image)) {
      this.fileService.deleteFile(user.image);
    }

    return await this.prismaService.user.delete({
      where: {
        id: id,
      },
    });
  }
}
