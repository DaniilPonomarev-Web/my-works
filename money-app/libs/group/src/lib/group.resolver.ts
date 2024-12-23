import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql';

import { Group, IGroup, IGroupWithCategory } from '@money-app/entities';
import { GroupService } from './group.service';
import {
  GroupDto,
  GroupWithCategoryDto,
  InputCreateGroupDto,
  InputUpdateGroupDto,
} from './dto/group.dto';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@money-app/auth';
import { RabbitService } from '@money-app/rabbit';

@Resolver(() => Group)
export class GroupResolver {
  constructor(
    private readonly groupService: GroupService,
    private readonly rabbitService: RabbitService
  ) {}
  @Mutation(() => GroupDto) // Укажите возвращаемый тип
  @UseGuards(JwtAuthGuard)
  async createGroup(
    @Args('groupInput') groupInput: InputCreateGroupDto
  ): Promise<IGroup> {
    const groupSearch = await this.groupService.getGroupByClientIdAndName(
      groupInput.clientId,
      groupInput.name
    );
    if (groupSearch) {
      throw new HttpException(
        `Группа с названием "${groupInput.name}" уже существует !`,
        HttpStatus.BAD_REQUEST
      );
    }
    const group = await this.groupService.createGroup(groupInput);
    if (!group) {
      throw new HttpException(
        `Ошибка создания категории !`,
        HttpStatus.BAD_REQUEST
      );
    }
    return group;
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async deleteGroup(@Args('id') id: string): Promise<boolean> {
    const group = await this.groupService.findOne(id);
    if (!group) {
      throw new HttpException(`Группа не существует !`, HttpStatus.BAD_REQUEST);
    }

    const deleteGroup = await this.groupService.deleteGroup(id);
    if (!deleteGroup) {
      throw new HttpException(
        `Ошибка удаления группы !`,
        HttpStatus.BAD_REQUEST
      );
    }
    return true;
  }

  @Query(() => [GroupWithCategoryDto])
  @UseGuards(JwtAuthGuard)
  async getCategoriesAndGroups(
    @Args('clientId') clientId: string
  ): Promise<IGroupWithCategory[]> {
    const group = await this.rabbitService.getGroups(clientId);
    if (!group) {
      throw new HttpException(`Группа не существует !`, HttpStatus.BAD_REQUEST);
    }
    const result = [];

    for (const groupItem of group) {
      const categories = await this.rabbitService.getGroupsWithCategories(
        clientId,
        groupItem.id
      );

      if (categories) {
        const groupData = {
          id: groupItem.id,
          name: groupItem.name,
          clientId: groupItem.clientId,
          status: groupItem.status,
          categories: categories,
        };

        result.push(groupData);
      }
    }

    return result;
  }

  @Mutation(() => GroupDto, { nullable: false })
  @UseGuards(JwtAuthGuard)
  async updateGroup(
    @Args('updateGroup')
    inputUpdateGroup: InputUpdateGroupDto
  ): Promise<IGroup> {
    const Group = await this.groupService.findOne(inputUpdateGroup.id);
    if (!Group) {
      throw new HttpException(
        `Группа  "${inputUpdateGroup.name}" не существует !`,
        HttpStatus.BAD_REQUEST
      );
    }

    const GroupSearchName =
      await this.groupService.getGroupByClientIdAndNameAndCateforyId(
        inputUpdateGroup.id,
        inputUpdateGroup.clientId,
        inputUpdateGroup.name
      );
    if (GroupSearchName) {
      throw new HttpException(
        `Группа с названием "${inputUpdateGroup.name}" уже существует !`,
        HttpStatus.BAD_REQUEST
      );
    }

    const updatedGroup = await this.groupService.updateGroup(inputUpdateGroup);
    if (!updatedGroup) {
      throw new HttpException(
        `Ошибка обновления категории !`,
        HttpStatus.BAD_REQUEST
      );
    }
    return updatedGroup;
  }

  @Query(() => [GroupDto])
  @UseGuards(JwtAuthGuard)
  async getAllGroups(@Args('clientId') clientId: string): Promise<IGroup[]> {
    const groups = await this.groupService.findAllByAccountId(clientId);
    return groups;
  }
}
