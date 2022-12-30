import {
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Planing} from "./entities/planing.entity";
import {PlaningService} from "./planing.service";
import {PlaningController} from "./planing.controller";
import { AuthMiddleware } from '../Middlewares/AuthMiddleware';
import {Client} from "../client/entities/client.entity";
import {ClientService} from "../client/client.service";
import {ImageService} from "../image/image.service";
import {Image} from "../image/entities/image.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Planing, Client, Image])],
  providers: [PlaningService, ClientService, ImageService],
  controllers: [PlaningController],
})
export class PlaningModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AuthMiddleware).forRoutes(PlaningController);
  }
}
