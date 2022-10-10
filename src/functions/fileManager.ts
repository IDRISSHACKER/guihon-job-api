import * as fs from 'fs';
import { UPLOAD_FOLDER } from '../utils/Const';

export const removeFile = async (fileName: string): Promise<any> => {
  const filePath = '' + UPLOAD_FOLDER + '/' + fileName;

  if (fs.existsSync(filePath)) {
    await fs.unlink(filePath, (err) => {
      if (err) console.log(err);
    });
  } else {
    return false;
  }
};
