import { Injectable } from '@nestjs/common';
import { KafkaService } from '@erist-opt/kafka';
import { ILogData, NOTIFICATION_TELEGRAM_1C_EXCHANGE } from '@erist-opt/shared';
import { MinioLocalService } from '@erist-opt/minio';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class Notification1cService {
  constructor(
    private readonly kafkaService: KafkaService,
    private readonly minioLocalService: MinioLocalService
  ) {}

  async sendSnapshotNotification(logData: ILogData, type: string) {
    const fileName = `sync_snapshot_${new Date().toISOString()}.json`;
    const snapshotFilePath = await this.createSnapshotFile(logData, fileName);
    const fileContent = fs.readFileSync(snapshotFilePath);
    await this.minioLocalService.uploadSnapshot(
      `1c-${type}-log`,
      fileName,
      fileContent
    );
    const fileUrl = await this.minioLocalService.getPublicUrl(
      `1c-${type}-log`,
      fileName
    );
    await this.sendNotificationToTelegramOneCExchange(logData, type, fileUrl);
    fs.unlinkSync(snapshotFilePath);
  }

  async sendNotificationToTelegramOneCExchange(
    logData: ILogData,
    log: string,
    fileUrl: string
  ): Promise<void> {
    const message = `
Прошел обмен <b>${log}</b>
Добавлено - ${logData.created.length}
Обновлено - ${logData.updated.length}
Ошибок - ${
      logData.errorCreated.length +
      logData.errorUpdated.length +
      logData.errorUpsert.length
    }
Всего - ${logData.processed.length}
<a href="${fileUrl}">Скачать лог</a>`;
    await this.kafkaService.sendMessage(
      NOTIFICATION_TELEGRAM_1C_EXCHANGE,
      message
    );
  }

  createSnapshotFile = async (
    data: ILogData,
    fileName: string
  ): Promise<string> => {
    const filePath = path.join(__dirname, fileName);
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
        if (err) {
          return reject(`Ошибка создания снэпшота: ${err.message}`);
        }
        resolve(filePath);
      });
    });
  };
}
