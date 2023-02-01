import { Module } from '@nestjs/common';
import { Pool } from 'pg';
import { PG_CONNECTION } from '../constants';
import {config} from '../config/database'

const dbProvider = {
    provide: PG_CONNECTION,
    useValue: new Pool(config.dev),
};

@Module({
    providers: [dbProvider],
    exports: [dbProvider],
})
export class DbModule {}
