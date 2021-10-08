import { forwardRef, Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/users.model';
import { Note } from './notes.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [NotesController],
  providers: [NotesService],
  imports: [
    SequelizeModule.forFeature([User, Note]),
    forwardRef(() => AuthModule),
  ],
})
export class NotesModule {}
