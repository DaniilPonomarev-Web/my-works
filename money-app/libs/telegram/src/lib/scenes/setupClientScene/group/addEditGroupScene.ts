import { Logger } from '@nestjs/common';

import { UserService } from '@money-app/user';
import { scenes } from '../../../scenesNames';
import { messageForScenes } from '../../../message.patterns';
import { GroupService } from '@money-app/group';
import { TelegramService } from '../../../telegram.service';
import {
  Action,
  Context,
  Ctx,
  SceneLeave,
  Wizard,
  WizardStep,
} from 'nestjs-telegraf';
import { Scenes } from 'telegraf';
import {
  FinishAddGroup,
  addManyCat,
  cancelAddGroup,
  selectCategoryType,
} from './store';
import { CategoryService } from '@money-app/category';
import { EditGroupSceneService } from './editGroupScene.scene.service';
/*
  Pользователь будет добавлять новую группу.
  Собственно, первый вопрос - введите название группы,
  после того как пользователь ввел название группы, переход ко второму шагу, который в свою очередь должен
  спрашивать (вывод двух кнопок) добавть стандартные категории или добавить категории самому. 
  Если пользователь выбрал стандартные категории, то в state записывается category = default его отправляет на следущий шаг.
  Если пользователь нажал "добавить категории самому", то его спрашивает "Введите название категории" и ожидает ввода, 
  когда он ввел, ему предлагается "Добавить ещё категорию" и "К следующему шагу". Если он нажимает "Добавить ещё категорию",
  то его опять спрашивает  "Введите название категории" и ожидает ввода, когда он ввел и так пока он не нажмет 
  "К следующему шагу".
*/
@Wizard(scenes.edit.group.add)
export class AddEditGroupsScene {
  private logger = new Logger(scenes.edit.group.add);
  constructor(
    private readonly userService: UserService,
    private readonly telegramService: TelegramService,
    private readonly categoryService: CategoryService,
    private readonly editGroupService: EditGroupSceneService,
    private readonly groupService: GroupService
  ) {}

  @SceneLeave()
  async onLeave(@Ctx() ctx: any) {
    this.logger.debug(`${ctx.chat.id} scene leave`);
    this.telegramService.clearMessageStorage(ctx, ctx.chat.id);
  }

  @WizardStep(0)
  async groupNameRequest(
    @Context() ctx: Scenes.WizardContext & { session: any; scene: any }
  ) {
    //Запрашиваем имя группы
    // console.log(`/Запрашиваем имя группы`);

    await this.telegramService.reply(
      ctx,
      messageForScenes.editGroupScene.addGroup.messageAddGroupName,
      cancelAddGroup
    );
    ctx.wizard.next();
  }

  @WizardStep(1)
  async nameRequest(@Context() ctx: any) {
    // Приняли имя группы, спрашиваем про категорию
    // console.log(`Приняли имя группы переходим к категории`);

    const groupName = ctx.update['message'].text;
    const answerGroupNameId = ctx.update['message'].message_id;
    this.telegramService.rememberMessage(ctx, answerGroupNameId);
    ctx.scene.state['groupName'] = groupName;
    ctx.wizard.next();
    await ctx.wizard.step(ctx);
  }

  @WizardStep(2)
  async categoryRequest(@Context() ctx: any) {
    // Спрашиваем тип категории
    console.log(`Спрашиваем  тип категории`);
    await this.telegramService.reply(
      ctx,
      messageForScenes.editGroupScene.addGroup.messageSelectCat,
      selectCategoryType
    );
    return;
  }

  @WizardStep(3)
  async manyCat(@Context() ctx: any) {
    console.log('Запрашиваем имя категории');
    await this.telegramService.reply(
      ctx,
      messageForScenes.editGroupScene.addGroup.messageAddCat,
      null
    );
    ctx.wizard.next(); // это автоматически вызовет следующий шаг
  }

  @WizardStep(4)
  async nameCatRequest(@Context() ctx: any) {
    console.log('Принимаем имя категории');

    const catName = ctx.update.message.text;
    const answerCatNameId = ctx.update.message.message_id;

    if (!ctx.scene.state['categories']) {
      ctx.scene.state['categories'] = {};
    }
    if (!ctx.scene.state['categories']['categoryNames']) {
      ctx.scene.state['categories']['categoryNames'] = [];
    }
    ctx.scene.state['categories']['categoryNames'].push(catName);

    this.telegramService.rememberMessage(ctx, answerCatNameId);
    await this.telegramService.reply(
      ctx,
      messageForScenes.editGroupScene.addGroup.messageAddCatQuestion,
      addManyCat
    );
    return;
  }

  @WizardStep(5)
  async createGroupStep(@Context() ctx: any) {
    console.log('Конец создания группы');
    console.log('Спрашиваем, хотим ли мы создать группу');
    const chatId = ctx.chat.id;
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
    const accountId = user.accountId;

    const categories = ctx.scene.state['categories']
      ? ctx.scene.state['categories']['categoryNames']
      : null;

    const group = await this.editGroupService.createGroup(
      chatId,
      accountId,
      ctx.scene.state.groupName,
      categories,
      ctx.scene.state.defaultCat
    );
    console.log(group);
    await this.telegramService.reply(
      ctx,
      messageForScenes.editGroupScene.addGroup.messageFinishCreateGroup(
        ctx.scene.state.groupName
      ),
      FinishAddGroup
    );

    return;
  }

  @Action('action:cancel')
  async cancelHandle(@Context() ctx: any) {
    const chatId = ctx.update.callback_query.from.id;
    this.logger.debug(`${chatId} action: cancel`);
    await ctx.scene.enter(scenes.edit.group.start);
    return;
  }

  @Action('categorySelectDefault')
  async categorySelectDefault(@Context() ctx: any) {
    ctx.scene.state['defaultCat'] = true;
    await ctx.wizard.selectStep(5);
    await ctx.wizard.step(ctx);
  }

  @Action('categorySelectAddSam')
  async categorySelectAddSam(@Context() ctx: any) {
    console.log('categorySelectAddSam');

    ctx.wizard.selectStep(3);
    await ctx.wizard.step(ctx);
  }

  @Action('addManyCat')
  async addManyCat(@Context() ctx: any) {
    console.log('addManyCat');

    ctx.wizard.selectStep(3); // Возврат к шагу 3
    await ctx.wizard.step(ctx);
  }

  @Action('nextStepCat')
  async nextStepCat(@Context() ctx: any) {
    await ctx.wizard.selectStep(5);
    await ctx.wizard.step(ctx);
  }

  @Action('createGroup')
  async createGroup(@Context() ctx: any) {
    await ctx.scene.enter(scenes.main);
  }
}
