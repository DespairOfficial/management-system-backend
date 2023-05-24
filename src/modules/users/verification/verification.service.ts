import { PrismaService } from '../../database/prisma.service';
import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { VerifyEmailCodeDto } from './dto/verify-email-code.dto';

@Injectable()
export class VerificationService {
    constructor(private prismaService: PrismaService) {}
    async setEmailVerificationCodeToUser(userId: number, emailVerificationCode: string) {
        await this.prismaService.verification.upsert({
            where: {
                userId,
            },
            update: {
                emailVerificationCode,
            },
            create: {
                userId,
                emailVerificationCode,
            },
        });
    }
    async verifyEmailByCode(userId: number, verifyEmailCodeDto: VerifyEmailCodeDto) {
        const codeObject = await this.prismaService.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                verification: {
                    select: {
                        emailVerificationCode: true,
                    },
                },
            },
        });

        if (!codeObject) {
            throw new InternalServerErrorException('User not found');
        }
        if (codeObject.verification.emailVerificationCode == verifyEmailCodeDto.code) {
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
        throw new BadRequestException('Bad verification code');
    }

    async setForgotPasswordToken(email: string, forgotPasswordCode: string) {
        const user = await this.prismaService.user.findFirstOrThrow({
            where: { email },
        });

        await this.prismaService.verification.upsert({
            where: {
                userId: user.id,
            },
            update: { forgotPasswordCode },
            create: { userId: user.id, forgotPasswordCode },
        });
        return forgotPasswordCode;
    }

    async verifyPasswordForgotCode(email: string, forgotPasswordCode: string) {
        const user = await this.prismaService.user.findFirstOrThrow({
            where: { email },
        });

        const forgotPasswordCodeInDB = await this.prismaService.verification.findFirstOrThrow({
            where: {
                userId: user.id,
            },
        });
        if (!forgotPasswordCodeInDB.forgotPasswordCode) {
            throw new BadRequestException('You did not ask for restore yet');
        }
        if (forgotPasswordCodeInDB.forgotPasswordCode == forgotPasswordCode) {
            await this.prismaService.verification.update({
                where: {
                    userId: user.id,
                },
                data: {
                    forgotPasswordCode: null,
                },
            });
            return user;
        }
        throw new BadRequestException('Wrong verification code');
    }
}
