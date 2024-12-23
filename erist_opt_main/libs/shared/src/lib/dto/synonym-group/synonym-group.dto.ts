import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsUUID, IsOptional } from 'class-validator';
import { ISynonymGroup, ISynonymGroupList } from '../../interfaces';

@ObjectType({ description: 'группы синонимов' })
export class SynonymGroupDto implements ISynonymGroup {
  @Field(() => ID, { description: 'ID группы синонимов' })
  @IsUUID()
  id: string;

  @Field({ description: 'Список обновленных синонимов, разделенных запятыми' })
  @IsString()
  @IsNotEmpty()
  synonyms: string;

  constructor(id: string, synonyms: string) {
    this.id = id;
    this.synonyms = synonyms;
  }
}

@ObjectType({ description: 'группы синонимов' })
export class SynonymGroupListDto implements ISynonymGroupList {
  @Field(() => [SynonymGroupDto], { description: 'ID группы синонимов' })
  data: SynonymGroupDto[];

  @Field({ description: 'Количество групп синонимов' })
  total: number;

  constructor(data: SynonymGroupDto[], total: number) {
    this.data = data;
    this.total = total;
  }
}

@InputType({ description: 'Инпут для фильтров групп синонимов' })
export class SynonymGroupFilterAdminDTO {
  @IsOptional()
  @Field(() => String, {
    nullable: true,
    description: 'фильтр по статусу',
  })
  synonym: string;

  constructor(synonym: string) {
    this.synonym = synonym;
  }
}
