import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { loggerConfig } from './common/logger.config';
import { DatabaseService } from './database/database.service';
import { UsersModule } from './users/users.module';
import { PetsModule } from './pets/pets.module';
import { PinoLoggerService } from './pino-logger/pino-logger.service';
import { BaseExceptionFilter } from './exceptions'
import { APP_FILTER } from '@nestjs/core';

const ENV = process.env.NODE_ENV || 'local';
@Module({
  controllers: [AppController],
  providers: [
    AppService,
    DatabaseService,
    PinoLoggerService,
    {
      provide: APP_FILTER,
      useClass: BaseExceptionFilter,
    }
  ],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${ENV}.env`
    }),
    LoggerModule.forRoot(loggerConfig),
    UsersModule,
    PetsModule
  ]
})
export class AppModule { }
