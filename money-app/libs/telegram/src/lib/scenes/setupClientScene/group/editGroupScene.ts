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
import { SceneContext } from 'telegraf/typings/scenes';
import { Update as UpdateCtx } from 'telegraf/typings/core/types/typegram';
import { selectCategoryTypes, setupClientKeyboard } from './store';
import { CategoryService } from '@money-app/category';
import { ICategoryInput } from '@money-app/shared';
import { TransactionType } from '@money-app/entities';
import { Variables } from '../../../variables';

@Injectable()
@Scene(scenes.edit.group.edit)
export class EditGroupsScene {
  private logger = new Logger(EditGroupsScene.name);
  constructor(
    private readonly userService: UserService,
    private readonly telegramService: TelegramService,
    private readonly categoryService: CategoryService,
    private readonly groupService: GroupService
  ) {}

  @Start()
  @SceneEnter()
  async start(@Ctx() ctx: any) {
    ctx.scene.state.messages = [];
    ctx.scene.state['editGroupName'] = false;
    ctx.scene.state['addCategory'] = false;
    ctx.scene.state['newNameCategory'] = '';
    ctx.scene.state['groupId'] = '';
    const chatId = ctx.chat.id;
    const userClient = await this.userService.getAccountByChatId(chatId);

    if (!userClient) {
      await this.telegramService.reply(
        ctx,
        messageForScenes.all.errorMessageNotClient,
        null
      );

      setTimeout(() => {
        return ctx.scene.enter(scenes.main);
      }, 1500);
      return;
    }
    const clientId = userClient.id;
    const userGroups = await this.groupService.findAllByAccountId(clientId);

    if (!userGroups) {
      await this.telegramService.reply(
        ctx,
        messageForScenes.editGroupScene.errorMessageNotGroup,
        null
      );
      await ctx.scene.enter(scenes.edit.group.start);
      return;
    }
    const groupCount = userGroups.length;
    const keyboardForGroups: Array<
      Array<{ text: string; callback_data: string }>
    > = [];
    for (let index = 0; index < groupCount; index++) {
      const group = userGroups[index];

      keyboardForGroups.push([
        {
          text: group.status ? group.name : group.name + ' (Выкл)',
          callback_data: `editGroup:${group.id}`,
        },
      ]);
    }
    keyboardForGroups.push([
      {
        text: messageForScenes.editGroupScene.goBackGroups,
        callback_data: 'SetupGroupScene',
      },
    ]);

    const menuCategories = {
      reply_markup: {
        inline_keyboard: keyboardForGroups,
        resize_keyboard: true,
        one_time_keyboard: false,
      },
    };

    await this.telegramService.reply(
      ctx,
      messageForScenes.editGroupScene.selectGroup,
      menuCategories
    );
  }

  @Action(/editGroup:.+/)
  async editGroup(@Ctx() ctx: any & { update: any }) {
    const cbQuery = ctx.update.callback_query;
    const groupId = cbQuery['data'].split(':')[1];
    const state = ctx.scene.state;
    state['categoryId'] = groupId.categoryId;

    const group = await this.groupService.findOne(groupId);
    if (!group) {
      await this.telegramService.reply(
        ctx,
        messageForScenes.editGroupScene.notGroupFind
      );
      return;
    }
    const sendMessageOptions = {
      chat_id: ctx.update.callback_query.message.chat.id,
      text: messageForScenes.editGroupScene.selectAction,
      reply_markup: JSON.stringify(setupClientKeyboard(groupId, group.status)),
    };

    await this.telegramService.reply(
      ctx,
      sendMessageOptions.text,
      sendMessageOptions
    );
  }

  @Action(/editGroupName:.+/)
  async editGroupName(@Ctx() ctx: any & { update: any }) {
    const state = ctx.scene.state;

    await this.telegramService.reply(
      ctx,
      messageForScenes.editGroupScene.editName,
      null
    );

    const cbQuery = ctx.update.callback_query;
    const groupId = cbQuery['data'].split(':')[1];
    state['groupId'] = groupId;
    state['editGroupName'] = true;
  }

  @Action(/addCategoryForGroup:.+/)
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
  }

  @On('text')
  async onAnswerText(@Ctx() ctx: any & { update: any }) {
    const chatId = ctx.chat.id;
    const state = ctx.scene.state;
    if (Object.keys(state).length === 0 && state.constructor === Object) {
      await this.telegramService.reply(
        ctx,
        messageForScenes.editGroupScene.notFoundDo,
        null
      );
      await ctx.scene.enter(scenes.edit.group.edit);
      return;
    }
    const groupId = state['groupId'];
    if (state['addCategory']) {
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

    if (state['groupId']) {
      const groupName = ctx.update.message.text;
      const updateGroupName = await this.groupService.updateGroupName(
        groupId,
        groupName
      );
      if (!updateGroupName) {
        await this.telegramService.reply(
          ctx,
          messageForScenes.editGroupScene.NotDoName,
          null
        );
      }

      await this.telegramService.reply(
        ctx,
        messageForScenes.editGroupScene.SuccessDoName(groupName),
        null
      );
      state['groupId'] = false;
      await ctx.deleteMessage(ctx.update.message.id, chatId);
      setTimeout(() => {
        ctx.scene.reenter();
      }, 1500);
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
    console.log(addCategory);

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
    //  await ctx.deleteMessage(ctx.update.message.id, chatId);
    setTimeout(() => {
      ctx.scene.reenter();
    }, 1500);
    return;
  }

  @Action(/confirmAction:(.+)/)
  async confirmAction(@Ctx() ctx: any & { update: any }) {
    const actionData = ctx.match[1]; // Получаем данные действия из регулярного выражения
    const [actionName, entityId] = actionData.split(':');

    const keyboard = {
      inline_keyboard: [
        [
          { text: 'Да', callback_data: `${actionName}Confirmed:${entityId}` },
          { text: 'Нет', callback_data: `editGroup:${entityId}` },
        ],
      ],
    };

    await this.telegramService.reply(
      ctx,
      messageForScenes.editGroupScene.yReady,
      {
        reply_markup: keyboard,
      }
    );
    return;
  }

  @Action(/(.+)Confirmed:(.+)/)
  async executeAction(@Ctx() ctx: any & { update: any }) {
    const actionName = ctx.match[1];
    const groupId = ctx.match[2];

    let action = '';
    if (actionName === 'disableGroup') {
      action = 'отключена ';
      const updateStatus = await this.groupService.updateGroupStatus(groupId);
      if (!updateStatus) {
        await this.telegramService.reply(
          ctx,
          messageForScenes.editGroupScene.notDisableGroup,
          null
        );

        // setTimeout(() => {
        //   return ctx.scene.enter(scenes.edit.group.edit);
        // }, 1500);
        await ctx.scene.reenter();
        return;
      }
    }
    if (actionName === 'deleteGroup') {
      action = 'удалена';
      const deleteGroup = await this.groupService.deleteGroup(groupId);
      if (!deleteGroup.success) {
        await this.telegramService.reply(ctx, deleteGroup.message, null);
        setTimeout(() => {
          ctx.scene.reenter();
        }, 2000);
        return;
      }
    }

    await this.telegramService.reply(
      ctx,
      messageForScenes.editGroupScene.successDoAction(action),
      null
    );

    // setTimeout(() => {
    //   return ctx.scene.enter(scenes.edit.group.edit);
    // }, 1500);
    await ctx.scene.reenter();
    return;
  }

  @Action(/SetupGroupScene/)
  async setupGroupScene(
    @Ctx() ctx: SceneContext & { update: UpdateCtx.CallbackQueryUpdate }
  ) {
    const chatId = ctx.update.callback_query.from.id;
    this.logger.log(
      `${chatId} Переходит на сцену настроек группы (scenes.edit.group.start)`
    );
    await ctx.scene.enter(scenes.edit.group.start);
    return;
  }

  @SceneLeave()
  async onLeave(@Ctx() ctx: any) {
    this.telegramService.deleteMessages(ctx.chat.id, ctx.scene.state.messages);
    this.logger.log(`${ctx.chat.id} Ушел с editGroupScene`);
  }
}
