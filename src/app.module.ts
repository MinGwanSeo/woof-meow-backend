import { Module, RequestMethod } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { loggerConfig } from './common/logger.config';

const ENV = process.env.NODE_ENV || 'local';
@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${ENV}.env`
    }),
    LoggerModule.forRoot(loggerConfig),

  ]
})
export class AppModule { }
