import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import {
  DB_ENGINE,
  DB_HOST,
  DB_NAME,
  DB_PORT,
  DB_USER,
  DB_PASS,
} from '../utils/Const';
import { Employe } from '../employe/entities/employe.entity';
import { Client } from '../client/entities/client.entity';
import { Presence } from '../presence/entities/presence.entity';
import { Image } from '../image/entities/image.entity';
import { CreateFileMigration1671463839305 } from '../../migrations/1671463839305-CreateFileMigration';
import { CreateFileMigration1671728981770 } from '../../migrations/1671728981770-CreateFileMigration';
import { CreateFileMigration1671801380529 } from '../../migrations/1671801380529-CreateFileMigration';
import { CreateFileMigration1671965518327 } from '../../migrations/1671965518327-CreateFileMigration';
import { CreateFileMigration1671965718713 } from '../../migrations/1671965718713-CreateFileMigration';
import { CreateFileMigration1672050204466 } from '../../migrations/1672050204466-CreateFileMigration';
import { CreateFileMigration1672051703478 } from '../../migrations/1672051703478-CreateFileMigration';
import { CreateFileMigration1672053182999 } from '../../migrations/1672053182999-CreateFileMigration';
import { CreateFileMigration1672053552355 } from '../../migrations/1672053552355-CreateFileMigration';

export const ORM_CONFIG: any = TypeOrmModule.forRoot({
  type: DB_ENGINE,
  database: 'dbprod5.sqlite',
  entities: [Employe, Client, Presence, Image],
  synchronize: true,
  autoLoadEntities: true,
  migrationsTableName: 'media_migration_table',
  //logging: true,
});

export default new DataSource({
  type: DB_ENGINE,
  database: 'dbprod5.sqlite',
  entities: [Employe, Client, Presence, Image],
  migrations: [CreateFileMigration1672053552355],
  //logging: true,
  //synchronize: true
});
