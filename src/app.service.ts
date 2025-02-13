import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  startServerMsg(): { message: string } {
    return { message: 'Server Lima Tours Online' };
  }
}
