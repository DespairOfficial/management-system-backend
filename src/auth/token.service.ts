import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { accessTokenOptions, refreshTokenOptions } from 'src/config/jwtOptions';
import { ERROR_SAVING_TOKEN, UNKOWN_INTERNAL_ERROR } from 'src/constants';
import { Token } from 'src/interfaces/Token.interface';
import { Tokens } from 'src/interfaces/Tokens.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TokenService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}
    private generateAccessToken(user: User): Token {
        const payload = {
            id: user.id,
            email: user.email,
            nickname: user.name,
            type: 'access_token',
        };
        return {
            token: this.jwtService.sign(payload),
            expiresIn: accessTokenOptions.expiresIn,
        };
    }

    private generateRefreshToken(user: User): Token {
        const payload = {
            id: user.id,
            email: user.email,
            nickname: user.name,
            type: 'refresh_token',
        };
        return {
            token: this.jwtService.sign(payload, {
                secret: process.env.JWT_REFRESH_SECRET || 'refresh_token_secret_8a1lma@#$!ds_15',
                expiresIn: refreshTokenOptions.expiresIn,
            }),
            expiresIn: refreshTokenOptions.expiresIn,
        };
    }
    private async saveRefreshToken(id: number, refreshTokenObject: Token) {
        try {
            const updatedUser = await this.usersService.updateRefreshToken(id, refreshTokenObject);
            return updatedUser.refreshToken;
        } catch (error) {
            throw new InternalServerErrorException(UNKOWN_INTERNAL_ERROR);
        }
    }
    public async generateTokens(user: User): Promise<Tokens> {
        const accessTokenObject: Token = this.generateAccessToken(user);
        const candidateToRefreshToken: Token = this.generateRefreshToken(user);
        try {
            const refreshTokenString: string = await this.saveRefreshToken(user.id, candidateToRefreshToken);
            const refreshTokenObject: Token = {
                token: refreshTokenString,
                expiresIn: refreshTokenOptions.expiresIn,
            };
            return {
                accessToken: accessTokenObject,
                refreshToken: refreshTokenObject,
            };
        } catch (error) {
            throw new InternalServerErrorException(ERROR_SAVING_TOKEN);
        }
    }
}
