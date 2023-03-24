import { PrismaService } from 'src/modules/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user/create-user.dto';
import { UpdateUserDto } from './dto/user/update-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(
        private prismaService: PrismaService,
    ) {}
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

    async findOne(id: number): Promise<User> {
        return await this.prismaService.user.findUnique({
            where: {
                id: id,
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

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        return await this.prismaService.user.update({
            where: {
                id: id,
            },
            data: updateUserDto,
        });
    }

    async remove(id: number): Promise<User> {
        return await this.prismaService.user.delete({
            where: {
                id: id,
            },
        });
    }
}
