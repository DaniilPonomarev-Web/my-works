import { OptionService } from '@erist-opt/options';
import { ProductImageService } from '@erist-opt/product';
import { IOption, OptionFilter } from '@erist-opt/shared';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CronService {
  constructor(
    private readonly optionService: OptionService,
    private readonly productImageService: ProductImageService
  ) {}

  /* для фильтров */
  // @Cron('0 10 * * * *') //every hour, at the start of the 10th minute
  // @Cron('5 * * * * * ') // 	every minute, on the 45th second
  // async handleCron() {
  //   await this.updateOptionFilters();
  // }
  // async updateOptionFilters(): Promise<void> {
  //   // чистим текущие данные
  //   await this.optionService.clearFilterRepo();
  //   const options: IOption[] =
  //     await this.optionService.getAllOptionsWithValues();

  //   const optionFilters: OptionFilter[] = options.map((option) => {
  //     const optionFilter = new OptionFilter();
  //     optionFilter.optionName = option.name;
  //     optionFilter.values = option.values.map((value) => value.name);
  //     return optionFilter;
  //   });

  //   await this.optionService.saveOptionFilters(optionFilters);
  // }

  /* для фильтров */
  // @Cron('0 10 * * * *') //every hour, at the start of the 10th minute
  // @Cron(CronExpression.EVERY_DAY_AT_10AM)
  @Cron(CronExpression.EVERY_30_MINUTES)
  async handleCronImages() {
    await this.updateProductImagesHrefs();
  }
  async updateProductImagesHrefs(): Promise<void> {
    await this.productImageService.updateProductImagesHrefs();
  }

  @Cron(CronExpression.EVERY_30_MINUTES)
  async handleCronImagesBase64() {
    await this.updateProductImagesBase64();
  }
  async updateProductImagesBase64(): Promise<void> {
    await this.productImageService.updateProductImagesBase64();
  }
}
