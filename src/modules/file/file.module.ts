import { DatabaseModule } from '../database/database.module';
import { Module } from '@nestjs/common';
import { FileService } from './file.service';

@Module({
  controllers: [],
  providers: [FileService],
  imports: [DatabaseModule],
  exports: [FileService],
})
export class FileModule {}
