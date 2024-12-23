import { Injectable, Logger } from '@nestjs/common';
import {
  Ctx,
  Scene,
  SceneEnter,
  SceneLeave,
  Start,
  Action,
  On,
} from 'nestjs-telegraf';
import { UserService } from '@money-app/user';
import { scenes } from '../../../scenesNames';
import { messageForScenes } from '../../../message.patterns';
import { GroupService } from '@money-app/group';
import { TelegramService } from '../../../telegram.service';
import { CategoryService } from '@money-app/category';
import {
  addCategoryKeyboard,
  addCategoryKeyboardForAdmin,
  goBack,
  setupCategoryKeyboard,
  switchPageGroup,
} from './store';
import { ICategoryInput } from '@money-app/shared';
import { TransactionType } from '@money-app/entities';
import { selectCategoryTypes } from '../group/store';
import { Variables } from '../../../variables';

@Injectable()
@Scene(scenes.edit.category)
export class EditCategoriesScene {
  private logger = new Logger(EditCategoriesScene.name);
  constructor(
    private readonly userService: UserService,
    private readonly telegramService: TelegramService,
    private readonly groupService: GroupService,
    private readonly categoryService: CategoryService
  ) {}

  @Start()
  @SceneEnter()
  async start(@Ctx() ctx: any) {
    ctx.scene.state.messages = [];
    ctx.scene.state['editCatName'] = false;
    ctx.scene.state['addCategory'] = false;
    ctx.scene.state['editCatLimit'] = false;
    ctx.scene.state['newNameCategory'] = '';
    ctx.scene.state['groupId'] = '';
    const chatId = ctx.chat.id;
    const userClient = await this.userService.getAccountByChatId(chatId);

    if (!userClient) {
      await this.telegramService.reply(
        ctx,
        messageForScenes.all.errorMessageNotClient
      );

      return await ctx.scene.enter(scenes.main);
    }

    const clientId = userClient.id;
    const userGroups = await this.groupService.findAllByAccountId(clientId);

    if (!userGroups || userGroups.length === 0) {
      await this.telegramService.reply(
        ctx,
        messageForScenes.editCategoryScene.errorMessageNotGroup
      );

      await this.telegramService.reply(
        ctx,
        messageForScenes.editCategoryScene.errorMessageNotGroup,
        goBack
      );
      // await ctx.scene.enter(scenes.edit.setup);
      return;
    }

    for (let groupIndex = 0; groupIndex < userGroups.length; groupIndex++) {
      const group = userGroups[groupIndex];

      const userCategoriesAll =
        await this.categoryService.findAllByClientIdAndGroupId(
          clientId,
          group.id
        );

      // if (!userCategoriesAll || userCategoriesAll.length === 0) {
      //   await this.telegramService.reply(
      //     ctx,
      //     messageForScenes.editCategoryScene.errorMessageNotCategory,
      //     goBack
      //   );
      //   await this.telegramService.reply(
      //     ctx,
      //     messageForScenes.editCategoryScene.errorMessageNotCategory,
      //     addCategoryKeyboardForAdmin(group.id)
      //   );

      //   return;
      // }

      const userCategoriesExpense =
        await this.categoryService.findAllExpenseByClientIdAndGroupId(
          clientId,
          group.id
        );

      const userCategoriesIncome =
        await this.categoryService.findAllIncomeByClientIdAndGroupId(
          clientId,
          group.id
        );

      const currentPage = ctx.scene.state.messages[group.id] || 'expense'; // Изменение: Текущая страница (расходы по умолчанию)

      if (userCategoriesAll.length !== 0) {
        //TODO bot
        // await this.telegramService.reply(
        //   ctx,
        //   messageForScenes.editCategoryScene.errorMessageNotGroup
        // );
        // await this.telegramService.reply(
        //   ctx,
        //   messageForScenes.editCategoryScene.errorMessageNotGroup,
        //   goBack
        // );
      }
      const keyboardForCategories = this.buildCategoryKeyboard(
        currentPage === 'income'
          ? userCategoriesIncome || []
          : userCategoriesExpense || [],
        group.id,
        currentPage
      );

      const message = await this.telegramService.reply(
        ctx,
        `Группа: <b>${group.name}</b> ${
          userCategoriesAll.length === 0 ? `<b>(Без категорий)</b>` : ''
        }`,
        {
          reply_markup: {
            inline_keyboard: keyboardForCategories,
            resize_keyboard: true,
            one_time_keyboard: false,
          },
        }
      );

      ctx.scene.state.messages[group.id] = message.message_id;
    }

    await this.telegramService.reply(
      ctx,
      messageForScenes.editCategoryScene.goSettingsOne,
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: messageForScenes.editCategoryScene.goSettings,
                callback_data: 'goSetupClientScene',
              },
            ],
          ],
        },
      }
    );
  }

  private buildCategoryKeyboard(
    categories: any[],
    groupId: string,
    currentPage: string
  ) {
    const keyboardForCategories: Array<
      Array<{ text: string; callback_data: string }>
    > = [];

    if (categories && categories.length !== 0) {
      for (
        let categoryIndex = 0;
        categoryIndex < categories.length;
        categoryIndex++
      ) {
        const category = categories[categoryIndex];

        keyboardForCategories.push([
          {
            text: category.status ? category.name : category.name + ' (Выкл)',
            callback_data: `editCategory:${category.id}`,
          },
        ]);
      }
    }

    keyboardForCategories.push([addCategoryKeyboard(groupId)]);
    if (categories && categories.length !== 0) {
      keyboardForCategories.push(switchPageGroup(groupId, currentPage)); // Изменение: Передаем текущую страницу
    }

    return keyboardForCategories;
  }

  @Action(/sw(?:Income|Expense):(.+):(.+)/)
  async switchPage(@Ctx() ctx: any) {
    const cbQuery = ctx.update.callback_query;
    const groupId = cbQuery['data'].split(':')[1];
    const currentPage = cbQuery['data'].split(':')[2];
    const chatId = ctx.chat.id;
    const userClient = await this.userService.getAccountByChatId(chatId);

    if (!userClient) {
      // Обработка случая, когда пользователь не найден
      return await ctx.scene.enter(scenes.main);
    }

    const clientId = userClient.id;
    const group = await this.groupService.findOne(groupId);

    if (!group) {
      await this.telegramService.reply(
        ctx,
        `У вас нет ни одной группы, добавьте их в настройках "Группы"`,
        goBack
      );
    }

    let userCategories: any[] = [];
    if (currentPage === 'income') {
      userCategories =
        await this.categoryService.findAllIncomeByClientIdAndGroupId(
          clientId,
          groupId
        );
    } else if (currentPage === 'expense') {
      userCategories =
        await this.categoryService.findAllExpenseByClientIdAndGroupId(
          clientId,
          groupId
        );
    }

    if (!userCategories || userCategories.length === 0) {
      // Обработка случая, когда категории не найдены
      await this.telegramService.reply(
        ctx,
        `Для группы <b>${group.name}</b> нет категорий на текущей странице.`,
        goBack
      );
      return;
    }

    const keyboardForCategories: Array<
      Array<{ text: string; callback_data: string }>
    > = [];

    for (
      let categoryIndex = 0;
      categoryIndex < userCategories.length;
      categoryIndex++
    ) {
      const category = userCategories[categoryIndex];
      keyboardForCategories.push([
        {
          text: category.status ? category.name : category.name + ' (Выкл)',
          callback_data: `editCategory:${category.id}`,
        },
      ]);
    }

    // Добавьте кнопки для переключения страниц
    keyboardForCategories.push([addCategoryKeyboard(groupId)]);
    keyboardForCategories.push(switchPageGroup(groupId, currentPage));

    // Обновите сообщение с новым содержимым
    await ctx.editMessageText(`Группа: <b>${group?.name}</b>`, {
      reply_markup: {
        inline_keyboard: keyboardForCategories,
        resize_keyboard: true,
        one_time_keyboard: true,
      },
      parse_mode: 'HTML',
    });
  }

  @Action(/editCategory:.+/)
  async editGroup(@Ctx() ctx: any & { update: any }) {
    const cbQuery = ctx.update.callback_query;
    const categoryId = cbQuery['data'].split(':')[1];
    const state = ctx.scene.state;
    state['categoryId'] = categoryId.categoryId;

    const category = await this.categoryService.findOne(categoryId);
    if (!category) {
      await this.telegramService.reply(
        ctx,
        messageForScenes.editCategoryScene.notCategoryFind
      );
      return;
    }
    const sendMessageOptions = {
      chat_id: ctx.update.callback_query.message.chat.id,
      text: messageForScenes.editCategoryScene.selectAction(category),
      reply_markup: JSON.stringify(
        setupCategoryKeyboard(categoryId, category.status)
      ),
    };

    await this.telegramService.reply(ctx, sendMessageOptions.text, {
      reply_markup: sendMessageOptions.reply_markup,
    });
  }

  @Action(/editCatName:.+/)
  async editCategoryName(@Ctx() ctx: any & { update: any }) {
    const state = ctx.scene.state;

    await this.telegramService.reply(
      ctx,
      messageForScenes.editCategoryScene.editName
    );

    const cbQuery = ctx.update.callback_query;
    const categoryId = cbQuery['data'].split(':')[1];
    state['categoryId'] = categoryId;
    state['editCatName'] = true;
    state['addCategory'] = false;
    state['editCatLimit'] = false;
  }

  @Action(/editCatLimit:.+/)
  async editCategoryLimit(@Ctx() ctx: any & { update: any }) {
    const state = ctx.scene.state;

    await this.telegramService.reply(
      ctx,
      messageForScenes.editCategoryScene.editLimit
    );

    const cbQuery = ctx.update.callback_query;
    const categoryId = cbQuery['data'].split(':')[1];

    state['categoryId'] = categoryId;
    state['editCatLimit'] = true;
    state['editCatName'] = false;
    state['addCategory'] = false;
  }

  @Action(/addCat:.+/)
  async addCategoryForGroup(@Ctx() ctx: any & { update: any }) {
    const state = ctx.scene.state;
    await this.telegramService.reply(
      ctx,
      messageForScenes.editGroupScene.addCategory,
      null
    );
    const cbQuery = ctx.update.callback_query;
    const groupId = cbQuery['data'].split(':')[1];
    state['groupId'] = groupId;
    state['addCategory'] = true;
    state['editCatName'] = false;
    state['editCatLimit'] = false;
  }

  @On('text')
  async onAnswerText(@Ctx() ctx: any & { update: any }) {
    const chatId = ctx.chat.id;
    const state = ctx.scene.state;
    if (Object.keys(state).length === 0 && state.constructor === Object) {
      await this.telegramService.reply(
        ctx,
        messageForScenes.editCategoryScene.notFoundDo
      );
      return;
    }

    if (state['addCategory']) {
      const groupId = state['groupId'];
      const user = await this.userService.getByChatId(chatId);
      if (!user) {
        await this.telegramService.reply(
          ctx,
          messageForScenes.all.noUserMessage,
          null
        );
        await ctx.scene.enter(scenes.main);
        return;
      }
      const categoryName = ctx.update.message.text;

      if (
        categoryName.length < Variables.group.minNameLenght ||
        categoryName.length > Variables.group.maxNameLenght
      ) {
        await this.telegramService.reply(
          ctx,
          messageForScenes.editCategoryScene.errorLenght,
          null
        );
        return;
      }
      state['newNameCategory'] = categoryName;
      await this.telegramService.reply(
        ctx,
        messageForScenes.editCategoryScene.selectType,
        selectCategoryTypes(user.accountId)
      );
      return;
    }
    if (state['editCatName']) {
      const categoryId = state['categoryId'];
      const categoryName = ctx.update.message.text;

      if (
        categoryName.length < Variables.group.minNameLenght ||
        categoryName.length > Variables.group.maxNameLenght
      ) {
        await this.telegramService.reply(
          ctx,
          messageForScenes.editCategoryScene.errorLenght,
          null
        );
        return;
      }
      const updateCategoryName = await this.categoryService.updateCategoryName(
        categoryId,
        categoryName
      );
      if (!updateCategoryName) {
        await this.telegramService.reply(
          ctx,
          messageForScenes.editCategoryScene.NotDoName
        );
      }

      await this.telegramService.reply(
        ctx,
        messageForScenes.editCategoryScene.SuccessDoName(categoryName)
      );

      await this.telegramService.rememberMessage(ctx, ctx.update.message.id);

      await ctx.scene.enter(scenes.edit.category);
      state['addCategory'] = false;
      state['editCatName'] = false;
      state['editCatLimit'] = false;

      return;
    }
    if (state['editCatLimit']) {
      await this.telegramService.rememberMessage(ctx, ctx.update.message.id);
      const categoryId = state['categoryId'];
      const limitString = ctx.update.message.text;
      const limit: number = parseFloat(limitString);

      if (isNaN(limit)) {
        await this.telegramService.reply(
          ctx,
          messageForScenes.editCategoryScene.NotDoName
        );
        return;
      }

      const updateCategoryLimit =
        await this.categoryService.updateCategoryLimit(categoryId, limit);
      await this.telegramService.reply(
        ctx,
        messageForScenes.editCategoryScene.SuccessDoLimit(limit)
      );
      state['addCategory'] = false;
      state['editCatName'] = false;
      state['editCatLimit'] = false;
      await ctx.scene.enter(scenes.edit.category);
      await ctx.deleteMessage(ctx.update.message.id, chatId);

      return;
    }
    if (
      !state['editCatName'] &&
      !state['addCategory'] &&
      !state['editCatLimit']
    ) {
      await this.telegramService.rememberMessage(ctx, ctx.update.message.id);
      await this.telegramService.reply(
        ctx,
        messageForScenes.editCategoryScene.notFoundDo
      );
      return;
    }
  }

  @Action(/tS:(.+)/)
  async selectCategoryTypes(@Ctx() ctx: any & { update: any }) {
    const chatId = ctx.chat.id;
    const state = ctx.scene.state || null;

    const cbQuery = ctx.update.callback_query;
    const typeCategory = cbQuery['data'].split(':')[1];
    const accoundId = cbQuery['data'].split(':')[2];

    let categoryType = TransactionType.Expense;
    if (typeCategory === 'exp') {
      categoryType = TransactionType.Expense;
    }
    if (typeCategory === 'inc') {
      categoryType = TransactionType.Income;
    }

    const categoryCreate: ICategoryInput = {
      accountId: accoundId,
      name: state['newNameCategory'],
      type: categoryType,
      groupId: state['groupId'],
      status: true,
    };

    const addCategory = await this.categoryService.createCategory(
      categoryCreate
    );

    if (!addCategory) {
      await this.telegramService.reply(
        ctx,
        messageForScenes.editGroupScene.notCreateCategory,
        null
      );
    }
    await this.telegramService.reply(
      ctx,
      messageForScenes.editGroupScene.SuccessCreateCategory(
        state['newNameCategory']
      ),
      null
    );
    state['addCategory'] = false;
    state['newNameCategory'] = '';
    state['groupId'] = '';
    setTimeout(() => {
      ctx.scene.reenter();
    }, 1500);
    return;
  }

  @Action(/confirmAction:(.+)/)
  async confirmAction(@Ctx() ctx: any & { update: any }) {
    const actionData = ctx.match[1]; // Получаем данные действия из регулярного выражения
    const [actionName, entityId] = actionData.split(':');

    await this.telegramService.reply(
      ctx,
      messageForScenes.editCategoryScene.yReady,
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Да',
                callback_data: `${actionName}Confirmed:${entityId}`,
              },
              { text: 'Нет', callback_data: `editCategory:${entityId}` },
            ],
          ],
        },
      }
    );
  }

  @Action(/(.+)Confirmed:(.+)/)
  async executeAction(@Ctx() ctx: any & { update: any }) {
    const actionName = ctx.match[1];
    const categoryId = ctx.match[2];

    let action = '';
    if (actionName === 'disableCat') {
      action = 'отключена ';
      const updateStatus = await this.categoryService.updateCategoryStatus(
        categoryId
      );
      if (!updateStatus) {
        await this.telegramService.reply(
          ctx,
          messageForScenes.editCategoryScene.notDisableCategory
        );

        return await ctx.scene.enter(scenes.edit.category);
      }
    }
    if (actionName === 'delCat') {
      action = 'удалена';
      const deleteGroup = await this.categoryService.deleteCategory(categoryId);
      if (!deleteGroup) {
        await this.telegramService.reply(
          ctx,
          messageForScenes.editCategoryScene.notDeleteCategory
        );

        return await ctx.scene.enter('editGroupsScene');
      }
    }

    await this.telegramService.reply(
      ctx,
      messageForScenes.editCategoryScene.successDoAction(action)
    );

    await ctx.scene.enter(scenes.edit.category);
  }

  @Action('SetupCategoryScene')
  async SetupCategoryScene(@Ctx() ctx: any) {
    await ctx.scene.enter(scenes.edit.category);
    return;
  }

  @SceneLeave()
  async onLeave(@Ctx() ctx: any) {
    this.logger.debug(`${ctx.chat.id} scene leave`);
    this.telegramService.clearMessageStorage(ctx, ctx.chat.id);
  }
}
