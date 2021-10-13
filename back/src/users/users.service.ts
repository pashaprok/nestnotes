import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user-dto';
import { NotesService } from '../notes/notes.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private notesService: NotesService,
  ) {}

  async createUser(dto: CreateUserDto) {
    if (!dto.name) {
      dto.name = 'unknown';
    }
    return await this.userRepository.create(dto);
  }

  async getAllUsers() {
    return await this.userRepository.findAll();
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  async getUserById(id: number) {
    return await this.userRepository.findOne({
      where: { id },
      include: { all: true },
    });
  }

  async deleteUser(id: number) {
    return await this.userRepository.destroy({
      where: { id },
    });
  }

  async getNotesByUser(id: number) {
    return await this.notesService.getNotesByUser(id);
  }

  async deleteNotesByUser(id: number) {
    return await this.notesService.deleteAllUserNotes(id);
  }
}
