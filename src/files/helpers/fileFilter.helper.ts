export const fileFilter = (reg, file: Express.Multer.File, callback) => {
  if (!file) {
    return callback(new Error('Archivo Vacio'), false);
  }

  const fileExtension = file.mimetype.split('/')[1];
  const validExtension = ['jpeg', 'jpg', 'png'];

  if (validExtension.includes(fileExtension)) {
    return callback(null, true);
  }
  callback(null, false);
};
