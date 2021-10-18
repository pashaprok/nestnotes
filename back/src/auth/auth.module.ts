import { forwardRef, Logger, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { NotesModule } from '../notes/notes.module';
import { authConfig } from '../config/auth';

@Module({
  providers: [AuthService, Logger],
  controllers: [AuthController],
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => NotesModule),
    JwtModule.register({
      secret: authConfig.jwt.secret,
      signOptions: {
        expiresIn: authConfig.jwt.expire,
      },
    }),
  ],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
