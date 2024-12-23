import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from '@erist-opt/core';
import { ErrorFilter } from '@erist-opt/shared';
import { AuthModule } from '@erist-opt/auth';
import { UserModule } from '@erist-opt/user';
import { CategoryModule } from '@erist-opt/category';
import { ProductModule } from '@erist-opt/product';
import { KafkaModule } from '@erist-opt/kafka';
import { BannerModule } from '@erist-opt/banner';
import { MainPageBlockModule } from '@erist-opt/main-page-block';
import { CustomerModule } from '@erist-opt/customer';
import { AuthCustomerModule } from '@erist-opt/auth-customer';
import { InformationModule } from '@erist-opt/information';
import { OptionModule } from '@erist-opt/options';
import { SocialHrefModule } from '@erist-opt/social-href';
import { JwtUserModule } from '@erist-opt/jwt-user';
import { JwtCustomerModule } from '@erist-opt/jwt-customer';
import { SearchModule } from '@erist-opt/search';
import { CronModule } from '@erist-opt/cron';
import { CardModule } from '@erist-opt/card';
import { CheckoutModule } from '@erist-opt/checkout';
import { GenerateInvoiceModule } from '@erist-opt/generate-invoice';
import { MinioLocalModule } from '@erist-opt/minio';
import { SearchSynonymsModule } from '@erist-opt/search-synonyms';
import { DashboardAdminModule } from '@erist-opt/dashboard-admin';
import { BrokerMessage } from './app.broker';
import { DadataModule } from '@erist-opt/dadata';
import { FeedbackModule } from '@erist-opt/feedback';
import { Notification1cModule } from '@erist-opt/notification-1c';

@Module({
  imports: [
    CoreModule,
    KafkaModule,

    MinioLocalModule,

    JwtUserModule,
    AuthModule,
    UserModule,

    CategoryModule,
    ProductModule,
    OptionModule,
    BannerModule,
    MainPageBlockModule,
    InformationModule,

    SearchModule,
    SearchSynonymsModule,
    /*admin*/
    JwtCustomerModule,
    AuthCustomerModule,
    CustomerModule,
    /*admin*/

    CardModule,

    SocialHrefModule,
    GenerateInvoiceModule,

    CronModule,
    CheckoutModule,
    DadataModule,
    DashboardAdminModule,

    FeedbackModule,
    Notification1cModule,
  ],
  controllers: [AppController, BrokerMessage],

  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
  ],
})
export class AppModule {}
