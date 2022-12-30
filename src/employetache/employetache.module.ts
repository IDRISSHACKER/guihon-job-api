import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Employetache} from "./entities/employetache.entity";
import {EmployetacheService} from "./employetache.service";
import {EmployetacheController} from "./employetache.controller";
import { AuthMiddleware } from '../Middlewares/AuthMiddleware';

@Module({
  imports: [TypeOrmModule.forFeature([Employetache])],
  providers: [EmployetacheService],
  controllers: [EmployetacheController],
})

export class EmployetacheModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(AuthMiddleware).forRoutes(EmployetacheController);
  }
}
