import { describe } from 'node:test';
import { OneSService } from '../one-s-integration.service';
import { Test } from '@nestjs/testing';
import { join } from 'path';
import { FileStoreService } from '../file-storage.service';

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
const storePath = join(__dirname, 'mock-data/');

describe('1c integrate', () => {
  let service: OneSService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [OneSService, FileStoreService],
    }).compile();

    service = app.get<OneSService>(OneSService);
  });

  it('sholdbe ok', () => {
    const result = service.checkDataAvailability(storePath, paths);

    expect(result).toEqual({
      full: [
        'import.xml',
        'import1.xml',
        'offers.xml',
        'offers1.xml',
        'orders1.xml',
        'orders2.xml',
      ],
      update: ['offers.xml'],
    });
  });
});
