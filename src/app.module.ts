import { Module, RequestMethod } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { loggerConfig } from './common/logger.config';
import { DatabaseService } from './database/database.service';
import { UsersModule } from './users/users.module';
import { PetsModule } from './pets/pets.module';
import { ExceptionController } from './exception/exception.controller';

const ENV = process.env.NODE_ENV || 'local';
@Module({
  controllers: [AppController, ExceptionController],
  providers: [AppService, DatabaseService],
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
