import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from './../../database/database.module';
import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { ColumnsModule } from '../columns/columns.module';

@Module({
  controllers: [CardController],
  providers: [CardService],
  imports: [DatabaseModule, JwtModule, ColumnsModule],
})
export class CardModule {}
