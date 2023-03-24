import { AuthModule } from './modules/auth/auth.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './modules/mail/mail.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { DisciplineModule } from './modules/discipline/discipline.module';
import { TeamModule } from './modules/team/team.module';
import { EventModule } from './modules/event/event.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        AuthModule,
        MailModule,
        ThrottlerModule.forRoot({
            ttl: 1,
            limit: 5,
        }),
        DisciplineModule,
        TeamModule,
        EventModule,
    ],
    controllers: [],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('/');
    }
}
