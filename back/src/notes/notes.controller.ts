import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note-dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Note } from './notes.model';
import { UpdateNoteDto } from './dto/update-note-dto';

@ApiTags('Notes')
@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @ApiOperation({ summary: 'Create new note' })
  @ApiResponse({ status: 200, type: Note })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  createNote(@Body() dto: CreateNoteDto, @Req() request: Request) {
    return this.notesService.createNote(dto, request.user.id);
  }

  @ApiOperation({ summary: 'Get single note' })
  @ApiResponse({ status: 200, type: Note })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  getNote(@Param() params) {
    return this.notesService.getSingleNote(params.id);
  }

  @ApiOperation({ summary: 'Update note' })
  @ApiResponse({ status: 200, type: Note })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  updateNote(
    @Param() params,
    @Req() request: Request,
    @Body() dto: UpdateNoteDto,
  ) {
    return this.notesService.updateNote(params.id, request.user.id, dto);
  }

  @ApiOperation({ summary: 'Delete note' })
  @ApiResponse({ status: 200, type: Note })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  deleteNote(@Param() params, @Req() request: Request) {
    return this.notesService.deleteNote(params.id, request.user.id);
  }

  @ApiOperation({ summary: 'Get all notes' })
  @ApiResponse({ status: 200, type: [Note] })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  getAllNotes() {
    return this.notesService.getAllNotes();
  }

  // @ApiOperation({ summary: 'Delete all notes' })
  // @ApiResponse({ status: 200, type: [Note] })
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  // @Delete()
  // deleteAllNotes() {
  //   return this.notesService.deleteAllNotes();
  // }
}