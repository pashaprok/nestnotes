import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user-dto';
import { NotesService } from '../notes/notes.service';
import { RedisCacheService } from '../redis-cache/redis-cache.service';
import { Note } from '../notes/notes.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private notesService: NotesService,
    private cacheManager: RedisCacheService,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    if (!dto.name) {
      dto.name = 'unknown';
    }
    const user: User = await this.userRepository.create(dto);
    await this.cacheManager.set(user.email, JSON.stringify(user));
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async getUserByEmail(email: string): Promise<User> {
    const userCache: User = JSON.parse(
      <string>await this.cacheManager.get(email),
    );

    if (userCache) {
      return userCache;
    } else {
      const userDB: User = await this.userRepository.findOne({
        where: { email },
      });
      await this.cacheManager.set(userDB.email, JSON.stringify(userDB));
      return userDB;
    }
  }

  async getUserById(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: { id },
      include: { all: true },
    });
  }

  async deleteUser(id: number): Promise<number> {
    const userDB: User = await this.getUserById(id);
    await this.cacheManager.del(userDB.email);
    return await this.userRepository.destroy({
      where: { id },
    });
  }

  async getNotesByUser(id: number): Promise<Note[]> {
    return await this.notesService.getNotesByUser(id);
  }

  async deleteNotesByUser(id: number): Promise<void> {
    return await this.notesService.deleteAllUserNotes(id);
  }
}
