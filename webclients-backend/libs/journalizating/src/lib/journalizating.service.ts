import {
  ICreateJournal,
  IJournal,
  ISearchJournal,
  Journal,
} from '@web-clients-backend/shared';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class JournalizatingService {
  constructor(
    @InjectRepository(Journal)
    private readonly logsAdminRepo: Repository<Journal>,
    private readonly esService: ElasticsearchService
  ) {}

  /**
   * @description Проверяет наличие индекса 'journals' в Elasticsearch, и если его нет, создает индекс с необходимыми маппингами.
   * @returns {Promise<void>} Возвращает пустое обещание после выполнения проверки и создания индекса (если необходимо).
   */
  async createIndexIfNotExists() {
    const indexExists = await this.esService.indices.exists({
      index: 'journals',
    });
    if (!indexExists.body) {
      await this.esService.indices.create({
        index: 'journals',
        body: {
          mappings: {
            properties: {
              service: { type: 'text' },
              admin: { type: 'text' },
              text: { type: 'text' },
              additionalData: {
                properties: {
                  title: { type: 'text' },
                  name: { type: 'text' },
                  id: { type: 'keyword' },
                },
              },
              registred: { type: 'date' },
            },
          },
        },
      });
    }
  }

  /**
   * @description Создает новый лог записи в базе данных и Elasticsearch.
   * @param {ICreateJournal} data - Данные для создания новой записи лога.
   * @returns {Promise<void>} Возвращает пустое обещание после создания лога.
   */
  async createLog(data: ICreateJournal) {
    await this.createLogData(data);
  }

  /**
   * @description Сохраняет лог в базе данных и индексирует его в Elasticsearch.
   * @param {ICreateJournal} payload - Данные для создания и индексирования записи лога.
   * @returns {Promise<boolean>} Возвращает true, если запись лога была успешно создана и индексирована, иначе false.
   */
  async createLogData(payload: ICreateJournal): Promise<boolean> {
    await this.createIndexIfNotExists();
    const log = await this.logsAdminRepo.save(payload);
    if (log) {
      // Индексируем лог в Elasticsearch после сохранения в базе данных
      await this.esService.index({
        index: 'journals',
        id: log.id,
        body: log,
      });

      return true;
    }
    return false;
  }

  /**
   * @description Получает все журналы (логи) из базы данных.
   * @returns {Promise<IJournal[]>} Массив всех записей лога из базы данных.
   */
  async getAllLogs(): Promise<IJournal[]> {
    return this.logsAdminRepo.find();
  }

  /**
   * @description Выполняет поиск журналов (логов) в Elasticsearch с фильтрацией по параметрам, таким как дата, сервис, администратор, и дополнительные данные.
   * @param {ISearchJournal} payload - Объект фильтров для поиска записей в журналах.
   * @returns {Promise<IJournal[] | null>} Возвращает массив записей лога, соответствующих условиям поиска, или null, если результаты не найдены.
   */
  async searchLogs(payload: ISearchJournal): Promise<IJournal[] | null> {
    if (payload.fromDate) {
      const fromDateObj = new Date(payload.fromDate);
      fromDateObj.setHours(0, 0, 0, 0);
      payload.fromDate = fromDateObj.toISOString();
    }

    if (payload.toDate) {
      const toDateObj = new Date(payload.toDate);
      toDateObj.setHours(23, 59, 59, 999);
      payload.toDate = toDateObj.toISOString();
    }

    if (!payload.fromDate || !payload.toDate) {
      const now = new Date();

      const startOfDay = new Date(now);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(now);
      endOfDay.setHours(23, 59, 59, 999);

      // Использовать текущий день, если даты не были переданы
      payload.fromDate = payload.fromDate || startOfDay.toISOString();
      payload.toDate = payload.toDate || endOfDay.toISOString();
    }

    const mustConditions: any[] = [];

    if (payload.service) {
      const service = payload.service;
      mustConditions.push({ match: { service } });
    }

    if (payload.admin) {
      const admin = payload.admin;
      mustConditions.push({ match: { admin } });
    }

    if (payload.fromDate && payload.toDate) {
      mustConditions.push({
        range: {
          registred: {
            gte: payload.fromDate,
            lte: payload.toDate,
          },
        },
      });
    }

    if (payload.title || payload.dataId) {
      const shouldConditions: any[] = [];

      if (payload.title) {
        const title = payload.title;
        shouldConditions.push(
          { match: { 'additionalData.title': title } },
          { match: { 'additionalData.name': title } }
        );
      }

      if (payload.dataId) {
        const dataId = payload.dataId;
        shouldConditions.push({
          term: { 'additionalData.id': dataId },
        }); //term для ===
      }

      mustConditions.push({
        bool: {
          should: shouldConditions,
          minimum_should_match: 1, // хотя бы одно условие должно быть выполнено
        },
      });
    }

    const response = await this.esService.search({
      index: 'journals',
      size: 1500,
      body: {
        query: {
          bool: {
            must: mustConditions,
          },
        },
      },
    });

    const hits = response.body.hits?.hits;
    if (!hits || hits.length === 0) {
      return null;
    }

    const maphits = hits.map((hit: any) => {
      // const registredDate = new Date(hit._source.registred);// Преобразуем строку в объект Date
      return {
        ...hit._source,
        registred: hit._source.registred,
      } as IJournal;
    });
    return maphits;
  }
}
