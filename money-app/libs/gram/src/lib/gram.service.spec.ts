import { Test } from '@nestjs/testing';
import { GramService } from './gram.service';

describe('GramService', () => {
  let service: GramService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [GramService],
    }).compile();

    service = module.get(GramService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
