import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category, ICategory, TransactionType } from '@money-app/entities';
import { CategoryInputDto, UpdateCategoryInputDto } from './dto/category.dto';
import { ICategoryInput } from '@money-app/shared';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>
  ) {}

  async getCategoryByClientIdAndNameAndCategoryId(
    categoryId: string,
    clientId: string,
    groupId: string,
    categoryName: string
  ): Promise<Category | null> {
    const category = await this.categoryRepo
      .createQueryBuilder('category')
      .where('category.clientId = :clientId', { clientId })
      .andWhere('category.name = :categoryName', { categoryName })
      .andWhere('category.id != :categoryId', { categoryId })
      .andWhere('category.groupId = :groupId', { groupId })
      .getOne();

    return category || null;
  }

  async createCategory(payload: ICategoryInput) {
    const res = await this.categoryRepo
      .createQueryBuilder()
      .insert()
      .values(payload)
      .orIgnore()
      .returning('*')
      .execute();
    return res.raw[0] ?? null;
  }

  async updateCategory(payload: UpdateCategoryInputDto) {
    const category = await this.findOne(payload.id);
    if (!category) {
      return null;
    }
    category.name = payload.name;
    category.status = payload.status;
    return this.categoryRepo.save(category);
  }

  async updateCategoryName(id: string, name: string) {
    const category = await this.findOne(id);
    if (!category) {
      return null;
    }
    category.name = name;
    return this.categoryRepo.save(category);
  }
  async updateCategoryLimit(id: string, limit: number) {
    const category = await this.findOne(id);
    if (!category) {
      return null;
    }
    category.limit = limit;
    return this.categoryRepo.save(category);
  }
  async updateCategoryStatus(id: string) {
    const category = await this.findOne(id);
    if (!category) {
      return null;
    }
    category.status = !category.status;
    return this.categoryRepo.save(category);
  }

  async deleteCategory(id: string) {
    const res = await this.categoryRepo.delete(id);
    return res.affected === 1;
  }

  async findOne(id: string) {
    const res = await this.categoryRepo.findOne({
      where: { id },
    });
    if (!res) {
      return null;
    }

    return res;
  }

  async findAllByClientId(accountId: string): Promise<ICategory[]> {
    return this.categoryRepo.find({ where: { accountId } });
  }

  async findAllByClientIdAndGroupId(
    accountId: string,
    groupId: string
  ): Promise<ICategory[]> {
    return this.categoryRepo.find({
      where: { accountId, groupId },
      order: { name: 'ASC' },
    });
  }

  async findAllExpenseByClientIdAndGroupId(
    accountId: string,
    groupId: string
  ): Promise<ICategory[]> {
    return this.categoryRepo.find({
      where: { accountId, groupId, type: TransactionType.Expense },
      order: { name: 'ASC' },
    });
  }

  findAllIncomeByClientIdAndGroupId(
    accountId: string,
    groupId: string
  ): Promise<ICategory[]> {
    return this.categoryRepo.find({
      where: { accountId, groupId, type: TransactionType.Income },
      order: { name: 'ASC' },
    });
  }

  async findAllByClientIdAndGroupIdAndName(
    clientId: string,
    groupId: string,
    name: string
  ): Promise<ICategory | null> {
    const category = await this.categoryRepo
      .createQueryBuilder('category')
      .where('category.clientId = :clientId', { clientId })
      .andWhere('category.name = :name', { name })
      .andWhere('category.groupId = :groupId', { groupId })
      .getOne();

    return category || null;
  }

  async createDefaultCategories(
    accountId: string,
    groupId: string,
    categories: CategoryInputDto[]
  ): Promise<ICategory[]> {
    const createdCategories = await Promise.all(
      categories.map(async (category) => {
        const newCategory = this.categoryRepo.create({
          accountId,
          name: category.name,
          groupId: groupId,
          type: category.type,
          status: true,
        });
        return await this.categoryRepo.save(newCategory);
      })
    );

    return createdCategories;
  }
}
