import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { loggerConfig } from './common/logger.config';
import { DatabaseService } from './database/database.service';
import { UsersModule } from './users/users.module';
import { PetsModule } from './pets/pets.module';
import { BaseExceptionFilter } from './exceptions'
import { APP_FILTER } from '@nestjs/core';
import { DatabaseModule } from './database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PinoLoggerModule } from './pino-logger/pino-logger.module';

const ENV = process.env.NODE_ENV || 'local';
@Module({
  controllers: [AppController],
  providers: [
    AppService,
    DatabaseService,
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
    TypeOrmModule.forRootAsync({
      imports: [DatabaseModule, ConfigModule, PinoLoggerModule], // 필요한 모듈을 추가
      useClass: DatabaseService,
    }),
    DatabaseModule,
    UsersModule,
    PetsModule,
    PinoLoggerModule
  ],
})
export class AppModule { }
