import { AuthModule } from './modules/auth/auth.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './modules/mail/mail.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { TeamModule } from './modules/team/team.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        AuthModule,
        MailModule,
        ThrottlerModule.forRoot({
            ttl: 1,
            limit: 5,
        }),
        TeamModule,
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
