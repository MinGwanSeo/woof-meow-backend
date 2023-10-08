import { Controller, Get, HttpException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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

  @Get('exception')
  triggerException() {
    const error = new HttpException('An error occurred', 500);
    // 커스텀 속성 추가
    (error as any).sourceClass = this.constructor.name;
    throw error;
  }
}
