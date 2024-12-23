export interface IBanner {
  id: string;
  name: string;
  status: boolean;
  title: string;
  link: string;
  image: string;
  image_mob: string;
  image_href: string;
  image_mob_href: string;
}

export interface IBannersList {
  banners: IBanner[];
  total: number;
}

export interface ICreateBannerInput {
  name: string;
  status: boolean;
  title: string;
  link: string;
  image: string;
  image_mob: string;
}

export interface IUpdateBannerInput {
  id: string;
  name?: string;
  status?: boolean;
  title?: string;
  link?: string;
  image?: string;
  image_mob?: string;
}
