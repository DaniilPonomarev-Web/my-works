import { Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { GenerateInvoiceService } from './generate-invoice.service';

@Controller('pdf')
export class GenerateInvoiceController {
  constructor(
    private readonly generateInvoiceService: GenerateInvoiceService
  ) {}

  @Post('generate')
  async generatePdf() {
    try {
      const fileName = await this.generateInvoiceService.createAndUploadPdf();
      return { message: 'PDF generated and uploaded successfully', fileName };
    } catch (error) {
      throw new Error(`Failed to generate and upload PDF: ${error.message}`);
    }
  }
}
