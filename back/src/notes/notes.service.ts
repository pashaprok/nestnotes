import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note-dto';
import { InjectModel } from '@nestjs/sequelize';
import { Note } from './notes.model';
import { UpdateNoteDto } from './dto/update-note-dto';
import { isAuthor } from '../utils/checkRights';
import { ACTIONS } from '../constants/actions';
import { FilesService } from '../files/files.service';
import * as path from 'path';

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
    return await this.noteRepository.create({
      ...dto,
      image: image.filename,
      userId,
    });
  }

  async getAllNotes() {
    return await this.noteRepository.findAll();
  }

  async getNotesByUser(userId: number) {
    return await this.noteRepository.findAll({
      where: { userId },
    });
  }

  async deleteAllUserNotes(userId: number) {
    const userNotes: Note[] = await this.getNotesByUser(userId);
    const notesIds: number[] = userNotes.map((note: Note) => note.id);

    for (let i = 0; i < notesIds.length; i++) {
      await this.deleteNote(notesIds[i], userId);
    }
  }

  async getSingleNote(id: number) {
    return await this.noteRepository.findOne({
      where: { id },
      include: { all: true },
    });
  }

  // !!!WARNING!!! ONLY IF THIS NEED
  async deleteAllNotes() {
    return await this.noteRepository.destroy({
      truncate: true,
    });
  }

  async updateNote(
    noteId: number,
    currentUserId: number,
    dto: UpdateNoteDto,
    image: Express.Multer.File,
  ) {
    const note: Note = await this.getSingleNote(noteId);
    if (!note)
      throw new HttpException('This note is not exist!', HttpStatus.NOT_FOUND);

    isAuthor(note.userId, currentUserId, ACTIONS.UPDATE, 'note');
    await this.fileService.deleteFile(path.join(image.destination, note.image));

    await this.noteRepository.update(
      { ...dto, image: image.filename, updatedAt: new Date() },
      { where: { id: noteId } },
    );

    return this.getSingleNote(noteId);
  }

  async deleteNote(noteId: number, currentUserId: number) {
    const note = await this.getSingleNote(noteId);
    if (!note)
      throw new HttpException('This note is not exist!', HttpStatus.NOT_FOUND);

    isAuthor(note.userId, currentUserId, ACTIONS.DELETE, 'note');

    const noteImage: string = path.join(
      path.resolve(__dirname, '..', 'static', 'images', 'notes'),
      note.image,
    );
    await this.fileService.deleteFile(noteImage);

    return await this.noteRepository.destroy({
      where: { id: noteId },
    });
  }
}
