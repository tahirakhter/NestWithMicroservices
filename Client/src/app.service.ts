import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('ITEM_MICROSERVICE') private readonly client: ClientProxy,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }
  createItem(createItemDto) {
    return this.client.send({ role: 'item', cmd: 'create' }, createItemDto);
  }

  getItemById(id: number) {
    return this.client.send({ role: 'item', cmd: 'get-by-id' }, id);
  }

  createItemEvent(createItemDto) {
    try {
      this.client.emit('item_created', createItemDto);
      return { data: 'item created successfully' };
    } catch (e) {
      throw new Error(e);
    }
  }

  getItemByIdEvent(id: number) {
    try {
      this.client.emit<number>('get-item-by-id', id);
      return { data: 'item fetched successfully' };
    } catch (e) {
      throw new Error(e);
    }
  }
}
