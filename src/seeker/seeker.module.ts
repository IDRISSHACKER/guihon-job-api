import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeekerService } from './seeker.service';
import { SeekerController } from './seeker.controller';
import { Seeker } from './entities/Seeker.entity';
import { AuthMiddleware } from '../Middlewares/AuthMiddleware';

@Module({
  imports: [TypeOrmModule.forFeature([Seeker])],
  providers: [SeekerService],
  controllers: [SeekerController],
})
export class SeekerModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(AuthMiddleware).forRoutes(SeekerController);
  }
}
