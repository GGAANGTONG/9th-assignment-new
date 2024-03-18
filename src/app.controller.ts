import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {

  @Get()
  getHello(): string {
    return '애슐리 이탈리아 배추구이 존맛';
  }
}
