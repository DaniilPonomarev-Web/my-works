import { Injectable } from '@nestjs/common';
import {
  SearchAreasDTO,
  SearchAreaWithLabelDTO,
} from './other/searchAreas.dto';
import { SearchAreaEnum, searchAreaLabels } from '@web-clients-backend/shared';

@Injectable()
export class SearchAreasService {
  async getSearchAreas(input: string): Promise<SearchAreasDTO> {
    const sanitizedInput = input.replace(/%/g, '.*');

    if (sanitizedInput.length < 5) {
      return {
        areas: [],
      };
    }

    const isFiveOrMoreLettersWithSymbols =
      /^[a-zA-Zа-яА-ЯёЁ\W]{5,}$/.test(sanitizedInput) &&
      /[a-zA-Zа-яА-ЯёЁ]/.test(sanitizedInput);

    const isFiveOrMoreDigitsWithSymbols =
      /^[\d\W]{5,}$/.test(sanitizedInput) && /\d/.test(sanitizedInput);

    const isMoreThanFiveMixed =
      sanitizedInput.length > 5 &&
      /[a-zA-Zа-яА-ЯёЁ]/.test(sanitizedInput) &&
      /\d/.test(sanitizedInput);

    const areas = isFiveOrMoreLettersWithSymbols
      ? [
          SearchAreaEnum.FIO,
          SearchAreaEnum.TITLE,
          SearchAreaEnum.PROCESSES,
          SearchAreaEnum.SERVICES,
          SearchAreaEnum.TARIFFS,
        ]
      : isFiveOrMoreDigitsWithSymbols
      ? [
          SearchAreaEnum.PASSPORT,
          SearchAreaEnum.CONTRACT_NUMBER,
          SearchAreaEnum.ACCOUNT_NUMBER,
          SearchAreaEnum.MSISDN,
          SearchAreaEnum.SUBSCRIBER_NUMBER,
          SearchAreaEnum.DGN,
          SearchAreaEnum.ICC,
        ]
      : isMoreThanFiveMixed
      ? [
          SearchAreaEnum.TITLE,
          SearchAreaEnum.PROCESSES,
          SearchAreaEnum.SERVICES,
          SearchAreaEnum.TARIFFS,
        ]
      : [];

    const areasWithLabels: SearchAreaWithLabelDTO[] = areas.map((area) => ({
      area,
      label: searchAreaLabels[area],
    }));

    return { areas: areasWithLabels };
  }
}
