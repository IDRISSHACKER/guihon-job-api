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
import { CreateFileMigration1663314497286 } from '../../migrations/1663314497286-CreateFileMigration';
import {Seeker} from "../seeker/entities/seeker.entity";
import {Admin} from "../admin/entities/admin.entity";

export const ORM_CONFIG: any = TypeOrmModule.forRoot({
  type: DB_ENGINE,
  database: "dbprod.sqlite",
  entities: [Seeker, Admin],
  synchronize: true,
  autoLoadEntities: true,
  migrationsTableName: 'media_migration_table',
  //logging: true,
});

export default new DataSource({
  type: DB_ENGINE,
  database: "dbprod.sqlite",
  entities: [Seeker, Admin],
  migrations: [CreateFileMigration1663314497286],
  //logging: true
});
