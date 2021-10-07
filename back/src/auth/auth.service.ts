import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
// import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from '../users/users.model';
import { CreateUserDto } from '../users/dto/create-user-dto';
import { UsersService } from '../users/users.service';
// import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
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

  private async validateUser(userDto: CreateUserDto) {
    const userCheck = await this.usersService.getUserByEmail(userDto.email);
    const passwordCheck = await bcrypt.compare(
      userDto.password,
      userCheck.password,
    );
    if (userCheck && passwordCheck) {
      return userCheck;
    }
    throw new UnauthorizedException({ message: 'Invalid email or password!' });
  }
}
