import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'The Fortress of Eger is standing. System Online.';
  }
}
