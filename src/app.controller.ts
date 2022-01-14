import { Body, Controller, Get, Post } from "@nestjs/common";
import { AppService } from "./app.service";
import { Public } from "./auth/local-auth.guard";
import { CreateUserDto } from "./users/dto/create-user.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("login")
  login(@Body() user: CreateUserDto): any {
    return user;
  }

  @Get()
  @Public()
  getHello(): string {
    return this.appService.getHello();
  }
}
