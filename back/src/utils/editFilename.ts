import * as path from 'path';
import * as uuid from 'uuid';

export function editFileName(
  req: Express.Request,
  file: Express.Multer.File,
  callback: any,
) {
  const fileExtension: string = path.extname(file.originalname);
  const newFilename = `${uuid.v4()}${fileExtension}`;
  callback(null, `${newFilename}`);
}
