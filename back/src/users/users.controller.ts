import { Controller, Delete, Get, Param, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './users.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';
import { Note } from '../notes/notes.model';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  // find user by id (not required now)
  // @ApiOperation({ summary: 'Get one user' })
  // @ApiResponse({ status: 200, type: User })
  // @Get('/:id')
  // getOne(@Param() params) {
  //   return this.usersService.getUserById(params.id);
  // }

  @ApiOperation({ summary: 'Delete one user' })
  @ApiResponse({ status: 200 })
  @Delete('/:id')
  deleteUser(@Param() params) {
    return this.usersService.deleteUser(params.id);
  }

  @ApiOperation({ summary: 'Get my profile' })
  @ApiResponse({ status: 200, type: User })
  @Get('/me')
  getMyProfile(@Req() request: Request) {
    return this.usersService.getUserById(request.user.id);
  }

  @ApiOperation({ summary: 'Get my notes' })
  @ApiResponse({ status: 200, type: [Note] })
  @Get('/me/notes')
  getMyNotes(@Req() request: Request) {
    return this.usersService.getNotesByUser(request.user.id);
  }
}
