import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {

  private logger = new Logger('AppController');

  constructor(private readonly appService: AppService) { }

  @MessagePattern()
  getHello(): string {
    this.logger.log('get hello')
    return this.appService.getHello();
  }
}
