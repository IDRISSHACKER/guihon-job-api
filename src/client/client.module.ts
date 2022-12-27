import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { Client } from './entities/client.entity';
import { AuthMiddleware } from '../Middlewares/AuthMiddleware';
import { ImageService } from '../image/image.service';
import { Image } from '../image/entities/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client, Image])],
  providers: [ClientService, ImageService],
  controllers: [ClientController],
})
export class ClientModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(AuthMiddleware).forRoutes(ClientController);
  }
}
