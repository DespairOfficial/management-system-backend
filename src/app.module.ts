import { ProjectModule } from './modules/project/project.module';
import { AuthModule } from './modules/auth/auth.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './modules/mail/mail.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { AppGateway } from './app.gateway';
import { ConversationModule } from './modules/chat/conversation/conversation.module';
import { MessageModule } from './modules/chat/message/message.module';

@Module({
    imports: [ConfigModule.forRoot(), AuthModule, MailModule, ProjectModule, ConversationModule, MessageModule],
    controllers: [],
    providers: [AppGateway],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('/');
    }
}
