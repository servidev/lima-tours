import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getRoot(): { message: string } {
    return { message: 'Server API Lima Tours online.' };
  }
}
