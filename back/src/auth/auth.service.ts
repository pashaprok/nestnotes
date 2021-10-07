import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../users/users.model';
import { CreateUserDto } from '../users/dto/create-user-dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user-dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: LoginUserDto) {
    const user = await this.validateUser(userDto);
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
    const hashPassword = await bcrypt.hash(userDto.password, 12);
    const user = await this.usersService.createUser({
      ...userDto,
      password: hashPassword,
    });

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
