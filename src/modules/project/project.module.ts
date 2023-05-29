import { ProjectService } from './project.service';
import { DatabaseModule } from '../database/database.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ProjectController } from './project.controller';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService],
  imports: [DatabaseModule, JwtModule],
})
export class ProjectModule {}
