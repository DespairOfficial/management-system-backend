import { TagsServcie } from './tags/tags.service';
import { TagsController } from './tags/tags.controller';
import { JwtModule } from '@nestjs/jwt';
import { SharedController } from './shared.controller';
import { DatabaseModule } from '../database/database.module';
import { Module } from '@nestjs/common';
import { SharedService } from './shared.service';
import { ContributorsService } from './contributors/contributors.service';

@Module({
  controllers: [SharedController, TagsController],
  providers: [SharedService, TagsServcie, ContributorsService],
  imports: [DatabaseModule, JwtModule],
  exports: [],
})
export class SharedModule {}
