import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PrismaService } from './modules/prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  getHello(): string {
    return 'Hello World!';
  }
  async createItem(itemDto) {
    const response = await this.prisma.item.create({
      data: {
        name: itemDto.name,
      },
    });
    return response;
  }
  async getItemById(id) {
    const response = await this.prisma.item.findUnique({
      where: {
        id: +id,
      },
    });
    return response;
  }
}
