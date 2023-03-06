import { Token } from 'src/interfaces/Token.interface';
import { PrismaService } from 'src/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(private prismaService: PrismaService) {}
    async create(createUserDto: CreateUserDto): Promise<User> {
        return await this.prismaService.user.create({ data: createUserDto });
    }

    async findAll(): Promise<User[]> {
        return await this.prismaService.user.findMany();
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

    async findOneByRefreshToken(refreshToken: Token): Promise<User> {
        return await this.prismaService.user.findFirst({
            where: {
                refreshToken: refreshToken.token,
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

    async updateRefreshToken(id: number, refreshTokenObject: Token): Promise<User> {
        return await this.prismaService.user.update({
            where: {
                id: id,
            },
            data: {
                refreshToken: refreshTokenObject.token,
            },
        });
    }

    async deleteRefreshToken(id: number): Promise<User> {
        return await this.prismaService.user.update({
            where: {
                id: id,
            },
            data: {
                refreshToken: null,
            },
        });
    }
}
