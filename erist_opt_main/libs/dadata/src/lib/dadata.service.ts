import { DadataMethod, DadataResponse } from '@erist-opt/shared';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DadataService {
  constructor(private readonly httpService: HttpService) {}

  async getDetailsByInn(inn: string): Promise<DadataResponse | null> {
    const data = {
      query: inn,
    };

    try {
      const response = await this.httpService.axiosRef.post(
        DadataMethod.suggestions.getInfoByInn,
        data
      );

      return response.data;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOTFOUND') {
        // console.warn(error);

        return null;
      }
      return null;
    }
  }
}
