import { ImageExtensions } from '../constants/regex/imageExtensions';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as path from 'path';

export function imageFileFilter(
  req: Express.Request,
  file: Express.Multer.File,
  callback: any,
) {
  if (!file.originalname.match(ImageExtensions)) {
    const fileExtension: string = path.extname(file.originalname);
    return callback(
      new HttpException(
        `Your file has an invalid image extension(${fileExtension}). Please upload only valid images(jpg, jpeg, png, gif)`,
        HttpStatus.BAD_REQUEST,
      ),
      false,
    );
  }

  return callback(null, true);
}
