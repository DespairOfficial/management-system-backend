import { TokenService } from './token.service';
import { LogInUserDto } from './dto/log-in-user.dto';
import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { Token } from 'src/interfaces/Token.interface';
import { Tokens } from 'src/interfaces/Tokens.interface';
import { User } from '@prisma/client';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private tokenService: TokenService,
    ) {}

    private async validateLogin(userDto: LogInUserDto): Promise<User> {
        const user = await this.usersService.findOneByEmail(userDto.email);
        if (user) {
            const isPasswordValid = await bcrypt.compare(userDto.password, user.password);
            if (isPasswordValid) {
                return user;
            }
        }
        throw new UnauthorizedException({
            message: 'Wrong email or password',
        });
    }

    private validateRefreshToken(refreshToken: Token): Promise<User> {
        if (!refreshToken.token) {
            throw new UnauthorizedException('Unvalid refresh token');
        }

        const user = this.jwtService.verify(refreshToken.token, {
            secret: process.env.JWT_REFRESH_SECRET,
        });
        return user;
    }

    async login(logInUserDto: LogInUserDto): Promise<Tokens> {
        const user: User = await this.validateLogin(logInUserDto);
        const tokens = await this.tokenService.generateTokens(user);
        return tokens;
    }

    async register(userDto: CreateUserDto): Promise<Tokens> {
        const candidate: User = await this.usersService.findOneByEmail(userDto.email);
        if (candidate) {
            throw new BadRequestException('User with this email already exists');
        }
        const hashedPassword = await bcrypt.hash(userDto.password, 10);
        const user: User = await this.usersService.create({
            ...userDto,
            password: hashedPassword,
        });
        const tokens = await this.tokenService.generateTokens(user);
        return tokens;
    }
    async logout(id: number) {
        await this.usersService.deleteRefreshToken(id);
    }
    async refresh(refreshToken: Token): Promise<Tokens> {
        if (!refreshToken.token) {
            throw new UnauthorizedException('User is not authorized');
        }
        const userDataFromToken = await this.validateRefreshToken(refreshToken);
        const userDataFromDb = await this.usersService.findOneByRefreshToken(refreshToken);
        if (!userDataFromToken || !userDataFromDb) {
            throw new UnauthorizedException('User is not authorized');
        }
        const user = await this.usersService.findOne(userDataFromToken.id);
        const tokens = await this.tokenService.generateTokens(user);
        return tokens;
    }
}
