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
import { ClientModule } from './client/client.module';
import { EmployeModule } from './employe/employe.module';
import { PresenceModule } from './presence/presence.module';
import { ImageModule } from './image/image.module';
import { AppMiddleware } from './Middlewares/AppMiddleware';
import {PlaningModule} from "./planing/planing.module";
import {TacheModule} from "./tache/tache.module";
import {EmployetacheModule} from "./employetache/employetache.module";

@Module({
  imports: [
    ORM_CONFIG,
    MulterModule.register({ dest: TMP_FOLDER }),

    EmployeModule,
    ClientModule,
    PresenceModule,
    ImageModule,
    PlaningModule,
    TacheModule,
    EmployetacheModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AppMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
