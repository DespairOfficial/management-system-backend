import { ContactsService } from './contacts/contacts.service';
import { ContactsController } from './contacts/contacts.controller';
import { SessionService } from './session/session.service';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '../database/database.module';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PasswordsService } from './password/passwords.service';
import { VerificationService } from './verification/verification.service';
import { VerificationController } from './verification/verification.controller';
import { FileModule } from '../file/file.module';
import { ConversationModule } from '../chat/conversation/conversation.module';

@Module({
  controllers: [UsersController, VerificationController, ContactsController],
  providers: [UsersService, SessionService, PasswordsService, VerificationService, ContactsService],
  exports: [UsersService, SessionService, PasswordsService, VerificationService],
  imports: [DatabaseModule, JwtModule, FileModule, ConversationModule],
})
export class UsersModule {}
