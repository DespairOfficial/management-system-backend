import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from './../database/database.module';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
  imports: [DatabaseModule, JwtModule]
})
export class UsersModule {}
