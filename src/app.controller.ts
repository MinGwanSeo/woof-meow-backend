import { Controller, Get, Req } from "@nestjs/common";
import { AppService } from "./app.service";
import { RouteConfig } from "@nestjs/platform-fastify";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @RouteConfig({ output: 'hello world' })
  @Get()
  index(@Req() req) {
    return req.routeConfig.output;
  }
}
