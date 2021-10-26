import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from '../users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../users/users.model';
import { AuthModule } from '../auth/auth.module';
import { NotesModule } from '../notes/notes.module';
import { Note } from '../notes/notes.model';
import { postgresConfig } from '../../config/postgres';
import { FilesModule } from '../files/files.module';
import { RedisCacheModule } from '../redis-cache/redis-cache.module';
import configurations from '../../config/configurations';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
      load: [configurations],
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: postgresConfig.host,
      port: postgresConfig.port,
      username: postgresConfig.username,
      password: postgresConfig.password,
      database: postgresConfig.database,
      models: [User, Note],
      autoLoadModels: true,
    }),
    UsersModule,
    AuthModule,
    NotesModule,
    FilesModule,
    RedisCacheModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
