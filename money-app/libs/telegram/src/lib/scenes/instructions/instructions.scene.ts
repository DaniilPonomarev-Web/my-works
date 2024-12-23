import { Injectable, Logger } from '@nestjs/common';
import {
  Action,
  Ctx,
  Scene,
  SceneEnter,
  SceneLeave,
  Start,
} from 'nestjs-telegraf';
import { scenes } from '../../scenesNames';
import { TelegramService } from '../../telegram.service';
import {
  InstructionsSceneMenu,
  InstructionsSettingMenu,
  InstructionsSettingMenuBack,
  InstructionsSettingMenuBackSetting,
  messageForSettings,
} from './store';

@Injectable()
@Scene(scenes.instructions)
export class InstructionsScene {
  private logger = new Logger(InstructionsScene.name);

  constructor(private readonly telegramService: TelegramService) {}

  @Start()
  @SceneEnter()
  async start(@Ctx() ctx: any) {
    ctx.scene.state.messages = [];
    const chatId = ctx.chat.id;
    this.logger.debug(`chatId: ${chatId} message: instructionsScene start`);
    await this.telegramService.reply(ctx, 'Справка по:', {
      reply_markup: {
        inline_keyboard: InstructionsSceneMenu,
      },
    });
    return;
  }

  @Action(/instructionsSetting/)
  async instructionsSetting(@Ctx() ctx: any) {
    await ctx.answerCbQuery();
    await this.telegramService.reply(
      ctx,
      messageForSettings.all.instructionsSetting,
      {
        reply_markup: {
          inline_keyboard: InstructionsSettingMenu,
        },
      }
    );
  }
  @Action(/instructionsIncome/)
  async instructionsIncome(@Ctx() ctx: any) {
    await ctx.answerCbQuery();
    await this.telegramService.reply(
      ctx,
      messageForSettings.all.instructionsIncome,
      {
        reply_markup: {
          inline_keyboard: InstructionsSettingMenuBack,
        },
      }
    );
  }
  @Action(/instructionsAboutMe/)
  async instructionsAboutMe(@Ctx() ctx: any) {
    await ctx.answerCbQuery();
    await this.telegramService.reply(
      ctx,
      messageForSettings.all.instructionsAboutMe,
      {
        reply_markup: {
          inline_keyboard: InstructionsSettingMenuBack,
        },
      }
    );
  }
  @Action(/instructionsExpense/)
  async instructionsExpense(@Ctx() ctx: any) {
    await ctx.answerCbQuery();
    await this.telegramService.reply(
      ctx,
      messageForSettings.all.instructionsExpense,
      {
        reply_markup: {
          inline_keyboard: InstructionsSettingMenuBack,
        },
      }
    );
  }
  @Action(/instructionsInvite/)
  async instructionsInvite(@Ctx() ctx: any) {
    await ctx.answerCbQuery();
    await this.telegramService.reply(
      ctx,
      messageForSettings.all.instructionsInvite,
      {
        reply_markup: {
          inline_keyboard: InstructionsSettingMenuBack,
        },
      }
    );
  }

  /*По настройкам ниже */

  @Action(/instructionSettingsGroup/)
  async instructionGroup(@Ctx() ctx: any) {
    await ctx.answerCbQuery();
    await this.telegramService.reply(
      ctx,
      messageForSettings.settings.instructionSetingsGroup,
      {
        reply_markup: {
          inline_keyboard: InstructionsSettingMenuBackSetting,
        },
      }
    );
  }

  @Action(/instructionSettingsCategory/)
  async instructionCategory(@Ctx() ctx: any) {
    await ctx.answerCbQuery();
    await this.telegramService.reply(
      ctx,
      messageForSettings.settings.instructionSetingsCategory,
      {
        reply_markup: {
          inline_keyboard: InstructionsSettingMenuBackSetting,
        },
      }
    );
  }

  @Action(/instructionSettingsUsers/)
  async instructionExpense(@Ctx() ctx: any) {
    await ctx.answerCbQuery();
    await this.telegramService.reply(
      ctx,
      messageForSettings.settings.instructionSetingsUsers,
      {
        reply_markup: {
          inline_keyboard: InstructionsSettingMenuBackSetting,
        },
      }
    );
  }

  @Action(/instructionSettingsInvite/)
  async instructionInviteds(@Ctx() ctx: any) {
    await ctx.answerCbQuery();
    await this.telegramService.reply(
      ctx,
      messageForSettings.settings.instructionSetingsInviteds,
      {
        reply_markup: {
          inline_keyboard: InstructionsSettingMenuBackSetting,
        },
      }
    );
  }

  @SceneLeave()
  async onLeave(@Ctx() ctx: any) {
    this.telegramService.deleteMessages(ctx.chat.id, ctx.scene.state.messages);
    this.logger.log(`${ctx.chat.id} Ушел со сцены настроек`);
  }
}
