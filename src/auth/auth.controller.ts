import { refreshTokenOptions } from './../config/jwtOptions';
import { Body, Controller, Post, Req, UseGuards, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Token } from 'src/interfaces/Token.interface';
import { Tokens } from 'src/interfaces/Tokens.interface';
import { AuthService } from './auth.service';
import { TOKEN_OBJECT_EXAMPLE } from '../constants';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LogInUserDto } from './dto/log-in-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
@ApiTags('Authentication')
@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({ summary: 'Log in' })
    @ApiResponse({
        status: 201,
        schema: {
            example: TOKEN_OBJECT_EXAMPLE,
        },
    })
    @Post('login')
    async logIn(@Body() logInUserDto: LogInUserDto, @Res({ passthrough: true }) res: Response) {
        const tokens: Tokens = await this.authService.login(logInUserDto);
        const expires = new Date(Date.now() + refreshTokenOptions.expiresIn);
        res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true, expires: expires });
        return tokens.accessToken;
    }

    @ApiOperation({ summary: 'Sign Up/Registration ' })
    @ApiResponse({
        status: 201,
        schema: {
            example: TOKEN_OBJECT_EXAMPLE,
        },
    })
    @Post('register')
    async register(@Body() userDto: CreateUserDto) {
        const tokens = await this.authService.register(userDto);
        return tokens;
    }

    @ApiOperation({ summary: 'Log out' })
    @ApiResponse({
        status: 201,
    })
    @Post('logout')
    @UseGuards(JwtAuthGuard)
    async logout(@Req() request: Request) {
        const result = await this.authService.logout(request.user.id);
        request.user = undefined;
        return result;
    }

    @ApiOperation({ summary: 'Get refresh token' })
    @Post('refresh-token')
    async refreshToken(@Req() request: Request) {
        const cookies = request.cookies;
        const refreshToken: Token = {
            token: cookies.refreshToken,
            expiresIn: refreshTokenOptions.expiresIn,
        };
        const tokens: Tokens = await this.authService.refresh(refreshToken);
        return tokens;
    }
}
