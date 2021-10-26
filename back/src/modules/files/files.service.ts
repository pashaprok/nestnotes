import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FilesService {
  async createFile(file): Promise<void> {
    try {
      const filePath: string = file.destination;
      if (!fs.existsSync(filePath)) fs.mkdirSync(filePath, { recursive: true });

      fs.writeFileSync(path.join(file.path), file.buffer);
    } catch (e) {
      throw new HttpException(
        'There was an error uploading the image',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteFile(filepath): Promise<void> {
    try {
      if (!fs.existsSync(filepath)) return;
      fs.unlinkSync(filepath);
    } catch (e) {
      throw new HttpException(
        'There was an error deleting the image',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
