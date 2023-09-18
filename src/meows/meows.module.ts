import { Module } from '@nestjs/common';
import { MeowsController } from './meows.controller';

@Module({
  controllers: [MeowsController]
})
export class MeowsModule {}
