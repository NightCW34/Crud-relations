import { v4 as uuid } from 'uuid';

export const fileName = (reg, file: Express.Multer.File, callback) => {
  if (!file) return callback(new Error('Archivo Vacio'), false);

  const fileExtension = file.mimetype.split('/')[1];
  const fileName = `${uuid()}.${fileExtension}`;

  callback(null, fileName);
};
