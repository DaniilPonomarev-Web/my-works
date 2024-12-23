import { Setting, SettingView } from '@money-app/entities';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SettingService {
  private logger = new Logger(SettingService.name);
  constructor(
    @InjectRepository(Setting)
    private readonly settingRepo: Repository<Setting>,
    @InjectRepository(SettingView)
    private readonly settingViewRepo: Repository<SettingView>
  ) {}

  getSettingByKey(key: string) {
    return this.settingViewRepo.createQueryBuilder().where({ key }).getOne();
  }

  private getSettings() {
    return this.settingRepo.find();
  }

  setMimeTypes(mimeTypes: string[]) {
    return this.settingRepo
      .createQueryBuilder()
      .insert()
      .values({ key: 'mimeTypes', value: mimeTypes })
      .orUpdate(['value'], ['key'])
      .returning('*')
      .execute();
  }
}
