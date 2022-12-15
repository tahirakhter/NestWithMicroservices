import { Controller, Get } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @MessagePattern({ role: 'item', cmd: 'create' })
  createItem(itemDto) {
    return this.appService.createItem(itemDto);
  }
  @MessagePattern({ role: 'item', cmd: 'get-by-id' })
  getItemById(id: number) {
    return this.appService.getItemById(id);
  }
  @EventPattern('user_created')
  async handleItemCreatedEvent(itemDto: Record<string, unknown>) {
    return this.appService.createItem(itemDto);
  }

  @EventPattern('get-by-id')
  async handleGetItemEvent(id: Record<number, unknown>) {
    return this.appService.getItemById(id);
  }
}
