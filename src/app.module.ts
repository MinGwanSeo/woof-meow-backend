import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import { WoofsModule } from './woofs/woofs.module';
import { MeowsService } from './meows/meows.service';
import { MeowsModule } from './meows/meows.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'WoofMeow',
      entities: [],
      synchronize: true,
    }),
    WoofsModule,
    MeowsModule,
  ],
  controllers: [AppController],
  providers: [AppService, MeowsService],
})
export class AppModule { }
