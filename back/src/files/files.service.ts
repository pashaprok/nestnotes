import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
  async createFile(file): Promise<string> {
    try {
      const fileExtension: string = path.extname(file.originalname);
      const fileName = `${uuid.v4()}${fileExtension}`;
      const filePath: string = path.resolve(
        __dirname,
        '..',
        'static',
        'images',
        'notes',
      );
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch (e) {
      throw new HttpException(
        'There was an error uploading the image',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteFile(filename): Promise<string> {
    try {
      const filePath: string = path.resolve(
        __dirname,
        '..',
        'static',
        'images',
        'notes',
      );
      if (!fs.existsSync(path.join(filePath, filename))) {
        return 'File is not exist';
      }

      fs.unlinkSync(path.join(filePath, filename));
      return filename;
    } catch (e) {
      throw new HttpException(
        'There was an error deleting the image',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
