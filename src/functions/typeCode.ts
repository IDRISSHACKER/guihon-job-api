import fs from 'fs';
import { UPLOAD_FOLDER } from '../utils/Const';

export const createTypeCode = (typeCode: string): void => {
  const folderName = UPLOAD_FOLDER + '+' + typeCode;

  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
  }
};
