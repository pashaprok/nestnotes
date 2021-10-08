import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note-dto';
import { InjectModel } from '@nestjs/sequelize';
import { Note } from './notes.model';
import { UpdateNoteDto } from './dto/update-note-dto';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note) private noteRepository: typeof Note) {}

  async createNote(dto: CreateNoteDto, userId: number) {
    return await this.noteRepository.create({ ...dto, userId });
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
    if (note.userId !== currentUserId) {
      throw new HttpException(
        'Only author can update note!',
        HttpStatus.FORBIDDEN,
      );
    }

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
    if (note.userId !== currentUserId)
      throw new HttpException(
        'Only author can delete note!',
        HttpStatus.FORBIDDEN,
      );

    return await this.noteRepository.destroy({
      where: { id: noteId },
    });
  }
}
