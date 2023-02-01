import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';

@Module({
    imports: [UserModule, ConfigModule.forRoot()],
    controllers: [],
    providers: [],
})
export class AppModule {}
