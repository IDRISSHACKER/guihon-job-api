import {
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Tache} from "./entities/tache.entity";
import {TacheService} from "./tache.service";
import {TacheController} from "./tache.controller";
import { AuthMiddleware } from '../Middlewares/AuthMiddleware';
import {Planing} from "../planing/entities/planing.entity";
import {PlaningService} from "../planing/planing.service";
import {ClientService} from "../client/client.service";
import {ImageService} from "../image/image.service";
import {Client} from "../client/entities/client.entity";
import {Image} from "../image/entities/image.entity";
import {Employetache} from "../employetache/entities/employetache.entity";
import {EmployetacheService} from "../employetache/employetache.service";
import {Employe} from "../employe/entities/employe.entity";
import {EmployeService} from "../employe/employe.service";
import {PresenceService} from "../presence/presence.service";
import {Presence} from "../presence/entities/presence.entity";


@Module({
  imports: [TypeOrmModule.forFeature([Tache, Planing, Client, Image, Employetache, Employe, Presence])],
  providers: [TacheService, PlaningService, ClientService, ImageService, EmployetacheService, EmployeService, PresenceService],
  controllers: [TacheController],
})
export class TacheModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AuthMiddleware).forRoutes(TacheController);
  }
}
