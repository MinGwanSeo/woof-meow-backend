import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) { }

  @Get()
  getWelcomeMessage(): string {
    return this.appService.getWelcomeMessage();
  }

  @Get('health')
  getHealthStatus(): string {
    return this.appService.getHealthStatus()
  }

  @Get('api/version')
  getVersion(): string {
    return this.appService.getVersion();
  }
}
