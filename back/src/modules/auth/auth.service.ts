import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../users/users.model';
import { CreateUserDto } from '../users/dto/create-user-dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user-dto';
import { authConfig } from '../../config/auth';
import { Email } from '../../utils/email';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private logger: Logger,
  ) {}

  async login(userDto: LoginUserDto) {
    const user = await this.validateUser(userDto);
    this.logger.log(`User ${user.email} is logged in!`);
    return this.generateToken(user);
  }

  async register(userDto: CreateUserDto) {
    const checkUser = await this.usersService.getUserByEmail(userDto.email);
    if (checkUser) {
      throw new HttpException(
        'This email is already used!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(
      userDto.password,
      authConfig.bcrypt.saltRounds,
    );
    const user: User = await this.usersService.createUser({
      ...userDto,
      password: hashPassword,
    });

    await new Email(user).sendWelcome();
    this.logger.log(`User ${user.email} is registered!`);

    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = {
      id: user.id,
    };

    return {
      token: this.jwtService.sign(payload),
      user,
    };
  }

  private async validateUser(userDto: LoginUserDto) {
    const userCheck = await this.usersService.getUserByEmail(userDto.email);
    if (!userCheck) {
      throw new UnauthorizedException({
        message: 'Incorrect email or password!',
      });
    }

    const passwordCheck = await bcrypt.compare(
      userDto.password,
      userCheck.password,
    );

    if (!passwordCheck) {
      throw new UnauthorizedException({
        message: 'Incorrect email or password!',
      });
    }

    return userCheck;
  }
}
