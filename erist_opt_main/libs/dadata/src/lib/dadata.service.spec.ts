import { Test } from '@nestjs/testing';
import { DadataService } from './dadata.service';

describe('DadataService', () => {
  let service: DadataService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [DadataService],
    }).compile();

    service = module.get(DadataService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
