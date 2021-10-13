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
  UploadedFile,
  UseInterceptors,
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
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Notes')
@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @ApiOperation({ summary: 'Create new note' })
  @ApiResponse({ status: 200, type: Note })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createNote(
    @Body() dto: CreateNoteDto,
    @Req() request: Request,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.notesService.createNote(dto, request.user.id, image);
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
  @UseInterceptors(FileInterceptor('image'))
  updateNote(
    @Param() params,
    @Req() request: Request,
    @Body() dto: UpdateNoteDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.notesService.updateNote(params.id, request.user.id, dto, image);
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
