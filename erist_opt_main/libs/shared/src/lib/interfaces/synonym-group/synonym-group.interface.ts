export interface ISynonymGroup {
  id: string;
  synonyms: string;
}

export interface ISynonymGroupList {
  data: ISynonymGroup[];
  total: number;
}
