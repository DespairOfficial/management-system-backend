import { SessionService } from './session/session.service';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '../database/database.module';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PasswordsService } from './password/passwords.service';
import { VerificationService } from './verification/verification.service';
import { VerificationController } from './verification/verification.controller';


@Module({
    controllers: [UsersController, VerificationController],
    providers: [UsersService, SessionService, PasswordsService, VerificationService],
    exports: [UsersService, SessionService, PasswordsService, VerificationService],
    imports: [DatabaseModule, JwtModule],
})
export class UsersModule {}
