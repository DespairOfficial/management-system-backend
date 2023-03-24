import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/modules/users/dto/user/create-user.dto';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}

    async sendUserConfirmation(user: CreateUserDto, token: string) {
        const url = `localhost:5000/auth/confirm?token=${token}`;
        await this.mailerService.sendMail({
            to: user.email,
            from: 'RuChamp <ddsmailer@mail.ru>', // override default from
            subject: 'Приветствуем вас на RuChamp! Пожалуйста, подтвердите свой email.',
            template: './confirmation', // `.hbs` extension is appended automatically
            context: {
                // ✏️ filling curly brackets with content
                name: user.firstName,
				code: token,
                url,
            },
        });
    }
}
