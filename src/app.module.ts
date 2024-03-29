import { ColumnsModule } from './modules/kanban/columns/columns.module';
import { CardModule } from './modules/kanban/card/card.module';
import { BoardModule } from './modules/kanban/board/board.module';
import { UsersModule } from 'src/modules/users/users.module';
import { ProjectModule } from './modules/project/project.module';
import { AuthModule } from './modules/auth/auth.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './modules/mail/mail.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { AppGateway } from './app.gateway';
import { ConversationModule } from './modules/chat/conversation/conversation.module';
import { MessageModule } from './modules/chat/message/message.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SharedModule } from './modules/shared/shared.module';
import { CalendarEventsModule } from './modules/calendar-events/calendar-events.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    MailModule,
    SharedModule,
    ProjectModule,
    ConversationModule,
    MessageModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static', 'uploads'), // <-- path to the static files
      serveRoot: '/static/uploads/',
    }),
    CalendarEventsModule,
    UsersModule,
    BoardModule,
    CardModule,
    ColumnsModule,
  ],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/');
  }
}
