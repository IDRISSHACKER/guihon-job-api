import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PresenceService } from './presence.service';
import { PresenceController } from './presence.controller';
import { Presence } from './entities/presence.entity';
import { AuthMiddleware } from '../Middlewares/AuthMiddleware';

@Module({
  imports: [TypeOrmModule.forFeature([Presence])],
  providers: [PresenceService],
  controllers: [PresenceController],
})
export class PresenceModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(AuthMiddleware).forRoutes(PresenceController);
  }
}
