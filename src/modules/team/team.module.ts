import { DatabaseModule } from './../database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';

@Module({
  controllers: [TeamController],
  providers: [TeamService],
  imports: [JwtModule, DatabaseModule]
})
export class TeamModule {}
