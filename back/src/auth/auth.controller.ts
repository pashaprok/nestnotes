import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../users/users.model';
import { CreateUserDto } from '../users/dto/create-user-dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user-dto';
import { ValidationPipe } from '../pipes/validation.pipe';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, type: User })
  @UsePipes(ValidationPipe)
  @Post('/login')
  login(@Body() userDto: LoginUserDto) {
    return this.authService.login(userDto);
  }

  @ApiOperation({ summary: 'User registration' })
  @ApiResponse({ status: 200, type: User })
  @UsePipes(ValidationPipe)
  @Post('/register')
  register(@Body() userDto: CreateUserDto) {
    console.log(userDto);
    return this.authService.register(userDto);
  }
}
