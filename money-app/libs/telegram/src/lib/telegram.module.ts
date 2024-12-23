import { HttpCode, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import RedisSession from 'telegraf-session-redis';
import { BullModule } from '@nestjs/bull';
import { TelegramUpdate } from './telegram.update';
import { TelegrafModule } from 'nestjs-telegraf';
import { TelegramService } from './telegram.service';
import {
  ProverkachekaModule,
  ProverkachekaService,
} from '@money-app/proverkacheka';
import { RedisModule, RedisService } from '@money-app/redis';
import { SettingModule } from '@money-app/setting';
import { CacheModule } from '@nestjs/cache-manager';

import { UserModule } from '@money-app/user';
import { ChatGptAiModule } from '@money-app/chat-gpt-ai';

import { MainScene } from './scenes/main/main.scene';
import { IncomeScene } from './scenes/income/income.scene';
import { expenseScene } from './scenes/expense/expense.scene';
import { expenseForAdminScene } from './scenes/expense/expenseForAdmin.scene';
import { GroupScene } from './scenes/group/group.scene';

import { TestScene } from './scenes/test/test.scene';
import { MailSenderModule } from '@money-app/mail-sender';
import { CategoryModule } from '@money-app/category';

import { RabbitModule } from '@money-app/rabbit';
import { RegistrationScene } from './scenes/registration/registration.scene';
import { GroupModule } from '@money-app/group';

import { SetupClientScene } from './scenes/setupClientScene/setupClientScene';

import { EditGroupsScene } from './scenes/setupClientScene/group/editGroupScene';
import { AddEditGroupsScene } from './scenes/setupClientScene/group/addEditGroupScene';
import { StartEditGroupsScene } from './scenes/setupClientScene/group/startEditGroupScene';

import { EditCategoriesScene } from './scenes/setupClientScene/category/editCategoryScene';
import { EditGroupSceneService } from './scenes/setupClientScene/group/editGroupScene.scene.service';

import { MyFinancesScene } from './scenes/finances/finances.scene';
import { MyFinancesIncomeScene } from './scenes/finances/financesInclome.scene';
import { MyFinancesExpenseScene } from './scenes/finances/financesExpense.scene';

import { AccountModule } from '@money-app/account';
import { GramModule } from '@money-app/gram';
import { InviteScene } from './scenes/invite/invite.scene';
import { InvitedsModule } from '@money-app/inviteds';
import { RegistrationSceneService } from './scenes/registration/registration.scene.service';
import { RegistrationSceneHands } from './scenes/registration/regitsrationSceneHands.scene';
import { EditUsersScene } from './scenes/setupClientScene/user/editUsersScene';
import { EditInviteScene } from './scenes/setupClientScene/invite/editinviteScene';
import { InstructionsScene } from './scenes/instructions/instructions.scene';

import { UserControll } from './middlewares/checkUserStatus.middleware';
import { IncomeForAdminScene } from './scenes/income/incomeForAdmin.scene';
import { SubscribeScene } from './scenes/subscribe/subscribe.scene';
import { YookassaModule } from '@money-app/yookassa';
import { LoggerLokiModule } from '@money-app/logger-loki';
import { EditAlarmsScene } from './scenes/setupClientScene/alarms/editAlarmsScene';
import { expenseQrScene } from './scenes/expense/expenceQr.scene';
import { HttpModule } from '@nestjs/axios';
import * as https from 'https';
import { expenseMenuScene } from './scenes/expense/expense.menu.scene';

const userControll = new UserControll(
  process.env['PG_CONNECT_ALLSTRING'] ? process.env['PG_CONNECT_ALLSTRING'] : ''
);

const session = new RedisSession({
  store: {
    host: process.env['TELEGRAM_SESSION_HOST'] || '127.0.0.1',
    port: process.env['TELEGRAM_SESSION_PORT'] || 6380,
    password: process.env['TELEGRAM_SESSION_PASS'],
  },
});

@Module({
  imports: [
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 300,
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    }),
    BullModule.forRoot({
      redis: {
        host: process.env['REDIS_HOST'],
        port: parseInt(process.env['REDIS_PORT']),
        password: process.env['REDIS_PASS'],
      },
    }),
    BullModule.registerQueue({ name: 'notification' }),
    CacheModule.register<any>({
      store: redisStore,
      host: process.env['REDIS_HOST'],
      port: process.env['REDIS_PORT'],
      password: process.env['REDIS_PASS'],
    }),
    TelegrafModule.forRoot({
      middlewares: [session.middleware(), userControll.middleware()], // проверка пользователя и аккаунта,
      token: <string>process.env['TELEGRAM_BOT_TOKEN'],
    }),
    ProverkachekaModule,
    RedisModule,
    SettingModule,
    ChatGptAiModule,
    UserModule,
    MailSenderModule,
    CategoryModule,
    RabbitModule,
    GroupModule,
    AccountModule,
    GramModule,
    InvitedsModule,
    YookassaModule,
    LoggerLokiModule,
  ],
  providers: [
    TelegramService,
    TelegramUpdate,
    RedisService,
    MainScene,
    IncomeScene,
    IncomeForAdminScene,
    expenseMenuScene,
    expenseScene,
    expenseForAdminScene,
    expenseQrScene,
    GroupScene,
    TestScene,
    RegistrationScene,
    RegistrationSceneHands,
    SetupClientScene,
    AddEditGroupsScene,
    EditGroupsScene,
    EditGroupSceneService,
    StartEditGroupsScene,
    EditCategoriesScene,
    EditAlarmsScene,
    EditUsersScene,
    EditInviteScene,
    InviteScene,
    InstructionsScene,
    RegistrationSceneService,
    MyFinancesScene,
    MyFinancesIncomeScene,
    MyFinancesExpenseScene,
    SubscribeScene,
  ],
  exports: [TelegramService],
})
export class TelegramModule {}
