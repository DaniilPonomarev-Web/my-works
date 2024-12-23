import { FileStoreService } from './file-storage.service';
import { Injectable } from '@nestjs/common';
import { XMLParser } from 'fast-xml-parser';

@Injectable()
export class OneSService {
  private parser: XMLParser;
  private queue: string[] = [];

  constructor(private readonly fileStoreService: FileStoreService) {
    this.parser = new XMLParser();
  }

  /**
   * Синхронизаци данных из 1с
   */
  async sync() {
    const paths = [
      {
        name: 'update',
        alias: 'diff-import',
      },
      {
        name: 'full',
        alias: 'full-import',
      },
    ];
    const storePath = <string>process.env['ONES_STORE'];

    const updateData: any = this.checkDataAvailability(storePath, paths);
    console.log(
      `Найдены файлы => Полная синхронизация: ${
        updateData?.full?.length ?? 0
      }, Обновление: ${updateData?.update?.length ?? 0}`
    );

    const keys = Object.keys(updateData);

    for (const key of keys) {
      this.queue.push(...updateData[key]);
    }

    this.process();
  }

  /**
   * Проверяем наличие данных для обновления
   */
  checkDataAvailability(storePath: string, paths: any[]) {
    let updateData = {};
    for (const { name, alias } of paths) {
      const files = this.fileStoreService
        .list(storePath + alias)
        .map((f) => storePath + alias + '/' + f);
      updateData = {
        ...updateData,
        [name]: files,
      };
    }

    return updateData;
  }

  async process() {
    console.log('Start process');

    for (const path of this.queue) {
      const xmlData = this.fileStoreService.read(path);
      const result = this.parser.parse(xmlData);
      // TODO формирование объекта
    }
  }
}
