import { Injectable } from '@nestjs/common';
import {
  Action,
  Context,
  Ctx,
  InjectBot,
  On,
  Scene,
  SceneEnter,
  SceneLeave,
  Start,
} from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { RedisService } from '@money-app/redis';
import { UserService } from '@money-app/user';
import { CategoryService } from '@money-app/category';
import { IReceipt, IReceiptItem, normalizePrice } from '@money-app/shared';
import { scenes } from '../../scenesNames';
import { messageForScenes } from '../../message.patterns';
import { RabbitService } from '@money-app/rabbit';
import { TelegramService } from '../../telegram.service';
import { replyMarkups } from './expence.store';
import fetch from 'node-fetch';
// import { createCanvas, loadImage } from 'canvas';
import jsQR, { QRCode } from 'jsqr';
import { ProverkachekaService } from '@money-app/proverkacheka';
import { GroupService } from '@money-app/group';
import { AppLoggerLokiService } from '@money-app/logger-loki';
import { isString } from 'util';

@Injectable()
@Scene(scenes.expenseQr)
export class expenseQrScene {
  constructor(
    @InjectBot() private bot: Telegraf<any>,
    private readonly redisService: RedisService,
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
    private readonly telegramService: TelegramService,
    private readonly rabbitService: RabbitService,
    private readonly groupService: GroupService,
    private readonly appLoggerLokiService: AppLoggerLokiService,
    private readonly proverkachekaService: ProverkachekaService
  ) {}

  @Start()
  @SceneEnter()
  async start(@Ctx() ctx: any) {
    const chatId = ctx.chat.id;
    ctx.scene.state['currentIndex'] = 0; // Устанавливаем начальный индекс товара
    ctx.scene.state['photo'];
    const user = await this.userService.getByChatId(chatId);
    if (user && user.role !== 'admin') {
      await ctx.scene.enter(scenes.expense);
      return;
    }
    if (!user) {
      await this.telegramService.reply(
        ctx,
        messageForScenes.all.noUserMessage,
        null
      );
      await ctx.scene.enter(scenes.main);
      return;
    }

    const accountId = user.accountId;
    const groups = await this.groupService.findAllEnabledByAccountId(accountId);
    if (!groups || groups.length <= 0) {
      this.appLoggerLokiService.error(
        `${chatId} на сцене  ${scenes.expenseQr} нет группы`,
        'bot'
      );

      await this.telegramService.reply(
        ctx,
        messageForScenes.expenseScene.errorMessageNotGroups,
        replyMarkups.expenseQrSceneMenu
      );
      const groupsDisabled = await this.groupService.findAllDisabledByAccountId(
        accountId
      );
      if (groupsDisabled && groupsDisabled.length > 0) {
        await this.telegramService.reply(
          ctx,
          messageForScenes.expenseScene.errorMessageDisabledGroupsAdmin(
            groupsDisabled.length
          ),
          replyMarkups.allGroupsDisabledMenuAdmin
        );
      }
      return;
    }

    if (groups.length === 1) {
      ctx.scene.state['groupId'] = groups[0].id;
      const userClient = await this.userService.getAccountByChatId(chatId);
      if (!userClient) {
        await this.telegramService.reply(
          ctx,
          messageForScenes.all.errorMessageNotClient,
          null
        );
        await ctx.scene.enter(scenes.main);
        return;
      }
      await this.telegramService.reply(
        ctx,
        messageForScenes.expenseScene.qr.sendQrCode,
        replyMarkups.expenseQrSceneMenu
      );

      return;
    }

    await this.telegramService.reply(
      ctx,
      messageForScenes.InviteScene.selectGroup,
      replyMarkups.selectGroup(groups)
    );
    const userGroup = await this.userService.getGroupsByChatId(chatId);
    if (!userGroup) {
      this.appLoggerLokiService.error(
        `${chatId} на сцене  ${scenes.expenseAdmin} нет группы`,
        'bot'
      );

      await this.telegramService.reply(
        ctx,
        messageForScenes.expenseScene.errorMessageNotGroup,
        null
      );
      await ctx.scene.enter(scenes.main);
      return;
    }
    const userClient = await this.userService.getAccountByChatId(chatId);
    if (!userClient) {
      await this.telegramService.reply(
        ctx,
        messageForScenes.all.errorMessageNotClient,
        null
      );
      await ctx.scene.enter(scenes.main);
      return;
    }
  }

  @Action(/selGroup:(.+)/)
  async selectGroupHandle(@Context() ctx: any) {
    const selectedGroupId = ctx.match[1];
    ctx.scene.state['groupId'] = selectedGroupId;
    const chatId = ctx.chat.id;
    const userClient = await this.userService.getAccountByChatId(chatId);
    if (!userClient) {
      await this.telegramService.reply(
        ctx,
        messageForScenes.all.errorMessageNotClient,
        null
      );
      await ctx.scene.enter(scenes.main);
      return;
    }
    await this.telegramService.reply(
      ctx,
      messageForScenes.expenseScene.qr.sendQrCode,
      replyMarkups.expenseQrSceneMenu
    );
    return;
  }

  // @On('photo')
  // async onPhoto(ctx: any & { update: any }) {
  //   const chatId = ctx.chat.id;

  //   const userClient = await this.userService.getAccountByChatId(chatId);
  //   if (!userClient) {
  //     await this.telegramService.reply(
  //       ctx,
  //       messageForScenes.all.errorMessageNotClient,
  //       null
  //     );
  //     setTimeout(() => {
  //       ctx.scene.enter(scenes.expenseQr);
  //     }, 3000);
  //     return;
  //   }
  //   this.telegramService.rememberMessage(ctx, ctx.message.message_id);
  //   ctx.scene.state['photo'] = ctx.message.photo;
  //   const length = ctx.scene.state['photo'].length;
  //   const photoId = ctx.scene.state['photo'][length - 1].file_id;

  //   let code: QRCode | null;
  //   let imageUrl: string;
  //   try {
  //     // Получаем информацию о файле фотографии
  //     const file = await ctx.telegram.getFile(photoId);

  //     if (!file) {
  //       await this.telegramService.reply(
  //         ctx,
  //         messageForScenes.all.notTelegramService,
  //         null
  //       );
  //       setTimeout(() => {
  //         ctx.scene.enter(scenes.main);
  //       }, 3000);
  //       return;
  //     }
  //     if (!file.file_path) {
  //       await this.telegramService.reply(
  //         ctx,
  //         messageForScenes.all.notTelegramService,
  //         null
  //       );
  //       setTimeout(() => {
  //         ctx.scene.enter(scenes.main);
  //       }, 3000);
  //       return;
  //     }

  //     imageUrl = `https://api.telegram.org/file/bot${ctx.telegram.token}/${file.file_path}`;

  //     // Загружаем изображение с URL
  //     const response = await fetch(imageUrl);
  //     const imageBuffer = await response.buffer();

  //     // Преобразуем буфер изображения в строку Data URI
  //     const dataUri = `data:image/jpeg;base64,${imageBuffer.toString(
  //       'base64'
  //     )}`;

  //     // Создаем новый Canvas
  //     const canvas = createCanvas(1, 1); // Создаем временный canvas для загрузки изображения

  //     // Загружаем изображение на canvas с помощью loadImage
  //     const image = await loadImage(dataUri);
  //     canvas.width = image.width;
  //     canvas.height = image.height;

  //     // Получаем контекст canvas
  //     const ctxCanvas = canvas.getContext('2d');

  //     // Рисуем изображение на canvas
  //     ctxCanvas.drawImage(image, 0, 0);

  //     // Получаем данные пикселей изображения
  //     const imageData = ctxCanvas.getImageData(
  //       0,
  //       0,
  //       canvas.width,
  //       canvas.height
  //     );
  //     // console.log('imageData:', imageData);

  //     // Используем jsQR для распознавания QR-кода на изображении
  //     code = jsQR(imageData.data, imageData.width, imageData.height);
  //     // console.log('QR Code Result:', code);

  //     if (!code) {
  //       await this.telegramService.reply(
  //         ctx,
  //         messageForScenes.expenseScene.qr.errorScanQrCode,
  //         replyMarkups.expenseQrSceneMenu
  //       );

  //       return;
  //     }
  //   } catch (error) {
  //     await this.telegramService.reply(
  //       ctx,
  //       messageForScenes.expenseScene.qr.errorScanQrCode,
  //       replyMarkups.expenseQrSceneMenu
  //     );

  //     return;
  //   }

  //   // Отправляем распознанный текст обратно пользователю
  //   const qrText = code.data;

  //   const checkQrAllDown =
  //     await this.proverkachekaService.getCheckByChatIdAndQrText(chatId, qrText);

  //   if (checkQrAllDown && isString(checkQrAllDown)) {
  //     await this.telegramService.reply(
  //       ctx,
  //       messageForScenes.expenseScene.qr.retryScanQrCode,
  //       replyMarkups.expenseRetryScanQrMenu(checkQrAllDown)
  //     );
  //     return;
  //   }
  //   const addQr = await this.proverkachekaService.addCheck(
  //     chatId,
  //     qrText,
  //     imageUrl
  //   );
  //   const codeData: IReceipt | null =
  //     await this.proverkachekaService.getCheckData(qrText.toString());

  //   if (!codeData) {
  //     await this.telegramService.reply(
  //       ctx,
  //       messageForScenes.expenseScene.qr.errorScanQrCode,
  //       replyMarkups.expenseQrSceneMenu
  //     );
  //     return;
  //   }

  //   const items: IReceiptItem[] = codeData.data.json.items;
  //   ctx.scene.state['items'] = items;
  //   ctx.scene.state['dateCheck'] = codeData.data.json.dateTime;
  //   if (!items) {
  //     await this.telegramService.reply(
  //       ctx,
  //       messageForScenes.expenseScene.qr.errorScanQrCode,
  //       replyMarkups.expenseQrSceneMenu
  //     );
  //     return;
  //   }

  //   // Вызываем обработку первого товара
  //   await this.handleNextItem(ctx, ctx.scene.state['items']);
  // }

  private async handleNextItem(ctx: any, items: IReceiptItem[]) {
    const currentIndex = ctx.scene.state['currentIndex'];

    if (currentIndex >= ctx.scene.state['items'].length) {
      await this.telegramService.reply(
        ctx,
        messageForScenes.expenseScene.qr.allExpencesByQr,
        replyMarkups.expenseQrSceneMenu2
      );
      return;
    }

    const item = ctx.scene.state['items'][currentIndex];

    // Обрабатываем выбор категории для текущего товара
    await this.handleCategorySelection(ctx, item);

    // Увеличиваем индекс для следующего товара
    ctx.scene.state['currentIndex'] = currentIndex + 1;
  }

  private async handleCategorySelection(ctx: any, item: IReceiptItem) {
    const chatId = ctx.chat.id;
    const userClient = await this.userService.getAccountByChatId(chatId);
    if (!userClient) {
      await this.telegramService.reply(
        ctx,
        messageForScenes.all.errorMessageNotClient,
        replyMarkups.expenseQrSceneMenu
      );
      return;
    }
    const userClientId = userClient.id;
    const groupId = ctx.scene.state['groupId'];
    const categories =
      await this.categoryService.findAllExpenseByClientIdAndGroupId(
        userClientId,
        groupId
      );

    if (categories.length === 0) {
      await this.telegramService.reply(
        ctx,
        messageForScenes.expenseScene.errorMessageNotCategory,
        replyMarkups.expenseQrSceneMenu
      );
      return;
    }

    const keyboardForCategory: Array<
      Array<{ text: string; callback_data: string }>
    > = [];

    keyboardForCategory.push([
      {
        text: messageForScenes.expenseScene.qr.nextItem,
        callback_data: `nextItem`,
      },
    ]);

    for (const category of categories) {
      if (category.status) {
        const cachedCategory = await this.redisService.getCategoryButton(
          category.id
        );
        const callbackData = cachedCategory
          ? `a:${cachedCategory.categoryId}:${normalizePrice(item.sum)}`
          : `a:${category.id}:${normalizePrice(item.sum)}`;

        keyboardForCategory.push([
          {
            text: category.name,
            callback_data: callbackData,
          },
        ]);
      }
    }

    await this.telegramService.reply(
      ctx,
      messageForScenes.expenseScene.qr.checkPositionAlert(
        item.name,
        normalizePrice(item.sum)
      ),
      replyMarkups.categoryMenuExpenceAdmin(keyboardForCategory)
    );
  }

  @Action(/nextItem/)
  async nextItem(@Ctx() ctx: any) {
    await this.handleNextItem(ctx, ctx.scene.state['items']);
  }

  @Action(/delCheck:.+/)
  async deleteCheck(@Ctx() ctx: any) {
    const chatId = ctx.chat.id;
    const cbQuery = ctx.update.callback_query;
    const checkHash = cbQuery['data'].split(':')[1];
    await this.proverkachekaService.deleteByHash(checkHash);
    ctx.scene.enter(scenes.expenseQr);
    return;
  }

  @Action(/a:.+/)
  async handleCategorySelectionCallback(@Ctx() ctx: any) {
    const chatId = ctx.chat.id;
    const cbQuery = ctx.update.callback_query;
    const categoryId = cbQuery['data'].split(':')[1];

    const category = await this.categoryService.findOne(categoryId);
    const value = cbQuery['data'].split(':')[2];
    if (!category) {
      await this.telegramService.reply(ctx, `Категория не найдена.`, null);
      setTimeout(() => {
        ctx.scene.enter(scenes.expenseQr);
      }, 3000);
      return;
    }

    const user = await this.userService.getByChatId(chatId);

    if (!user) {
      await this.telegramService.reply(
        ctx,
        messageForScenes.expenseScene.errorMessageNotUser,
        null
      );
      setTimeout(() => {
        ctx.scene.enter(scenes.expenseQr);
      }, 3000);
      return;
    }

    const group = await this.groupService.findOne(ctx.scene.state['groupId']);

    if (!group) {
      await this.telegramService.reply(ctx, `Группа не найдена.`, null);
      setTimeout(() => {
        ctx.scene.enter(scenes.expenseQr);
      }, 3000);
      return;
    }

    const addSumm = await this.rabbitService.addTransaction({
      AccountID: user.accountId,
      UserID: user.id,
      FirstName: user.firstName,
      ChatID: chatId,
      GroupID: group.id,
      GroupName: group.name,
      CurrencyID: '00000000-0000-0000-0000-000000000000',
      CurrencyName: 'RUB',
      CategoryID: categoryId,
      CategoryName: category.name,
      Value: Number(value) * -1,
      EventDate: new Date(ctx.scene.state['dateCheck']),
      Operation: 'expense',
    });

    if (!addSumm.success) {
      await this.telegramService.reply(
        ctx,
        messageForScenes.expenseScene.errorMessageAddExpense,
        replyMarkups.expenseQrSceneMenu
      );
      return;
    }

    await this.telegramService.reply(
      ctx,
      messageForScenes.expenseScene.addExpenseMessage(category.name, value),
      null
    );

    // После обработки выбора категории для текущего товара, обрабатываем следующий товар
    await this.handleNextItem(ctx, ctx.scene.state['items']);
  }

  @SceneLeave()
  async onLeaveTelegram(@Ctx() ctx: any) {
    this.telegramService.clearMessageStorage(ctx, ctx.chat.id);
  }
}
