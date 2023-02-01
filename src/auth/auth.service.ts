import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/interfaces/User.interface';
import { SignInUserDto } from 'src/user/dto/signin-user.dto';
import { Token } from 'src/interfaces/Token.interface';
import { v4 as uuidv4 } from 'uuid';
import { Tokens } from 'src/interfaces/Tokens.interface';
import { BAD_AUTH, BAD_REQUEST, ERROR_SAVING_TOKEN, UNKOWN_INTERNAL_ERROR } from 'src/constants';
import { accessTokenOptions, refreshTokenOptions } from '../config/jwtOptions.js';
@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    private generateAccessToken(user: User): Token {
        const payload = {
            uid: user.uid,
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
            id: uuidv4(),
            uid: user.uid,
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
    private async saveRefreshToken(uid: string, refreshToken: Token) {
        try {
            return await this.userService.setNewRefreshToken(uid, refreshToken);
        } catch (error) {
            throw new InternalServerErrorException(UNKOWN_INTERNAL_ERROR);
        }
    }

    private async generateTokens(user: User): Promise<Tokens> {
        const accessToken: Token = this.generateAccessToken(user);
        const candidateToRefreshToken: Token = this.generateRefreshToken(user);
        try {
            const refreshToken: Token = await this.saveRefreshToken(user.uid, candidateToRefreshToken);
            return {
                accessToken,
                refreshToken,
            };
        } catch (error) {
            throw new InternalServerErrorException(ERROR_SAVING_TOKEN);
        }
    }

    private async validateUser(userDto: SignInUserDto): Promise<User> {
        try {
            const user = await this.userService.findByEmail(userDto.email);
            if (user) {
                const passwordPassed = await bcrypt.compare(userDto.password, user.password);
                if (passwordPassed) {
                    return user;
                }
            }
            throw new UnauthorizedException({
                message: 'Wrong email or password',
            });
        } catch (error) {
            throw new BadRequestException(BAD_REQUEST);
        }
    }
    private validateRefreshToken(refreshToken: Token): Promise<User> {
        try {
            if (!refreshToken.token) {
                throw new UnauthorizedException('Unvalid refresh token');
            }

            const user = this.jwtService.verify(refreshToken.token, {
                secret: process.env.JWT_REFRESH_SECRET,
            });
            return user;
        } catch (error) {
            throw new UnauthorizedException('Unvalid refresh token');
        }
    }
    async signIn(userDto: SignInUserDto): Promise<Tokens> {
        try {
            const user: User = await this.validateUser(userDto);
            const tokens = await this.generateTokens(user);
            return tokens;
        } catch (error) {
            throw new BadRequestException(BAD_AUTH);
        }
    }
    async signUp(userDto: CreateUserDto): Promise<Tokens> {
        const candidate: User = await this.userService.findByEmail(userDto.email);
        if (candidate) {
            throw new BadRequestException('User with this email already exists');
        }
        const hashedPassword = await bcrypt.hash(userDto.password, 7);
        const user: User = await this.userService.createUser({
            ...userDto,
            password: hashedPassword,
        });
        const tokens = await this.generateTokens(user);
        return tokens;
    }
    async logout(uid: string) {
        try {
            await this.userService.logout(uid);
        } catch (error) {
            throw new InternalServerErrorException(UNKOWN_INTERNAL_ERROR);
        }
    }
    async refresh(refreshToken: Token): Promise<Tokens> {
        if (!refreshToken.token) {
            throw new UnauthorizedException('User is not authorized');
        }
        const userDataFromToken = await this.validateRefreshToken(refreshToken);
        const userDataFromDb = await this.userService.findByRefreshToken(refreshToken);
        if (!userDataFromToken || !userDataFromDb) {
            throw new UnauthorizedException('User is not authorized');
        }
        const user = await this.userService.findById(userDataFromToken.uid);
        const tokens = await this.generateTokens(user);
        return tokens;
    }
}
