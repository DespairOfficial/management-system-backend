import { PrismaService } from '../../database/prisma.service';
import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class VerificationService {
    constructor(private prismaService: PrismaService) {}
    async setVerificationCodeToUser(userId: number, verificationCode: string) {
        await this.prismaService.user.update({
            where: {
                id: userId,
            },
            data: {
                verificationCode: verificationCode,
            },
        });
    }
    async verifyUserByCode(userId: number, verificationCode: string) {
        const codeObject = await this.prismaService.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                verificationCode: true,
            },
        });

		if(!codeObject){
			throw new InternalServerErrorException('User not found')
		}
        if (codeObject.verificationCode == verificationCode) {
            await this.prismaService.user.update({
                where: {
                    id: userId,
                },
                data: {
                    isVerified: true,
                },
            });
            return true;
        }
        throw new BadRequestException('Bad verification code')
    }
}
