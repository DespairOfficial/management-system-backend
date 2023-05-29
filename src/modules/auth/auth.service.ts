import { MailService } from '../mail/mail.service';
import { PasswordsService } from '../users/password/passwords.service';
import AuthResult from '../../interfaces/AuthResult.interface';
import { CreateUserDto } from 'src/modules/users/dto/user/create-user.dto';
import { BrowserDataDto } from '../users/dto/session/browser-data.dto';
import { SessionService } from '../users/session/session.service';
import { TokenService } from './token.service';
import { LogInUserDto } from './dto/log-in-user.dto';
import { BadRequestException, Injectable, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/users.service';
import * as bcrypt from 'bcryptjs';
import { Token } from 'src/interfaces/Token.interface';
import { Tokens } from 'src/interfaces/Tokens.interface';
import { User } from '@prisma/client';
import { RegisterUserDto } from './dto/register-user.dto';
import { refreshTokenOptions } from 'src/config/jwtOptions';
import { VerificationService } from 'src/modules/users/verification/verification.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private tokenService: TokenService,
    private sessionService: SessionService,
    private passwordService: PasswordsService,
    private mailService: MailService,
    private verificationService: VerificationService,
  ) {}
  private async validateLogin(userDto: LogInUserDto): Promise<User> {
    const user = await this.usersService.findOneByEmail(userDto.email);
    if (user) {
      const userPassword = await this.passwordService.findOneByUserId(user.id);
      const isPasswordValid = await bcrypt.compare(userDto.password, userPassword.password);
      if (isPasswordValid) {
        return user;
      }
      throw new UnauthorizedException({
        message: 'Wrong password',
      });
    }
    throw new UnauthorizedException({
      message: 'Wrong email',
    });
  }

  private validateRefreshToken(refreshToken: Token): Promise<User> {
    if (!refreshToken) {
      throw new UnauthorizedException('Unvalid refresh token');
    }
    const user = this.jwtService.verify(refreshToken, {
      secret: refreshTokenOptions.secret,
    });
    return user;
  }

  async login(logInUserDto: LogInUserDto, browserDataDto: BrowserDataDto): Promise<AuthResult> {
    const user: User = await this.validateLogin(logInUserDto);
    const tokens = await this.tokenService.createTokensAndSession(user, browserDataDto);
    return { user: user, tokens };
  }

  async register(registerUserDto: RegisterUserDto, browserDataDto: BrowserDataDto): Promise<AuthResult> {
    const candidate: User = await this.usersService.findOneByEmail(registerUserDto.email);
    if (candidate) {
      throw new BadRequestException('User with this email already exists');
    }
    // const secret = 'very secret phrase';
    // const referalCode = createHmac('sha256', secret)
    //     .update(registerUserDto.email + registerUserDto.phone + registerUserDto.firstName)
    //     .digest('hex');

    const userDto: CreateUserDto = {
      email: registerUserDto.email,
      firstName: registerUserDto.firstName,
      lastName: registerUserDto.lastName,
    };
    const password = registerUserDto.password;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user: User = await this.usersService.create(userDto, hashedPassword);
    const tokens = await this.tokenService.createTokensAndSession(user, browserDataDto);
    try {
      const verificationCode = (Math.floor(Math.random() * 900000) + 99999).toString();
      await this.verificationService.setEmailVerificationCodeToUser(user.id, verificationCode);
      await this.mailService.sendUserConfirmation(user, verificationCode);
    } catch {
      throw new InternalServerErrorException('Error during sending confirmation code...');
    }
    return { user: user, tokens };
  }

  async logout(refreshToken: Token) {
    await this.sessionService.deleteSessionByRefreshToken(refreshToken);
  }

  async refresh(refreshToken: Token, browserDataDto: BrowserDataDto): Promise<Tokens> {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token in not found');
    }
    const userDataFromToken = await this.validateRefreshToken(refreshToken);
    const sessionDataFromDb = await this.sessionService.findOneByRefreshToken(refreshToken);
    if (!userDataFromToken || !sessionDataFromDb) {
      throw new UnauthorizedException('Refresh token not found or malformed');
    }
    const user = await this.usersService.findOne(userDataFromToken.id);
    const tokens = await this.tokenService.createTokensAndSession(user, browserDataDto);
    return tokens;
  }
}
