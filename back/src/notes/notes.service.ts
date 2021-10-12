import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note-dto';
import { InjectModel } from '@nestjs/sequelize';
import { Note } from './notes.model';
import { UpdateNoteDto } from './dto/update-note-dto';
import { isAuthor } from '../utils/checkRights';
import { ACTIONS } from '../constants/actions';
import { FilesService } from '../files/files.service';
import { imageFileFilter } from '../utils/imageFilter';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Note) private noteRepository: typeof Note,
    private fileService: FilesService,
  ) {}

  async createNote(
    dto: CreateNoteDto,
    userId: number,
    image: Express.Multer.File,
  ) {
    imageFileFilter(image.originalname);
    const fileName: string = await this.fileService.createFile(image);
    return await this.noteRepository.create({
      ...dto,
      image: fileName,
      userId,
    });
  }

  async getAllNotes() {
    return await this.noteRepository.findAll();
  }

  async getSingleNote(id: number) {
    return await this.noteRepository.findOne({
      where: { id },
      include: { all: true },
    });
  }

  // !!!WARNING!!! ONLY IF THIS NEED
  // async deleteAllNotes() {
  //   return await this.noteRepository.destroy({
  //     where: {},
  //     truncate: true,
  //   });
  // }

  async updateNote(noteId: number, currentUserId: number, dto: UpdateNoteDto) {
    const note = await this.getSingleNote(noteId);
    if (!note) {
      throw new HttpException('This note is not exist!', HttpStatus.NOT_FOUND);
    }

    isAuthor(note.userId, currentUserId, ACTIONS.UPDATE, 'note');

    await this.noteRepository.update(
      { ...dto, updatedAt: new Date() },
      { where: { id: noteId } },
    );

    return this.getSingleNote(noteId);
  }

  async deleteNote(noteId: number, currentUserId: number) {
    const note = await this.getSingleNote(noteId);
    if (!note)
      throw new HttpException('This note is not exist!', HttpStatus.NOT_FOUND);

    isAuthor(note.userId, currentUserId, ACTIONS.DELETE, 'note');

    return await this.noteRepository.destroy({
      where: { id: noteId },
    });
  }
}
