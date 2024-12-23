import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';
import { ICreateSynonymGroup } from '../../interfaces';

@InputType({
  description: 'Входные данные для создания группы синонимов',
})
export class CreateSynonymGroupDto implements ICreateSynonymGroup {
  @IsString()
  @IsNotEmpty()
  @Field({ description: 'Список обновленных синонимов, разделенных запятыми' })
  synonyms: string;
  constructor(synonyms: string) {
    this.synonyms = synonyms;
  }
}
