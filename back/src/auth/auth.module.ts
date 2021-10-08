import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { NotesModule } from '../notes/notes.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => NotesModule),
    JwtModule.register({
      secret: process.env.SECRET_JWT || 'SUPERSECRETKEY',
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
