import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { enviroments } from './enviroments';
import configEnv from './config';



@Module({
  imports: [UserModule,
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [configEnv],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.string().required(),
        LOCAL_PORT: Joi.number().required(),
        DATABASE_NAME: Joi.string().required(),
        HOST: Joi.string().required(),
        PORT: Joi.number().required(),
        DATABASE_USER: Joi.string().required(),
        PASSWORD: Joi.string().required(),
      }),
    }),
    DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
