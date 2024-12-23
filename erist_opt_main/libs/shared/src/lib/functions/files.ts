import * as crypto from 'crypto';
import { allowedExtensions } from '../variables';

/*Функции для работы с файлами */
export const filesFunctions = {
  async getFileExtension(filename: string) {
    const fileExtension = filename.split('.').pop();
    return fileExtension;
  },

  async hashNameFile(filename: string) {
    const timestamp = Date.now().toString();
    const fileExtension = filename.split('.').pop();
    const hashedFileName = crypto
      .createHash('md5')
      .update(timestamp)
      .digest('hex');
    const fileName = hashedFileName + '.' + fileExtension;
    return fileName;
  },
  isValidFileType(extension: string): boolean {
    return allowedExtensions.includes(extension.toLowerCase());
  },
  async getFileSize(readStream: any): Promise<number> {
    // console.log(readStream);

    let fileSize = 0;
    return new Promise<number>((resolve, reject) => {
      readStream
        .on('data', (chunk: any) => {
          fileSize += chunk.length;
        })
        .on('end', () => {
          resolve(fileSize);
        })
        .on('error', (error: any) => {
          reject(error);
        });
    });
  },
};
