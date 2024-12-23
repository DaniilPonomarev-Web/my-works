export interface ISocialHref {
  id: string;
  href: string;
  name: string;
  sortOrder: number;
}

export interface ICreateUpdateSocialHref {
  name: string;
  href: string;
  sortOrder: number;
}

export interface IUpdateSocialHref {
  name: string;
  href: string;
  sortOrder: number;
}
