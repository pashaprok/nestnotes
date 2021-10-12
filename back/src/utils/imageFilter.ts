import { ImageExtensions } from '../constants/regex/imageExtensions';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as path from 'path';

export function imageFileFilter(filename): void {
  if (!filename.match(ImageExtensions)) {
    const fileExtension: string = path.extname(filename);
    throw new HttpException(
      `Your file has an invalid image extension(${fileExtension}). Please upload only valid images(jpg, jpeg, png, gif)`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
