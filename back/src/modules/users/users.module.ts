import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { AuthModule } from '../auth/auth.module';
import { Note } from '../notes/notes.model';
import { NotesModule } from '../notes/notes.module';
import { RedisCacheModule } from '../redis-cache/redis-cache.module';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
    SequelizeModule.forFeature([User, Note]),
    forwardRef(() => AuthModule),
    NotesModule,
    RedisCacheModule,
  ],
  exports: [UsersService],
})
export class UsersModule {}
