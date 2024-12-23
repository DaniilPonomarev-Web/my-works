import { Test } from '@nestjs/testing';
import { FileStoreService } from '../file-storage.service';
import { join } from 'path';

const pathFullImport = join(__dirname, 'mock-data', 'full-import');
const pathDiffImport = join(__dirname, 'mock-data', 'diff-import');

describe('1c store', () => {
  let service: FileStoreService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [FileStoreService],
    }).compile();

    service = app.get<FileStoreService>(FileStoreService);
  });

  it('should return a list of files full import', () => {
    const list = service.list(pathFullImport);
    expect(list).toEqual([
      'import.xml',
      'import1.xml',
      'offers.xml',
      'offers1.xml',
      'orders1.xml',
      'orders2.xml',
    ]);
  });

  it('should return a list of files diff import', () => {
    const list = service.list(pathDiffImport);
    expect(list).toEqual(['offers.xml']);
  });

  it('should be read file', () => {
    const res = service.read(pathFullImport + '/import.xml');
    expect(res).toBeInstanceOf(Buffer);
  });
});
