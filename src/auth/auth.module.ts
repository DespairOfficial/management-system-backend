import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { accessTokenOptions } from '../config/jwtOptions';
import { TokenService } from './token.service';
@Module({
    imports: [
        forwardRef(() => UsersModule),
        JwtModule.register({
            secret: process.env.JWT_ACCESS_SECRET || 'DesperateSecretKey',
            signOptions: { expiresIn: accessTokenOptions.expiresIn },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, TokenService],
    exports: [AuthService, JwtModule],
})
export class AuthModule {}
