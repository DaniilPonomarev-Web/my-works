import { Injectable } from '@nestjs/common';
import PdfPrinter from 'pdfmake';
import { AppLoggerLoki } from '@erist-opt/logs';

import { MinioLocalService } from '@erist-opt/minio';
import { Guid } from 'guid-typescript';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { createInvoicePDF, invoice } from './pdf';
import { OrderDTO } from '@erist-opt/shared';
import dayjs from 'dayjs';
import axios from 'axios';

@Injectable()
export class GenerateInvoiceService {
  private fontUrls = {
    Roboto: {
      normal: 'https://static.erist.store/fonts/Roboto-Regular.ttf',
      bold: 'https://static.erist.store/fonts/Roboto-Medium.ttf',
      italics: 'https://static.erist.store/fonts/Roboto-Italic.ttf',
      bolditalics: 'https://static.erist.store/fonts/Roboto-MediumItalic.ttf',
    },
  };

  constructor(
    private readonly minioLocalService: MinioLocalService,
    private AppLoggerLoki: AppLoggerLoki
  ) {}

  private async loadFont(url: string): Promise<Buffer> {
    try {
      this.AppLoggerLoki.log(`Загрузка шрифта из ${url}`, 'api');
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      return Buffer.from(response.data, 'binary');
    } catch (error) {
      if (error instanceof Error) {
        this.AppLoggerLoki.error(
          `Ошибка при загрузке шрифта из ${url}: ${error.message}`,
          'api'
        );
        throw error;
      }
      this.AppLoggerLoki.error(`Ошибка при загрузке шрифта из ${url}`, 'api');
      throw error;
    }
  }

  private async loadFonts() {
    try {
      this.AppLoggerLoki.log('Загрузка шрифтов...', 'api');
      const fonts = {
        Roboto: {
          normal: await this.loadFont(this.fontUrls.Roboto.normal),
          bold: await this.loadFont(this.fontUrls.Roboto.bold),
          italics: await this.loadFont(this.fontUrls.Roboto.italics),
          bolditalics: await this.loadFont(this.fontUrls.Roboto.bolditalics),
        },
      };
      this.AppLoggerLoki.log('Шрифты успешно загружены', 'api');
      return fonts;
    } catch (error) {
      if (error instanceof Error) {
        this.AppLoggerLoki.error(
          `Ошибка при загрузке шрифтов: ${error.message}`,
          'api'
        );
        throw error;
      }
      this.AppLoggerLoki.error(`Ошибка при загрузке шрифтов`, 'api');
      throw error;
    }
  }

  private async createPdfDoc(): Promise<PDFKit.PDFDocument> {
    try {
      this.AppLoggerLoki.log('Создание PDF документа...', 'api');
      const fonts = await this.loadFonts();
      const printer = new PdfPrinter(fonts);
      const docDefinition = this.createInvoiceDocDefinition();

      const options = {};
      return printer.createPdfKitDocument(docDefinition, options);
    } catch (error) {
      if (error instanceof Error) {
        this.AppLoggerLoki.error(
          `Ошибка при создании PDF документа: ${error.message}`,
          'api'
        );
        throw error;
      }
      this.AppLoggerLoki.error(
        `Ошибка при создании PDF документа`,

        'api'
      );
      throw error;
    }
  }

  private createInvoiceDocDefinition(): TDocumentDefinitions {
    this.AppLoggerLoki.log('Создание определения документа инвойса...', 'api');
    const docDefinition: TDocumentDefinitions = invoice;
    this.AppLoggerLoki.log(
      'Определение документа инвойса успешно создано',
      'api'
    );
    return docDefinition;
  }

  private async getPdfBuffer(doc: PDFKit.PDFDocument): Promise<Buffer> {
    this.AppLoggerLoki.log('Получение буфера PDF...', 'api');
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => {
        this.AppLoggerLoki.log('Буфер PDF успешно получен', 'api');
        resolve(Buffer.concat(chunks));
      });
      doc.on('error', (error) => {
        this.AppLoggerLoki.error(
          `Ошибка при получении буфера PDF: ${error.message}`,
          'api'
        );
        reject(error);
      });
      doc.end();
    });
  }

  private async uploadPdfToMinio(buffer: Buffer): Promise<string> {
    this.AppLoggerLoki.log('Загрузка PDF в MinIO...', 'api');
    const bucketName = 'invoices';
    const fileName = `${Guid.create().toString()}.pdf`;

    try {
      await this.minioLocalService.uploadPdf(bucketName, fileName, buffer);
      this.AppLoggerLoki.log(
        `PDF успешно загружен в MinIO, имя файла ${fileName}`,
        'api'
      );
      return fileName;
    } catch (error) {
      if (error instanceof Error) {
        this.AppLoggerLoki.error(
          `Ошибка при загрузке PDF в MinIO: ${error.message}`,
          'api'
        );
        throw error;
      }
      this.AppLoggerLoki.error(`Ошибка при загрузке PDF в MinIO`, 'api');
      throw error;
    }
  }

  async createAndUploadPdf(): Promise<string> {
    try {
      this.AppLoggerLoki.log('Создание и загрузка PDF...', 'api');
      const doc = await this.createPdfDoc();
      const pdfBuffer = await this.getPdfBuffer(doc);
      return this.uploadPdfToMinio(pdfBuffer);
    } catch (error) {
      if (error instanceof Error) {
        this.AppLoggerLoki.error(
          `Ошибка при создании и загрузке PDF: ${error.message}`,
          'api'
        );
        throw error;
      }
      this.AppLoggerLoki.error(`Ошибка при создании и загрузке PDF`, 'api');
      throw error;
    }
  }

  async createInvoice(
    order: OrderDTO,
    orderId1c: string,
    orderDocCode: string
  ): Promise<OrderDTO | null> {
    this.AppLoggerLoki.log(
      `Создание инвойса для заказа ID=${order.id}...`,
      'api'
    );
    try {
      const doc = await this.createInvoicePDF(order, orderId1c, orderDocCode);
      const pdfBuffer = await this.getPdfBuffer(doc);
      const hrefForInvoice = await this.uploadPdfToMinio(pdfBuffer);

      const orderrderDTO: OrderDTO = {
        ...order,
        hrefForInvoice,
      };
      this.AppLoggerLoki.log(
        `Инвойс для заказа ID=${order.id} успешно создан и загружен`,
        'api'
      );
      return orderrderDTO;
    } catch (error) {
      if (error instanceof Error) {
        this.AppLoggerLoki.error(
          `Ошибка при создании инвойса для заказа ID=${order.id}: ${error.message}`,
          'api'
        );
        return null;
      }
      this.AppLoggerLoki.error(
        `Ошибка при создании инвойса для заказа ID=${order.id}`,
        'api'
      );
      return null;
    }
  }

  private async createInvoicePDF(
    order: OrderDTO,
    orderId1c: string,
    orderDocCode: string
  ): Promise<PDFKit.PDFDocument> {
    this.AppLoggerLoki.log(
      `Создание PDF инвойса для заказа ID=${order.id}...`,
      'api'
    );
    try {
      const fonts = await this.loadFonts();
      const printer = new PdfPrinter(fonts);
      const docDefinition = this.createInvoiceDoc(
        order,
        orderId1c,
        orderDocCode
      );

      const options = {};
      return printer.createPdfKitDocument(docDefinition, options);
    } catch (error) {
      if (error instanceof Error) {
        this.AppLoggerLoki.error(
          `Ошибка при создании PDF инвойса для заказа ID=${order.id}: ${error.message}`,
          'api'
        );
        throw error;
      }
      this.AppLoggerLoki.error(
        `Ошибка при создании PDF инвойса для заказа ID=${order.id}`,
        'api'
      );
      throw error;
    }
  }

  private createInvoiceDoc(
    order: OrderDTO,
    orderId1c: string,
    orderDocCode: string
  ): TDocumentDefinitions {
    this.AppLoggerLoki.log(
      `Создание определения документа инвойса для заказа ID=${order.id}...`,
      'api'
    );
    const orderPaymentDate = dayjs(order.registred)
      .add(1, 'day')
      .format('DD.MM.YYYY');

    const orderDate = dayjs(order.registred).format('DD.MM.YYYY');

    const docDefinition: TDocumentDefinitions = createInvoicePDF(
      { ...order, registred: orderDate },
      orderPaymentDate,
      orderId1c,
      orderDocCode
    );

    this.AppLoggerLoki.log(
      `Определение документа инвойса успешно создано для заказа ID=${order.id}`,
      'api'
    );
    return docDefinition;
  }

  async getPdfHref(filename: string, bucketName: string): Promise<string> {
    this.AppLoggerLoki.log(
      `Получение ссылки на PDF из MinIO для файла ${filename}...`,
      'api'
    );
    try {
      const href = await this.minioLocalService.getPublicUrl(
        bucketName,
        filename
      );
      if (!href) {
        this.AppLoggerLoki.error(
          `Ссылка на инвойс не найдена для файла ${filename}`,
          'api'
        );
        return 'https://opt.erist.store';
      }

      this.AppLoggerLoki.log(
        `Ссылка на PDF успешно получена для файла ${filename}`,
        'api'
      );
      return href;
    } catch (error) {
      if (error instanceof Error) {
        this.AppLoggerLoki.error(
          `Ошибка при создании ссылки на инвойс: ${error.message}`,
          'api'
        );
        return 'https://opt.erist.store';
      }

      this.AppLoggerLoki.error(`Ошибка при создании ссылки на инвойс`, 'api');
      return 'https://opt.erist.store';
    }
  }
}
