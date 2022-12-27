import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeService } from './employe.service';
import { EmployeController } from './employe.controller';
import { Employe } from './entities/employe.entity';
import { AuthMiddleware } from '../Middlewares/AuthMiddleware';
import { Presence } from '../presence/entities/presence.entity';
import { PresenceService } from '../presence/presence.service';

@Module({
  imports: [TypeOrmModule.forFeature([Employe, Presence])],
  providers: [EmployeService, PresenceService],
  controllers: [EmployeController],
})
export class EmployeModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: 'employe/login', method: RequestMethod.POST })
      .forRoutes(EmployeController);
  }
}
