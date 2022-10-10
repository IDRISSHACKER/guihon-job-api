import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MulterModule } from '@nestjs/platform-express/multer';
import { ORM_CONFIG } from './config/typeOrm.config';
import { TMP_FOLDER } from './utils/Const';
import {SeekerModule} from "./seeker/seeker.module";
import {AdminModule} from "./admin/admin.module";
import {AuthMiddleware} from "./Middlewares/AuthMiddleware";

@Module({
  imports: [
    MulterModule.register({ dest: TMP_FOLDER }),
    ORM_CONFIG,
    SeekerModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
