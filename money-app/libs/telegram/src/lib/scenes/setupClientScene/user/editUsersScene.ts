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
import { RedisService } from '@money-app/redis';
import {
  MenuUsersSettings,
  editUserActionsMarkup,
  editUserGroupMarkup,
  getInvitedsUser,
} from './store';
import { SceneContext } from 'telegraf/typings/scenes';

@Injectable()
@Scene(scenes.edit.users)
export class EditUsersScene {
  private logger = new Logger(EditUsersScene.name);
  constructor(
    private readonly userService: UserService,
    private readonly telegramService: TelegramService,
    private readonly redisService: RedisService,
    private readonly groupService: GroupService
  ) {}

  @Start()
  @SceneEnter()
  async start(@Ctx() ctx: any) {
    ctx.scene.state.messages = [];
    const chatId = ctx.chat.id;
    const userClient = await this.userService.getAccountByChatId(chatId);

    // await this.telegramService.reply(
    //   ctx,
    //   messageForScenes.editUsersScene.hello,
    //   null
    // );

    if (!userClient) {
      await this.telegramService.reply(
        ctx,
        messageForScenes.all.errorMessageNotClient,
        null
      );
      await this.telegramService.reply(
        ctx,
        messageForScenes.editUsersScene.checkInviteds,
        getInvitedsUser()
      );
      await this.telegramService.reply(
        ctx,
        messageForScenes.all.noUserMessage,
        null
      );

      await ctx.scene.enter(scenes.main);
      return;
    }
    const clientId = userClient.id;
    const users = await this.userService.getAllUsersByAccount(clientId);

    if (users.length <= 0) {
      await this.telegramService.reply(
        ctx,
        messageForScenes.editUsersScene.notUsers,
        MenuUsersSettings()
      );
      return;
    }

    for (let UserIndex = 0; UserIndex < users.length; UserIndex++) {
      const user = await this.userService.getByChatId(users[UserIndex].chatId);
      if (!user) {
        await this.telegramService.reply(
          ctx,
          messageForScenes.all.noUserMessage,
          null
        );
        return;
      }

      const userGroup = await this.groupService.findOne(user.groupId);

      if (!userGroup) {
        await this.telegramService.reply(
          ctx,
          messageForScenes.all.noUserGroupMessage,
          null
        );
        return;
      }
      if (user) {
        const chatID = users[UserIndex].chatId;
        await this.telegramService.reply(
          ctx,
          messageForScenes.editUsersScene.userInfo(chatID, user, userGroup),
          editUserActionsMarkup(chatID, user?.status, user?.role)
        );
      }
    }
    await this.telegramService.reply(
      ctx,
      messageForScenes.editUsersScene.menu,
      MenuUsersSettings()
    );
  }

  @Action(/updStatusUser:.+/)
  async editGroup(@Ctx() ctx: any & { update: any }) {
    const cbQuery = ctx.update.callback_query;
    const chatId = cbQuery['data'].split(':')[1];
    const userUpdate = await this.userService.updateUserStatus(chatId);
    if (!userUpdate) {
      await ctx.telegram.sendMessage(
        chatId,
        messageForScenes.editUsersScene.notUpdateStatus
      );
    }
    if (userUpdate?.status) {
      await ctx.telegram.sendMessage(
        chatId,
        messageForScenes.editUsersScene.conectBot
      );
    }
    if (!userUpdate?.status) {
      await ctx.telegram.sendMessage(
        chatId,
        messageForScenes.editUsersScene.disconectBot
      );
    }
    await this.telegramService.reply(
      ctx,
      messageForScenes.editUsersScene.editUser(userUpdate),
      null
    );
    await ctx.scene.reenter();
  }

  @Action(/updRoleUser:.+/)
  async updateRoleUser(@Ctx() ctx: any & { update: any }) {
    const cbQuery = ctx.update.callback_query;
    const chatId = cbQuery['data'].split(':')[1];
    const userUpdate = await this.userService.updateUserRole(chatId);
    if (!userUpdate) {
      await ctx.telegram.sendMessage(
        chatId,
        messageForScenes.editUsersScene.notUpdateRole
      );
    }
    if (userUpdate) {
      await ctx.telegram.sendMessage(
        chatId,
        messageForScenes.editUsersScene.userRoleBot
      );
    }

    await this.telegramService.reply(
      ctx,
      messageForScenes.editUsersScene.editUserRole(userUpdate),
      null
    );
    setTimeout(() => {
      ctx.scene.reenter();
    }, 3000);
  }
  @Action(/changeUserGroup:.+/)
  async changeUserGroup(@Ctx() ctx: any & { update: any }) {
    const chatId = ctx.chat.id;

    const userClient = await this.userService.getAccountByChatId(chatId);
    if (!userClient) {
      await this.telegramService.reply(
        ctx,
        messageForScenes.all.errorMessageNotClient,
        null
      );
      return;
    }
    const cbQuery = ctx.update.callback_query;
    const chatIdUser = cbQuery['data'].split(':')[1];

    const user = await this.userService.getByChatId(chatIdUser);
    const userGroupId = user?.groupId;
    if (!userGroupId) {
      await this.telegramService.reply(
        ctx,
        messageForScenes.all.noUserGroupMessage,
        null
      );
      return;
    }

    const clientGroups = await this.groupService.findAllByAccountId(
      userClient?.id
    );
    console.log(clientGroups);

    const filteredClientGroups = clientGroups.filter(
      (group) => group.id !== userGroupId
    );
    if (filteredClientGroups.length === 0) {
      await this.telegramService.reply(
        ctx,
        messageForScenes.editUsersScene.notGroups,
        null
      );
      return;
    }

    for (const group of filteredClientGroups) {
      const chacheGroupEditButton = await this.redisService.setEditGroupButton(
        group.id,
        group.name,
        chatIdUser
      );

      if (chacheGroupEditButton) {
        const buttonsMarkup = editUserGroupMarkup(
          group.name,
          chacheGroupEditButton
        );
        await this.telegramService.reply(
          ctx,
          messageForScenes.editUsersScene.checkGroup,
          buttonsMarkup
        );
      }
    }
  }

  async getEditGroupButton(key: string): Promise<{
    groupId: string;
    groupName: string;
    chatIdUser: number;
  } | null> {
    return await this.redisService.getEditGroupButton(key);
  }

  @Action(/assignGroup:.+/)
  async assignGroup(@Ctx() ctx: any & { update: any }) {
    const cbQuery = ctx.update.callback_query;

    const key = cbQuery['data'].split(':')[1];

    const groupData = await this.redisService.getEditGroupButton(key);

    const updateGroup = await this.userService.updateUserGroup(
      groupData.groupId,
      groupData.chatIdUser
    );

    if (!updateGroup) {
      await this.telegramService.reply(
        ctx,
        messageForScenes.editUsersScene.notUpdateGroup,
        null
      );
    }
    await ctx.telegram.sendMessage(
      groupData.chatIdUser,
      messageForScenes.editUsersScene.updateGroup(groupData.groupName),
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: messageForScenes.all.updateInterface,
                callback_data: 'goMainScene',
              },
            ],
          ],
        },
      }
    );

    await this.telegramService.reply(
      ctx,
      messageForScenes.editUsersScene.editUserGroup(groupData.groupName),
      null
    );

    await ctx.scene.reenter();
  }

  @Action(/SetupInvitedScene/)
  async setupInvitedScene(@Ctx() ctx: SceneContext & { update: any }) {
    const chatId = ctx.update.callback_query.from.id;
    this.logger.log(`${chatId} Переходит на сцену просмотра инвайтов`);
    await ctx.scene.enter(scenes.edit.invite);
  }

  @SceneLeave()
  async onLeave(@Ctx() ctx: any) {
    this.telegramService.deleteMessages(ctx.chat.id, ctx.scene.state.messages);
    this.logger.log(`${ctx.chat.id} Ушел с EditUsersScene`);
  }
}
