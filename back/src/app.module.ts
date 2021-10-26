import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './modules/users/users.model';
import { AuthModule } from './modules/auth/auth.module';
import { NotesModule } from './modules/notes/notes.module';
import { Note } from './modules/notes/notes.model';
import { postgresConfig } from './config/postgres';
import { FilesModule } from './modules/files/files.module';
import { RedisCacheModule } from './modules/redis-cache/redis-cache.module';
import configurations from './config/configurations';

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
