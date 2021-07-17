import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Client } from 'pg';
import configEnv from '../config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [configEnv.KEY],
      useFactory: async (configService: ConfigType<typeof configEnv>) => {
        const { db_name, db_user, host, password, port } =
          configService.database;
        return {
          type: 'postgres',
          host,
          port,
          username: db_user,
          password,
          database: db_name,
          synchronize: false,
          autoLoadEntities: true,
        };
      },
    }),
  ],
  providers: [
    {
      provide: 'PG',
      useFactory: async (configService: ConfigType<typeof configEnv>) => {
        const { db_name, db_user, host, password, port } =
          configService.database;
        const client = new Client({
          database: db_name,
          host,
          port,
          user: db_user,
          password,
        });

        client.connect();
        return client;
      },
      inject: [configEnv.KEY],
    },
  ],
  exports: ['PG', TypeOrmModule],
})
export class DatabaseModule {}
