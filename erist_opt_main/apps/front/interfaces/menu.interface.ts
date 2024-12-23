interface Description {
  name: string;
  description: string;
  meta_title: string;
  meta_h1: string;
  meta_description: string;
  meta_keyword: string;
}

export interface Category {
  id: string;
  image: string;
  parent_id: string | null;
  sort_order: number;
  status: boolean;
  descriptions: Description[];
  children: Category[];
}

export interface HeaderProps {
  categories: Category[];
}
