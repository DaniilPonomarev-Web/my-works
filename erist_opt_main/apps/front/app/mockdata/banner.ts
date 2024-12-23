interface IBanner {
  id: string;
  name: string;
  status: boolean;
  title: string | null;
  link: string;
  image: string;
  image_mob: string;
}

// Интерфейс для данных, возвращаемых из GraphQL
export interface IBannerData {
  bannersTrue: IBanner[];
}

// Интерфейс для пропсов компонента Banner
export interface BannerProps {
  banner: IBanner;
}

export const bannerData = {
  id: '344a2181-6456-4677-b46b-ffff9fdb1cd6',
  name: 'ONE Banner Updated',
  status: true,
  title: 'Welcome to erist b2b updated',
  link: 'https://erist.store/',
  image:
    'https://erist.store/image/cache/webp/catalog/22.05.24banner/unnamed%287%29-1920x500.webp',
  image_mob:
    'https://erist.store/image/cache/webp/catalog/22.05.24banner/unnamed%286%29-3072x4096.webp',
};
