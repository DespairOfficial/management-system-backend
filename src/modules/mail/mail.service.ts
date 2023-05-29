import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/user/create-user.dto';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}
  private logger = new Logger(MailService.name);
  async sendUserConfirmation(user: CreateUserDto, token: string) {
    const url = `${process.env.HOST_URL}/auth/confirm?token=${token}`;
    try {
      await this.mailerService.sendMail({
        to: user.email,
        from: 'DPM <ddsmailer@mail.ru>', // override default from
        subject: 'Hello from DPM team! Please, confirm your email.',
        template: './confirmation', // `.hbs` extension is appended automatically
        context: {
          // ✏️ filling curly brackets with content
          name: user.firstName,
          code: token,
          url,
        },
      });
    } catch (error) {
      this.logger.log(error);
      throw error;
    }
  }
  async sendForgotPassword(email: string, token: string) {
    const url = `${process.env.HOST_URL}/password/restore/${token}`;

    try {
      await this.mailerService.sendMail({
        to: email,
        from: 'DPM <ddsmailer@mail.ru>', // override default from
        subject: 'Restore password on DPM',
        template: './forgot-password', // `.hbs` extension is appended automatically
        context: {
          // ✏️ filling curly brackets with content
          url,
        },
      });
    } catch (error) {
      this.logger.log(error);
      throw error;
    }
  }
}
