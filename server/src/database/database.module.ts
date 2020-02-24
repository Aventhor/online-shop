import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { entitiesProviders } from './constants';

@Module({
    providers: [...databaseProviders, ...entitiesProviders],
    exports: [...databaseProviders, ...entitiesProviders]
})

export class DatabaseModule { }
