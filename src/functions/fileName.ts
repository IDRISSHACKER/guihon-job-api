import { ulid } from 'ulid';
import { extname } from 'path';
import { IDENTIFIER_SUFIX } from '../utils/Const';

export const generateUniqueFileName = (file: string): string => {
  const UNIQUE_ID = ulid();

  const EXTENSION = extname(file);

  return `${IDENTIFIER_SUFIX}-${refractorFileName(
    file.split('.')[0],
  )}-${UNIQUE_ID}${EXTENSION}`;
};

const refractorFileName = (file: string): string => {
  return file.replace(' ', '-');
};
