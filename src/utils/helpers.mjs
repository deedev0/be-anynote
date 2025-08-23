import bcrypt from 'bcrypt';
import fs from 'fs';

const saltRounds = 10;

export const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password, salt);
};

export const comparePassword = (plain, hashed) =>
  bcrypt.compareSync(plain, hashed);

export const deleteImage = (path) => {
  fs.unlink(path, (err) => {
    if (err) console.error('Gagal menghapus file: ', err);
  });
}