import { AuthResponseDto } from './dto/auth-response.dto';
import { MailService } from '../mail/mail.service';
import AuthResult from 'src/interfaces/AuthResult.interface';
import { ValidateCustomHeadersDto } from '../users/dto/session/validate-custom-headers.dto';
import { Body, Controller, Post, Req, UseGuards, Res, Get, Patch } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Token } from 'src/interfaces/Token.interface';
import { Tokens } from 'src/interfaces/Tokens.interface';
import { AuthService } from './auth.service';
import { JWT_TOKEN_EXAMPLE } from '../../constants';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LogInUserDto } from './dto/log-in-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { BrowserDataDto } from 'src/modules/users/dto/session/browser-data.dto';
import { CustomHeaders } from 'src/decorators/headers.decorator';
import { TokenService } from './token.service';
import { refreshCookieOptions } from 'src/config/cookieOptions';
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private tokenService: TokenService,
        private mailService: MailService,
    ) {}

    @ApiOperation({ summary: 'Log in' })
    @ApiResponse({
        status: 201,
        type: AuthResponseDto,
    })
    @Post('login')
    async logIn(
        @CustomHeaders() headers: ValidateCustomHeadersDto,
        @Req() request: Request,
        @Body() logInUserDto: LogInUserDto,
        @Res({ passthrough: true }) res: Response,
    ) {
        const browserDataDto: BrowserDataDto = {
            userAgent: request.get('User-Agent'),
            ip: request.ip,
            fingerprint: request.get('fingerprint'),
        };

        const authData: AuthResult = await this.authService.login(logInUserDto, browserDataDto);
        const expires = this.tokenService.getNewExpiresAtForRefreshToken();
        res.cookie('refreshToken', authData.tokens.refreshToken, { ...refreshCookieOptions, expires: expires });
        return { user: authData.user, accessToken: authData.tokens.accessToken };
    }

    @ApiOperation({ summary: 'Sign Up/Registration ' })
    @ApiResponse({
        status: 201,
        type: AuthResponseDto,
    })
    @Post('register')
    async register(
        @CustomHeaders() headers: ValidateCustomHeadersDto,
        @Req() request: Request,
        @Body() userDto: RegisterUserDto,
        @Res({ passthrough: true }) res: Response,
    ) {
        const browserDataDto: BrowserDataDto = {
            userAgent: request.get('user-agent'),
            ip: request.ip,
            fingerprint: request.get('fingerprint'),
        };
        const authData: AuthResult = await this.authService.register(userDto, browserDataDto);
        const expires = this.tokenService.getNewExpiresAtForRefreshToken();
        res.cookie('refreshToken', authData.tokens.refreshToken, { ...refreshCookieOptions, expires: expires });
        return { user: authData.user, accessToken: authData.tokens.accessToken };
    }

    @ApiOperation({ summary: 'Log out' })
    @ApiResponse({
        status: 201,
    })
    @Patch('logout')
    @UseGuards(JwtAuthGuard)
    async logout(@Req() request: Request, @Res({ passthrough: true }) res: Response) {
        const refreshToken: Token | undefined = request.cookies.refreshToken;
        if (refreshToken) {
            await this.authService.logout(refreshToken);
        }
        request.user = undefined;
        res.clearCookie('refreshToken');
    }


    @ApiOperation({ summary: 'Create new access token, and update refresh token' })
    @ApiResponse({
        status: 200,
        schema: {
            example: {
                accessToken: JWT_TOKEN_EXAMPLE,
            },
        },
    })
    @Patch('refreshToken')
    async refreshToken(
        @Req() request: Request,
        @CustomHeaders() headers: ValidateCustomHeadersDto,
        @Res({ passthrough: true }) res: Response,
    ) {
        const browserDataDto: BrowserDataDto = {
            userAgent: request.get('User-Agent'),
            ip: request.ip,
            fingerprint: request.get('fingerprint'),
        };
        const cookies = request.cookies;
        const refreshToken: Token = cookies.refreshToken;
        const tokens: Tokens = await this.authService.refresh(refreshToken, browserDataDto);
        const expires = this.tokenService.getNewExpiresAtForRefreshToken();
        res.cookie('refreshToken', tokens.refreshToken, { ...refreshCookieOptions, expires: expires });
        return { accessToken: tokens.accessToken };
    }
    @Get('sendCode')
	@ApiOperation({deprecated: true})
    async sendVerCode(@Req() request: Request) {
        const verificationCode = (Math.floor(Math.random() * 900000) + 99999).toString();
        const user = {
            email: 'grobamist@gmail.com',
            phone: '12341234124',
            firstName: 'Vladilen',
            lastName: 'Minin',
            referalCode: 'code',
            userType: 1,
        };
        await this.mailService.sendUserConfirmation(user, verificationCode);
    }
}
