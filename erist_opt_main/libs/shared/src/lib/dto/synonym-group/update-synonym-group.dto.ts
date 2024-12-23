import { InputType, Field, ID } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsUUID } from 'class-validator';
import { IUpdateSynonymGroup } from '../../interfaces';

@InputType({ description: 'Входные данные для обновления группы синонимов' })
export class UpdateSynonymGroupDto implements IUpdateSynonymGroup {
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
