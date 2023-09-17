import { TypedBody, TypedParam, TypedRoute } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { AppService } from "./app.service";

interface TestDto {
  /**
   * @format email
   */
  email: string;
}
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }


  @TypedRoute.Get()
  getHelloWorld(): string {
    console.log("work...");
    return this.appService.getHello();
  }

  @TypedRoute.Post("nestia")
  getHello(@TypedBody() dto: TestDto): string {
    console.log("work...");
    return dto.email;
  }

  /**
   * it's very important API.
   *
   * how to use? read bellow!
   *
   * @param id maybe you know already
   * @returns true, just return true. that's all.
   */
  @TypedRoute.Post(":id")
  async nestiaTest(@TypedParam("id") id: number): Promise<boolean> {
    console.log("id : ", id);
    return true;
  }
}
