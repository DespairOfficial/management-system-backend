import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from './../../database/database.module';
import { Module } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { ColumnsController } from './columns.controller';

@Module({
  controllers: [ColumnsController],
  providers: [ColumnsService],
  imports: [DatabaseModule, JwtModule],
  exports: [ColumnsService],
})
export class ColumnsModule {}
