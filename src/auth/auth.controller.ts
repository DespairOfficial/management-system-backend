import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Token } from 'src/interfaces/Token.interface';
import { Tokens } from 'src/interfaces/Tokens.interface';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { SignInUserDto } from 'src/user/dto/signin-user.dto';
import { AuthService } from './auth.service';
import { TOKEN_OBJECT_EXAMPLE } from '../constants';
import { JwtAuthGuard } from './jwt-auth.guard';
import { refreshTokenOptions } from '../config/jwtOptions.js';
@ApiTags('Authentication')
@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({ summary: 'Sign in/Log in' })
    @ApiResponse({
        status: 201,
        schema: {
            example: TOKEN_OBJECT_EXAMPLE,
        },
    })
    @Post('signin')
    async signIn(@Body() userDto: SignInUserDto) {
        return await this.authService.signIn(userDto);
    }

    @ApiOperation({ summary: 'Sign Up/Registration ' })
    @ApiResponse({
        status: 201,
        schema: {
            example: TOKEN_OBJECT_EXAMPLE,
        },
    })
    @Post('signup')
    async signUp(@Body() userDto: CreateUserDto) {
        const tokens = await this.authService.signUp(userDto);
        return tokens;
    }

    @ApiOperation({ summary: 'Log out' })
    @ApiResponse({
        status: 201,
    })
    @Post('logout')
    @UseGuards(JwtAuthGuard)
    async logout(@Req() request: Request) {
        const result = await this.authService.logout(request.user.uid);
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
