import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

const storePath = <string>process.env['ONES_STORE'];

@Injectable()
export class FileStoreService {
  /**
   * Проверяем хранилище на наличие файлов
   */
  list(path: string) {
    return fs.readdirSync(path).map((file) => file);
  }

  read(path: string) {
    return fs.readFileSync(path);
  }
}
