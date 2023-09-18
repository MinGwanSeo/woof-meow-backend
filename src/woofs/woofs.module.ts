import { Module } from '@nestjs/common';
import { WoofsService } from './woofs.service';
import { WoofsController } from './woofs.controller';

@Module({
  providers: [WoofsService],
  controllers: [WoofsController]
})
export class WoofsModule {}
