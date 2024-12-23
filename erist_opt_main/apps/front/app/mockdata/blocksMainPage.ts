interface Image {
  id: string;
  image: string;
  sortOrder: number;
}

interface Description {
  name: string;
  description: string;
  tag: string;
  meta_title: string;
  meta_h1: string;
  meta_description: string;
}

interface Product {
  id: string;
  model: string;
  price: number;
  quantity: number;
  maincategory: string;
  categories: string[];
  status: boolean;
  sortOrder: number;
  description: Description;
  images: Image[];
}

export interface IBlock {
  id: string;
  name: string;
  title: string;
  link: string;
  status: boolean;
  products: Product[];
}

export const mainPageBlocks: IBlock[] = [
  {
    id: 'fcb40c45-1e96-44f1-88aa-eee2627f511f',
    name: 'Рекомендуемые товары',
    title: 'Рекомендуемые товары',
    link: 'https://erist.store/updated',
    status: true,
    products: [
      {
        id: '8faf6f35-1fa4-490f-bda3-017462282ab6',
        model: 'Model123',
        price: 1459,
        quantity: 100,
        maincategory: 'Electronics',
        categories: ['1bab9b17-54f6-4e56-8648-280dc66b459c'],
        status: true,
        sortOrder: 1,
        description: {
          name: 'Джинсы Slouchy Light Blue',
          description: 'Джинсы Slouchy Light Blue',
          tag: 'Product Tag',
          meta_title: 'Product Meta Title',
          meta_h1: 'Product Meta H1',
          meta_description: 'Product Meta Description',
        },
        images: [
          {
            id: 'ff2a8661-3769-419f-8c80-913c840dbde6',
            image:
              'https://erist.store/image/cache/webp/catalog/jemper-jacquard/24-03-28_74424-332x483.webp',
            sortOrder: 2,
          },
          {
            id: '2d4a0f23-733d-4360-a15e-e4b5ca35bd24',
            image:
              'https://erist.store/image/cache/webp/catalog/novinkivesna2024/1foto/tb-58-332x483.webp',
            sortOrder: 1,
          },
        ],
      },
      {
        id: '8faf6f35-1fa4-490f-bda3-0174622822b6',
        model: 'Model123',
        price: 1459,
        quantity: 100,
        maincategory: 'Electronics',
        categories: ['1bab9b17-54f6-4e56-8648-280dc66b459c'],
        status: true,
        sortOrder: 1,
        description: {
          name: 'Джинсы Slouchy Light Blue',
          description: 'Product Description',
          tag: 'Product Tag',
          meta_title: 'Product Meta Title',
          meta_h1: 'Product Meta H1',
          meta_description: 'Product Meta Description',
        },
        images: [
          {
            id: '2d4a0f23-733d-4360-a15e-e4b5ca35bd24',
            image:
              'https://erist.store/image/cache/webp/catalog/novinkivesna2024/1foto/tb-58-332x483.webp',
            sortOrder: 1,
          },
          {
            id: 'ff2a8661-3769-419f-8c80-913c840dbde6',
            image:
              'https://erist.store/image/cache/webp/catalog/03.05.24kostjumyletnie/2024-04-06_erist08878-332x483.webp',
            sortOrder: 2,
          },
        ],
      },
      {
        id: '8faf6f35-1fa4-490f-bda3-0174622823b6',
        model: 'Model123',
        price: 1459,
        quantity: 100,
        maincategory: 'Electronics',
        categories: ['1bab9b17-54f6-4e56-8648-280dc66b459c'],
        status: true,
        sortOrder: 1,
        description: {
          name: 'Джинсы Slouchy Light Blue',
          description: 'Product Description',
          tag: 'Product Tag',
          meta_title: 'Product Meta Title',
          meta_h1: 'Product Meta H1',
          meta_description: 'Product Meta Description',
        },
        images: [
          {
            id: 'ff2a8661-3769-419f-8c80-913c840dbde6',
            image:
              'https://erist.store/image/cache/webp/catalog/03.05.24kostjumyletnie/2024-04-06_erist08878-332x483.webp',
            sortOrder: 2,
          },
          {
            id: '2d4a0f23-733d-4360-a15e-e4b5ca35bd24',
            image:
              'https://erist.store/image/cache/webp/catalog/novinkivesna2024/1foto/tb-58-332x483.webp',
            sortOrder: 1,
          },
        ],
      },
      {
        id: '8faf6f35-1fa4-490f-bda3-017462282ab6',
        model: 'Model123',
        price: 1459,
        quantity: 100,
        maincategory: 'Electronics',
        categories: ['1bab9b17-54f6-4e56-8648-280dc66b459c'],
        status: true,
        sortOrder: 1,
        description: {
          name: 'Джинсы Slouchy Light Blue',
          description: 'Product Description',
          tag: 'Product Tag',
          meta_title: 'Product Meta Title',
          meta_h1: 'Product Meta H1',
          meta_description: 'Product Meta Description',
        },
        images: [
          {
            id: 'ff2a8661-3769-419f-8c80-913c840dbde6',
            image:
              'https://erist.store/image/cache/webp/catalog/03.05.24kostjumyletnie/2024-04-06_erist08878-332x483.webp',
            sortOrder: 2,
          },
          {
            id: '2d4a0f23-733d-4360-a15e-e4b5ca35bd24',
            image:
              'https://erist.store/image/cache/webp/catalog/novinkivesna2024/1foto/tb-58-332x483.webp',
            sortOrder: 1,
          },
        ],
      },
      {
        id: '8faf6f35-1fa4-490f-bda3-017462282ab6',
        model: 'Model123',
        price: 1459,
        quantity: 100,
        maincategory: 'Electronics',
        categories: ['1bab9b17-54f6-4e56-8648-280dc66b459c'],
        status: true,
        sortOrder: 1,
        description: {
          name: 'Джинсы Slouchy Light Blue',
          description: 'Product Description',
          tag: 'Product Tag',
          meta_title: 'Product Meta Title',
          meta_h1: 'Product Meta H1',
          meta_description: 'Product Meta Description',
        },
        images: [
          {
            id: 'ff2a8661-3769-419f-8c80-913c840dbde6',
            image:
              'https://erist.store/image/cache/webp/catalog/03.05.24kostjumyletnie/2024-04-06_erist08878-332x483.webp',
            sortOrder: 2,
          },
          {
            id: '2d4a0f23-733d-4360-a15e-e4b5ca35bd24',
            image:
              'https://erist.store/image/cache/webp/catalog/novinkivesna2024/1foto/tb-58-332x483.webp',
            sortOrder: 1,
          },
        ],
      },
      {
        id: '8faf6f35-1fa4-490f-bda3-017462282ab6',
        model: 'Model123',
        price: 1459,
        quantity: 100,
        maincategory: 'Electronics',
        categories: ['1bab9b17-54f6-4e56-8648-280dc66b459c'],
        status: true,
        sortOrder: 1,
        description: {
          name: 'Джинсы Slouchy Light Blue',
          description: 'Product Description',
          tag: 'Product Tag',
          meta_title: 'Product Meta Title',
          meta_h1: 'Product Meta H1',
          meta_description: 'Product Meta Description',
        },
        images: [
          {
            id: 'ff2a8661-3769-419f-8c80-913c840dbde6',
            image:
              'https://erist.store/image/cache/webp/catalog/03.05.24kostjumyletnie/2024-04-06_erist08878-332x483.webp',
            sortOrder: 2,
          },
          {
            id: '2d4a0f23-733d-4360-a15e-e4b5ca35bd24',
            image:
              'https://erist.store/image/cache/webp/catalog/novinkivesna2024/1foto/tb-58-332x483.webp',
            sortOrder: 1,
          },
        ],
      },
      {
        id: '8faf6f35-1fa4-490f-bda3-017462282ab6',
        model: 'Model123',
        price: 1459,
        quantity: 100,
        maincategory: 'Electronics',
        categories: ['1bab9b17-54f6-4e56-8648-280dc66b459c'],
        status: true,
        sortOrder: 1,
        description: {
          name: 'Джинсы Slouchy Light Blue',
          description: 'Product Description',
          tag: 'Product Tag',
          meta_title: 'Product Meta Title',
          meta_h1: 'Product Meta H1',
          meta_description: 'Product Meta Description',
        },
        images: [
          {
            id: 'ff2a8661-3769-419f-8c80-913c840dbde6',
            image:
              'https://erist.store/image/cache/webp/catalog/03.05.24kostjumyletnie/2024-04-06_erist08878-332x483.webp',
            sortOrder: 2,
          },
          {
            id: '2d4a0f23-733d-4360-a15e-e4b5ca35bd24',
            image:
              'https://erist.store/image/cache/webp/catalog/novinkivesna2024/1foto/tb-58-332x483.webp',
            sortOrder: 1,
          },
        ],
      },
      {
        id: '8faf6f35-1fa4-490f-bda3-017462282ab6',
        model: 'Model123',
        price: 1459,
        quantity: 100,
        maincategory: 'Electronics',
        categories: ['1bab9b17-54f6-4e56-8648-280dc66b459c'],
        status: true,
        sortOrder: 1,
        description: {
          name: 'Джинсы Slouchy Light Blue',
          description: 'Product Description',
          tag: 'Product Tag',
          meta_title: 'Product Meta Title',
          meta_h1: 'Product Meta H1',
          meta_description: 'Product Meta Description',
        },
        images: [
          {
            id: 'ff2a8661-3769-419f-8c80-913c840dbde6',
            image:
              'https://erist.store/image/cache/webp/catalog/03.05.24kostjumyletnie/2024-04-06_erist08878-332x483.webp',
            sortOrder: 2,
          },
          {
            id: '2d4a0f23-733d-4360-a15e-e4b5ca35bd24',
            image:
              'https://erist.store/image/cache/webp/catalog/novinkivesna2024/1foto/tb-58-332x483.webp',
            sortOrder: 1,
          },
        ],
      },
    ],
  },
  {
    id: '19240ffe-06bd-490f-bca0-4e1ab1083edd',
    name: 'Название нового блока',
    title: 'Заголовок блока',
    link: 'https://example.com',
    status: true,
    products: [
      {
        id: '24a2115d-b1d4-4cb9-910b-c661abaeb99e',
        model: 'Model123',
        price: 1459,
        quantity: 100,
        maincategory: 'Electronics',
        categories: ['1bab9b17-54f6-4e56-8648-280dc66b459c'],
        status: true,
        sortOrder: 1,
        description: {
          name: 'Джинсы Slouchy Light Blue',
          description: 'Product Description',
          tag: 'Product Tag',
          meta_title: 'Product Meta Title',
          meta_h1: 'Product Meta H1',
          meta_description: 'Product Meta Description',
        },
        images: [
          {
            id: '08dbb3ab-fb47-494d-a781-d27ef9b7c97a',
            image:
              'https://erist.store/image/cache/webp/catalog/03.05.24kostjumyletnie/2024-04-06_erist08878-332x483.webp',
            sortOrder: 2,
          },
          {
            id: 'bce5dd61-1c08-4176-b620-6264bc1137da',
            image:
              'https://erist.store/image/cache/webp/catalog/novinkivesna2024/1foto/tb-58-332x483.webp',
            sortOrder: 1,
          },
        ],
      },
      {
        id: '8faf6f35-1fa4-490f-bda3-017462282ab6',
        model: 'Model123',
        price: 1459,
        quantity: 100,
        maincategory: 'Electronics',
        categories: ['1bab9b17-54f6-4e56-8648-280dc66b459c'],
        status: true,
        sortOrder: 1,
        description: {
          name: 'Джинсы Slouchy Light Blue',
          description: 'Product Description',
          tag: 'Product Tag',
          meta_title: 'Product Meta Title',
          meta_h1: 'Product Meta H1',
          meta_description: 'Product Meta Description',
        },
        images: [
          {
            id: '2d4a0f23-733d-4360-a15e-e4b5ca35bd24',
            image:
              'https://erist.store/image/cache/webp/catalog/novinkivesna2024/1foto/tb-58-332x483.webp',
            sortOrder: 1,
          },
          {
            id: 'ff2a8661-3769-419f-8c80-913c840dbde6',
            image:
              'https://erist.store/image/cache/webp/catalog/03.05.24kostjumyletnie/2024-04-06_erist08878-332x483.webp',
            sortOrder: 2,
          },
        ],
      },
      {
        id: '8faf6f35-1fa4-490f-bda3-017462282ab6',
        model: 'Model123',
        price: 1459,
        quantity: 100,
        maincategory: 'Electronics',
        categories: ['1bab9b17-54f6-4e56-8648-280dc66b459c'],
        status: true,
        sortOrder: 1,
        description: {
          name: 'Джинсы Slouchy Light Blue',
          description: 'Product Description',
          tag: 'Product Tag',
          meta_title: 'Product Meta Title',
          meta_h1: 'Product Meta H1',
          meta_description: 'Product Meta Description',
        },
        images: [
          {
            id: 'ff2a8661-3769-419f-8c80-913c840dbde6',
            image:
              'https://erist.store/image/cache/webp/catalog/03.05.24kostjumyletnie/2024-04-06_erist08878-332x483.webp',
            sortOrder: 2,
          },
          {
            id: '2d4a0f23-733d-4360-a15e-e4b5ca35bd24',
            image:
              'https://erist.store/image/cache/webp/catalog/novinkivesna2024/1foto/tb-58-332x483.webp',
            sortOrder: 1,
          },
        ],
      },
      {
        id: '8faf6f35-1fa4-490f-bda3-017462282ab6',
        model: 'Model123',
        price: 1459,
        quantity: 100,
        maincategory: 'Electronics',
        categories: ['1bab9b17-54f6-4e56-8648-280dc66b459c'],
        status: true,
        sortOrder: 1,
        description: {
          name: 'Джинсы Slouchy Light Blue',
          description: 'Product Description',
          tag: 'Product Tag',
          meta_title: 'Product Meta Title',
          meta_h1: 'Product Meta H1',
          meta_description: 'Product Meta Description',
        },
        images: [
          {
            id: 'ff2a8661-3769-419f-8c80-913c840dbde6',
            image:
              'https://erist.store/image/cache/webp/catalog/03.05.24kostjumyletnie/2024-04-06_erist08878-332x483.webp',
            sortOrder: 2,
          },
          {
            id: '2d4a0f23-733d-4360-a15e-e4b5ca35bd24',
            image:
              'https://erist.store/image/cache/webp/catalog/novinkivesna2024/1foto/tb-58-332x483.webp',
            sortOrder: 1,
          },
        ],
      },
      {
        id: '8faf6f35-1fa4-490f-bda3-017462282ab6',
        model: 'Model123',
        price: 1459,
        quantity: 100,
        maincategory: 'Electronics',
        categories: ['1bab9b17-54f6-4e56-8648-280dc66b459c'],
        status: true,
        sortOrder: 1,
        description: {
          name: 'Джинсы Slouchy Light Blue',
          description: 'Product Description',
          tag: 'Product Tag',
          meta_title: 'Product Meta Title',
          meta_h1: 'Product Meta H1',
          meta_description: 'Product Meta Description',
        },
        images: [
          {
            id: 'ff2a8661-3769-419f-8c80-913c840dbde6',
            image:
              'https://erist.store/image/cache/webp/catalog/03.05.24kostjumyletnie/2024-04-06_erist08878-332x483.webp',
            sortOrder: 2,
          },
          {
            id: '2d4a0f23-733d-4360-a15e-e4b5ca35bd24',
            image:
              'https://erist.store/image/cache/webp/catalog/novinkivesna2024/1foto/tb-58-332x483.webp',
            sortOrder: 1,
          },
        ],
      },
      {
        id: '8faf6f35-1fa4-490f-bda3-017462282ab6',
        model: 'Model123',
        price: 1459,
        quantity: 100,
        maincategory: 'Electronics',
        categories: ['1bab9b17-54f6-4e56-8648-280dc66b459c'],
        status: true,
        sortOrder: 1,
        description: {
          name: 'Джинсы Slouchy Light Blue',
          description: 'Product Description',
          tag: 'Product Tag',
          meta_title: 'Product Meta Title',
          meta_h1: 'Product Meta H1',
          meta_description: 'Product Meta Description',
        },
        images: [
          {
            id: 'ff2a8661-3769-419f-8c80-913c840dbde6',
            image:
              'https://erist.store/image/cache/webp/catalog/03.05.24kostjumyletnie/2024-04-06_erist08878-332x483.webp',
            sortOrder: 2,
          },
          {
            id: '2d4a0f23-733d-4360-a15e-e4b5ca35bd24',
            image:
              'https://erist.store/image/cache/webp/catalog/novinkivesna2024/1foto/tb-58-332x483.webp',
            sortOrder: 1,
          },
        ],
      },
      {
        id: '8faf6f35-1fa4-490f-bda3-017462282ab6',
        model: 'Model123',
        price: 1459,
        quantity: 100,
        maincategory: 'Electronics',
        categories: ['1bab9b17-54f6-4e56-8648-280dc66b459c'],
        status: true,
        sortOrder: 1,
        description: {
          name: 'Джинсы Slouchy Light Blue',
          description: 'Product Description',
          tag: 'Product Tag',
          meta_title: 'Product Meta Title',
          meta_h1: 'Product Meta H1',
          meta_description: 'Product Meta Description',
        },
        images: [
          {
            id: 'ff2a8661-3769-419f-8c80-913c840dbde6',
            image:
              'https://erist.store/image/cache/webp/catalog/03.05.24kostjumyletnie/2024-04-06_erist08878-332x483.webp',
            sortOrder: 2,
          },
          {
            id: '2d4a0f23-733d-4360-a15e-e4b5ca35bd24',
            image:
              'https://erist.store/image/cache/webp/catalog/novinkivesna2024/1foto/tb-58-332x483.webp',
            sortOrder: 1,
          },
        ],
      },
      {
        id: '8faf6f35-1fa4-490f-bda3-017462282ab6',
        model: 'Model123',
        price: 1459,
        quantity: 100,
        maincategory: 'Electronics',
        categories: ['1bab9b17-54f6-4e56-8648-280dc66b459c'],
        status: true,
        sortOrder: 1,
        description: {
          name: 'Джинсы Slouchy Light Blue',
          description: 'Product Description',
          tag: 'Product Tag',
          meta_title: 'Product Meta Title',
          meta_h1: 'Product Meta H1',
          meta_description: 'Product Meta Description',
        },
        images: [
          {
            id: 'ff2a8661-3769-419f-8c80-913c840dbde6',
            image:
              'https://erist.store/image/cache/webp/catalog/03.05.24kostjumyletnie/2024-04-06_erist08878-332x483.webp',
            sortOrder: 2,
          },
          {
            id: '2d4a0f23-733d-4360-a15e-e4b5ca35bd24',
            image:
              'https://erist.store/image/cache/webp/catalog/novinkivesna2024/1foto/tb-58-332x483.webp',
            sortOrder: 1,
          },
        ],
      },
    ],
  },
  {
    id: '35953539-46c5-4c13-8c75-ba0e5827450a',
    name: 'Популярные товары',
    title: 'Популярные товары',
    link: 'https://example.com',
    status: true,
    products: [
      {
        id: '24a2115d-b1d4-4cb9-910b-c661abaeb99e',
        model: 'Model123',
        price: 1459,
        quantity: 100,
        maincategory: 'Electronics',
        categories: ['1bab9b17-54f6-4e56-8648-280dc66b459c'],
        status: true,
        sortOrder: 1,
        description: {
          name: 'Джинсы Slouchy Light Blue',
          description: 'Product Description',
          tag: 'Product Tag',
          meta_title: 'Product Meta Title',
          meta_h1: 'Product Meta H1',
          meta_description: 'Product Meta Description',
        },
        images: [
          {
            id: '08dbb3ab-fb47-494d-a781-d27ef9b7c97a',
            image:
              'https://erist.store/image/cache/webp/catalog/03.05.24kostjumyletnie/2024-04-06_erist08878-332x483.webp',
            sortOrder: 2,
          },
          {
            id: 'bce5dd61-1c08-4176-b620-6264bc1137da',
            image:
              'https://erist.store/image/cache/webp/catalog/novinkivesna2024/1foto/tb-58-332x483.webp',
            sortOrder: 1,
          },
        ],
      },
      {
        id: '8faf6f35-1fa4-490f-bda3-017462282ab6',
        model: 'Model123',
        price: 1459,
        quantity: 100,
        maincategory: 'Electronics',
        categories: ['1bab9b17-54f6-4e56-8648-280dc66b459c'],
        status: true,
        sortOrder: 1,
        description: {
          name: 'Джинсы Slouchy Light Blue',
          description: 'Product Description',
          tag: 'Product Tag',
          meta_title: 'Product Meta Title',
          meta_h1: 'Product Meta H1',
          meta_description: 'Product Meta Description',
        },
        images: [
          {
            id: 'ff2a8661-3769-419f-8c80-913c840dbde6',
            image:
              'https://erist.store/image/cache/webp/catalog/03.05.24kostjumyletnie/2024-04-06_erist08878-332x483.webp',
            sortOrder: 2,
          },
          {
            id: '2d4a0f23-733d-4360-a15e-e4b5ca35bd24',
            image:
              'https://erist.store/image/cache/webp/catalog/novinkivesna2024/1foto/tb-58-332x483.webp',
            sortOrder: 1,
          },
        ],
      },
      {
        id: '8faf6f35-1fa4-490f-bda3-017462282ab6',
        model: 'Model123',
        price: 1459,
        quantity: 100,
        maincategory: 'Electronics',
        categories: ['1bab9b17-54f6-4e56-8648-280dc66b459c'],
        status: true,
        sortOrder: 1,
        description: {
          name: 'Джинсы Slouchy Light Blue',
          description: 'Product Description',
          tag: 'Product Tag',
          meta_title: 'Product Meta Title',
          meta_h1: 'Product Meta H1',
          meta_description: 'Product Meta Description',
        },
        images: [
          {
            id: 'ff2a8661-3769-419f-8c80-913c840dbde6',
            image:
              'https://erist.store/image/cache/webp/catalog/03.05.24kostjumyletnie/2024-04-06_erist08878-332x483.webp',
            sortOrder: 2,
          },
          {
            id: '2d4a0f23-733d-4360-a15e-e4b5ca35bd24',
            image:
              'https://erist.store/image/cache/webp/catalog/novinkivesna2024/1foto/tb-58-332x483.webp',
            sortOrder: 1,
          },
        ],
      },
      {
        id: '8faf6f35-1fa4-490f-bda3-017462282ab6',
        model: 'Model123',
        price: 1459,
        quantity: 100,
        maincategory: 'Electronics',
        categories: ['1bab9b17-54f6-4e56-8648-280dc66b459c'],
        status: true,
        sortOrder: 1,
        description: {
          name: 'Джинсы Slouchy Light Blue',
          description: 'Product Description',
          tag: 'Product Tag',
          meta_title: 'Product Meta Title',
          meta_h1: 'Product Meta H1',
          meta_description: 'Product Meta Description',
        },
        images: [
          {
            id: 'ff2a8661-3769-419f-8c80-913c840dbde6',
            image:
              'https://erist.store/image/cache/webp/catalog/03.05.24kostjumyletnie/2024-04-06_erist08878-332x483.webp',
            sortOrder: 2,
          },
          {
            id: '2d4a0f23-733d-4360-a15e-e4b5ca35bd24',
            image:
              'https://erist.store/image/cache/webp/catalog/novinkivesna2024/1foto/tb-58-332x483.webp',
            sortOrder: 1,
          },
        ],
      },
      {
        id: '8faf6f35-1fa4-490f-bda3-017462282ab6',
        model: 'Model123',
        price: 1459,
        quantity: 100,
        maincategory: 'Electronics',
        categories: ['1bab9b17-54f6-4e56-8648-280dc66b459c'],
        status: true,
        sortOrder: 1,
        description: {
          name: 'Джинсы Slouchy Light Blue',
          description: 'Product Description',
          tag: 'Product Tag',
          meta_title: 'Product Meta Title',
          meta_h1: 'Product Meta H1',
          meta_description: 'Product Meta Description',
        },
        images: [
          {
            id: 'ff2a8661-3769-419f-8c80-913c840dbde6',
            image:
              'https://erist.store/image/cache/webp/catalog/03.05.24kostjumyletnie/2024-04-06_erist08878-332x483.webp',
            sortOrder: 2,
          },
          {
            id: '2d4a0f23-733d-4360-a15e-e4b5ca35bd24',
            image:
              'https://erist.store/image/cache/webp/catalog/novinkivesna2024/1foto/tb-58-332x483.webp',
            sortOrder: 1,
          },
        ],
      },
      {
        id: '8faf6f35-1fa4-490f-bda3-017462282ab6',
        model: 'Model123',
        price: 1459,
        quantity: 100,
        maincategory: 'Electronics',
        categories: ['1bab9b17-54f6-4e56-8648-280dc66b459c'],
        status: true,
        sortOrder: 1,
        description: {
          name: 'Джинсы Slouchy Light Blue',
          description: 'Product Description',
          tag: 'Product Tag',
          meta_title: 'Product Meta Title',
          meta_h1: 'Product Meta H1',
          meta_description: 'Product Meta Description',
        },
        images: [
          {
            id: 'ff2a8661-3769-419f-8c80-913c840dbde6',
            image:
              'https://erist.store/image/cache/webp/catalog/03.05.24kostjumyletnie/2024-04-06_erist08878-332x483.webp',
            sortOrder: 2,
          },
          {
            id: '2d4a0f23-733d-4360-a15e-e4b5ca35bd24',
            image:
              'https://erist.store/image/cache/webp/catalog/novinkivesna2024/1foto/tb-58-332x483.webp',
            sortOrder: 1,
          },
        ],
      },
      {
        id: '8faf6f35-1fa4-490f-bda3-017462282ab6',
        model: 'Model123',
        price: 1459,
        quantity: 100,
        maincategory: 'Electronics',
        categories: ['1bab9b17-54f6-4e56-8648-280dc66b459c'],
        status: true,
        sortOrder: 1,
        description: {
          name: 'Джинсы Slouchy Light Blue',
          description: 'Product Description',
          tag: 'Product Tag',
          meta_title: 'Product Meta Title',
          meta_h1: 'Product Meta H1',
          meta_description: 'Product Meta Description',
        },
        images: [
          {
            id: 'ff2a8661-3769-419f-8c80-913c840dbde6',
            image:
              'https://erist.store/image/cache/webp/catalog/03.05.24kostjumyletnie/2024-04-06_erist08878-332x483.webp',
            sortOrder: 2,
          },
          {
            id: '2d4a0f23-733d-4360-a15e-e4b5ca35bd24',
            image:
              'https://erist.store/image/cache/webp/catalog/novinkivesna2024/1foto/tb-58-332x483.webp',
            sortOrder: 1,
          },
        ],
      },
      {
        id: '8faf6f35-1fa4-490f-bda3-017462282ab6',
        model: 'Model123',
        price: 1459,
        quantity: 100,
        maincategory: 'Electronics',
        categories: ['1bab9b17-54f6-4e56-8648-280dc66b459c'],
        status: true,
        sortOrder: 1,
        description: {
          name: 'Джинсы Slouchy Light Blue',
          description: 'Product Description',
          tag: 'Product Tag',
          meta_title: 'Product Meta Title',
          meta_h1: 'Product Meta H1',
          meta_description: 'Product Meta Description',
        },
        images: [
          {
            id: 'ff2a8661-3769-419f-8c80-913c840dbde6',
            image:
              'https://erist.store/image/cache/webp/catalog/03.05.24kostjumyletnie/2024-04-06_erist08878-332x483.webp',
            sortOrder: 2,
          },
          {
            id: '2d4a0f23-733d-4360-a15e-e4b5ca35bd24',
            image:
              'https://erist.store/image/cache/webp/catalog/novinkivesna2024/1foto/tb-58-332x483.webp',
            sortOrder: 1,
          },
        ],
      },
      {
        id: '8faf6f35-1fa4-490f-bda3-017462282ab6',
        model: 'Model123',
        price: 1459,
        quantity: 100,
        maincategory: 'Electronics',
        categories: ['1bab9b17-54f6-4e56-8648-280dc66b459c'],
        status: true,
        sortOrder: 1,
        description: {
          name: 'Джинсы Slouchy Light Blue',
          description: 'Product Description',
          tag: 'Product Tag',
          meta_title: 'Product Meta Title',
          meta_h1: 'Product Meta H1',
          meta_description: 'Product Meta Description',
        },
        images: [
          {
            id: 'ff2a8661-3769-419f-8c80-913c840dbde6',
            image:
              'https://erist.store/image/cache/webp/catalog/03.05.24kostjumyletnie/2024-04-06_erist08878-332x483.webp',
            sortOrder: 2,
          },
          {
            id: '2d4a0f23-733d-4360-a15e-e4b5ca35bd24',
            image:
              'https://erist.store/image/cache/webp/catalog/novinkivesna2024/1foto/tb-58-332x483.webp',
            sortOrder: 1,
          },
        ],
      },
      {
        id: '8faf6f35-1fa4-490f-bda3-017462282ab6',
        model: 'Model123',
        price: 1459,
        quantity: 100,
        maincategory: 'Electronics',
        categories: ['1bab9b17-54f6-4e56-8648-280dc66b459c'],
        status: true,
        sortOrder: 1,
        description: {
          name: 'Джинсы Slouchy Light Blue',
          description: 'Product Description',
          tag: 'Product Tag',
          meta_title: 'Product Meta Title',
          meta_h1: 'Product Meta H1',
          meta_description: 'Product Meta Description',
        },
        images: [
          {
            id: 'ff2a8661-3769-419f-8c80-913c840dbde6',
            image:
              'https://erist.store/image/cache/webp/catalog/03.05.24kostjumyletnie/2024-04-06_erist08878-332x483.webp',
            sortOrder: 2,
          },
          {
            id: '2d4a0f23-733d-4360-a15e-e4b5ca35bd24',
            image:
              'https://erist.store/image/cache/webp/catalog/novinkivesna2024/1foto/tb-58-332x483.webp',
            sortOrder: 1,
          },
        ],
      },
      {
        id: '8faf6f35-1fa4-490f-bda3-017462282ab6',
        model: 'Model123',
        price: 1459,
        quantity: 100,
        maincategory: 'Electronics',
        categories: ['1bab9b17-54f6-4e56-8648-280dc66b459c'],
        status: true,
        sortOrder: 1,
        description: {
          name: 'Джинсы Slouchy Light Blue',
          description: 'Product Description',
          tag: 'Product Tag',
          meta_title: 'Product Meta Title',
          meta_h1: 'Product Meta H1',
          meta_description: 'Product Meta Description',
        },
        images: [
          {
            id: 'ff2a8661-3769-419f-8c80-913c840dbde6',
            image:
              'https://erist.store/image/cache/webp/catalog/03.05.24kostjumyletnie/2024-04-06_erist08878-332x483.webp',
            sortOrder: 2,
          },
          {
            id: '2d4a0f23-733d-4360-a15e-e4b5ca35bd24',
            image:
              'https://erist.store/image/cache/webp/catalog/novinkivesna2024/1foto/tb-58-332x483.webp',
            sortOrder: 1,
          },
        ],
      },
      {
        id: '8faf6f35-1fa4-490f-bda3-017462282ab6',
        model: 'Model123',
        price: 1459,
        quantity: 100,
        maincategory: 'Electronics',
        categories: ['1bab9b17-54f6-4e56-8648-280dc66b459c'],
        status: true,
        sortOrder: 1,
        description: {
          name: 'Джинсы Slouchy Light Blue',
          description: 'Product Description',
          tag: 'Product Tag',
          meta_title: 'Product Meta Title',
          meta_h1: 'Product Meta H1',
          meta_description: 'Product Meta Description',
        },
        images: [
          {
            id: 'ff2a8661-3769-419f-8c80-913c840dbde6',
            image:
              'https://erist.store/image/cache/webp/catalog/03.05.24kostjumyletnie/2024-04-06_erist08878-332x483.webp',
            sortOrder: 2,
          },
          {
            id: '2d4a0f23-733d-4360-a15e-e4b5ca35bd24',
            image:
              'https://erist.store/image/cache/webp/catalog/novinkivesna2024/1foto/tb-58-332x483.webp',
            sortOrder: 1,
          },
        ],
      },
      {
        id: '8faf6f35-1fa4-490f-bda3-017462282ab6',
        model: 'Model123',
        price: 1459,
        quantity: 100,
        maincategory: 'Electronics',
        categories: ['1bab9b17-54f6-4e56-8648-280dc66b459c'],
        status: true,
        sortOrder: 1,
        description: {
          name: 'Джинсы Slouchy Light Blue',
          description: 'Product Description',
          tag: 'Product Tag',
          meta_title: 'Product Meta Title',
          meta_h1: 'Product Meta H1',
          meta_description: 'Product Meta Description',
        },
        images: [
          {
            id: 'ff2a8661-3769-419f-8c80-913c840dbde6',
            image:
              'https://erist.store/image/cache/webp/catalog/03.05.24kostjumyletnie/2024-04-06_erist08878-332x483.webp',
            sortOrder: 2,
          },
          {
            id: '2d4a0f23-733d-4360-a15e-e4b5ca35bd24',
            image:
              'https://erist.store/image/cache/webp/catalog/novinkivesna2024/1foto/tb-58-332x483.webp',
            sortOrder: 1,
          },
        ],
      },
    ],
  },
  {
    id: 'ea8597ba-6dfd-41e6-bf63-d83784f33a7d',
    name: 'Название нового блока',
    title: 'Рубашки',
    link: 'https://example.com',
    status: true,
    products: [
      {
        id: '24a2115d-b1d4-4cb9-910b-c661abaeb99e',
        model: 'Model123',
        price: 1459,
        quantity: 100,
        maincategory: 'Electronics',
        categories: ['1bab9b17-54f6-4e56-8648-280dc66b459c'],
        status: true,
        sortOrder: 1,
        description: {
          name: 'Джинсы Slouchy Light Blue',
          description: 'Product Description',
          tag: 'Product Tag',
          meta_title: 'Product Meta Title',
          meta_h1: 'Product Meta H1',
          meta_description: 'Product Meta Description',
        },
        images: [
          {
            id: '08dbb3ab-fb47-494d-a781-d27ef9b7c97a',
            image:
              'https://erist.store/image/cache/webp/catalog/03.05.24kostjumyletnie/2024-04-06_erist08878-332x483.webp',
            sortOrder: 2,
          },
          {
            id: 'bce5dd61-1c08-4176-b620-6264bc1137da',
            image:
              'https://erist.store/image/cache/webp/catalog/novinkivesna2024/1foto/tb-58-332x483.webp',
            sortOrder: 1,
          },
        ],
      },
      {
        id: '8faf6f35-1fa4-490f-bda3-017462282ab6',
        model: 'Model123',
        price: 1459,
        quantity: 100,
        maincategory: 'Electronics',
        categories: ['1bab9b17-54f6-4e56-8648-280dc66b459c'],
        status: true,
        sortOrder: 1,
        description: {
          name: 'Джинсы Slouchy Light Blue',
          description: 'Product Description',
          tag: 'Product Tag',
          meta_title: 'Product Meta Title',
          meta_h1: 'Product Meta H1',
          meta_description: 'Product Meta Description',
        },
        images: [
          {
            id: 'ff2a8661-3769-419f-8c80-913c840dbde6',
            image:
              'https://erist.store/image/cache/webp/catalog/03.05.24kostjumyletnie/2024-04-06_erist08878-332x483.webp',
            sortOrder: 2,
          },
          {
            id: '2d4a0f23-733d-4360-a15e-e4b5ca35bd24',
            image:
              'https://erist.store/image/cache/webp/catalog/novinkivesna2024/1foto/tb-58-332x483.webp',
            sortOrder: 1,
          },
        ],
      },
      {
        id: '8faf6f35-1fa4-490f-bda3-017462282ab6',
        model: 'Model123',
        price: 1459,
        quantity: 100,
        maincategory: 'Electronics',
        categories: ['1bab9b17-54f6-4e56-8648-280dc66b459c'],
        status: true,
        sortOrder: 1,
        description: {
          name: 'Джинсы Slouchy Light Blue',
          description: 'Product Description',
          tag: 'Product Tag',
          meta_title: 'Product Meta Title',
          meta_h1: 'Product Meta H1',
          meta_description: 'Product Meta Description',
        },
        images: [
          {
            id: 'ff2a8661-3769-419f-8c80-913c840dbde6',
            image:
              'https://erist.store/image/cache/webp/catalog/03.05.24kostjumyletnie/2024-04-06_erist08878-332x483.webp',
            sortOrder: 2,
          },
          {
            id: '2d4a0f23-733d-4360-a15e-e4b5ca35bd24',
            image:
              'https://erist.store/image/cache/webp/catalog/novinkivesna2024/1foto/tb-58-332x483.webp',
            sortOrder: 1,
          },
        ],
      },
      {
        id: '8faf6f35-1fa4-490f-bda3-017462282ab6',
        model: 'Model123',
        price: 1459,
        quantity: 100,
        maincategory: 'Electronics',
        categories: ['1bab9b17-54f6-4e56-8648-280dc66b459c'],
        status: true,
        sortOrder: 1,
        description: {
          name: 'Джинсы Slouchy Light Blue',
          description: 'Product Description',
          tag: 'Product Tag',
          meta_title: 'Product Meta Title',
          meta_h1: 'Product Meta H1',
          meta_description: 'Product Meta Description',
        },
        images: [
          {
            id: 'ff2a8661-3769-419f-8c80-913c840dbde6',
            image:
              'https://erist.store/image/cache/webp/catalog/03.05.24kostjumyletnie/2024-04-06_erist08878-332x483.webp',
            sortOrder: 2,
          },
          {
            id: '2d4a0f23-733d-4360-a15e-e4b5ca35bd24',
            image:
              'https://erist.store/image/cache/webp/catalog/novinkivesna2024/1foto/tb-58-332x483.webp',
            sortOrder: 1,
          },
        ],
      },
      {
        id: '8faf6f35-1fa4-490f-bda3-017462282ab6',
        model: 'Model123',
        price: 1459,
        quantity: 100,
        maincategory: 'Electronics',
        categories: ['1bab9b17-54f6-4e56-8648-280dc66b459c'],
        status: true,
        sortOrder: 1,
        description: {
          name: 'Джинсы Slouchy Light Blue',
          description: 'Product Description',
          tag: 'Product Tag',
          meta_title: 'Product Meta Title',
          meta_h1: 'Product Meta H1',
          meta_description: 'Product Meta Description',
        },
        images: [
          {
            id: 'ff2a8661-3769-419f-8c80-913c840dbde6',
            image:
              'https://erist.store/image/cache/webp/catalog/03.05.24kostjumyletnie/2024-04-06_erist08878-332x483.webp',
            sortOrder: 2,
          },
          {
            id: '2d4a0f23-733d-4360-a15e-e4b5ca35bd24',
            image:
              'https://erist.store/image/cache/webp/catalog/novinkivesna2024/1foto/tb-58-332x483.webp',
            sortOrder: 1,
          },
        ],
      },
      {
        id: '8faf6f35-1fa4-490f-bda3-017462282ab6',
        model: 'Model123',
        price: 1459,
        quantity: 100,
        maincategory: 'Electronics',
        categories: ['1bab9b17-54f6-4e56-8648-280dc66b459c'],
        status: true,
        sortOrder: 1,
        description: {
          name: 'Джинсы Slouchy Light Blue',
          description: 'Product Description',
          tag: 'Product Tag',
          meta_title: 'Product Meta Title',
          meta_h1: 'Product Meta H1',
          meta_description: 'Product Meta Description',
        },
        images: [
          {
            id: 'ff2a8661-3769-419f-8c80-913c840dbde6',
            image:
              'https://erist.store/image/cache/webp/catalog/03.05.24kostjumyletnie/2024-04-06_erist08878-332x483.webp',
            sortOrder: 2,
          },
          {
            id: '2d4a0f23-733d-4360-a15e-e4b5ca35bd24',
            image:
              'https://erist.store/image/cache/webp/catalog/novinkivesna2024/1foto/tb-58-332x483.webp',
            sortOrder: 1,
          },
        ],
      },
      {
        id: '8faf6f35-1fa4-490f-bda3-017462282ab6',
        model: 'Model123',
        price: 1459,
        quantity: 100,
        maincategory: 'Electronics',
        categories: ['1bab9b17-54f6-4e56-8648-280dc66b459c'],
        status: true,
        sortOrder: 1,
        description: {
          name: 'Джинсы Slouchy Light Blue',
          description: 'Product Description',
          tag: 'Product Tag',
          meta_title: 'Product Meta Title',
          meta_h1: 'Product Meta H1',
          meta_description: 'Product Meta Description',
        },
        images: [
          {
            id: 'ff2a8661-3769-419f-8c80-913c840dbde6',
            image:
              'https://erist.store/image/cache/webp/catalog/03.05.24kostjumyletnie/2024-04-06_erist08878-332x483.webp',
            sortOrder: 2,
          },
          {
            id: '2d4a0f23-733d-4360-a15e-e4b5ca35bd24',
            image:
              'https://erist.store/image/cache/webp/catalog/novinkivesna2024/1foto/tb-58-332x483.webp',
            sortOrder: 1,
          },
        ],
      },
      {
        id: '8faf6f35-1fa4-490f-bda3-017462282ab6',
        model: 'Model123',
        price: 1459,
        quantity: 100,
        maincategory: 'Electronics',
        categories: ['1bab9b17-54f6-4e56-8648-280dc66b459c'],
        status: true,
        sortOrder: 1,
        description: {
          name: 'Джинсы Slouchy Light Blue',
          description: 'Product Description',
          tag: 'Product Tag',
          meta_title: 'Product Meta Title',
          meta_h1: 'Product Meta H1',
          meta_description: 'Product Meta Description',
        },
        images: [
          {
            id: 'ff2a8661-3769-419f-8c80-913c840dbde6',
            image:
              'https://erist.store/image/cache/webp/catalog/03.05.24kostjumyletnie/2024-04-06_erist08878-332x483.webp',
            sortOrder: 2,
          },
          {
            id: '2d4a0f23-733d-4360-a15e-e4b5ca35bd24',
            image:
              'https://erist.store/image/cache/webp/catalog/novinkivesna2024/1foto/tb-58-332x483.webp',
            sortOrder: 1,
          },
        ],
      },
      {
        id: '8faf6f35-1fa4-490f-bda3-017462282ab6',
        model: 'Model123',
        price: 1459,
        quantity: 100,
        maincategory: 'Electronics',
        categories: ['1bab9b17-54f6-4e56-8648-280dc66b459c'],
        status: true,
        sortOrder: 1,
        description: {
          name: 'Джинсы Slouchy Light Blue',
          description: 'Product Description',
          tag: 'Product Tag',
          meta_title: 'Product Meta Title',
          meta_h1: 'Product Meta H1',
          meta_description: 'Product Meta Description',
        },
        images: [
          {
            id: 'ff2a8661-3769-419f-8c80-913c840dbde6',
            image:
              'https://erist.store/image/cache/webp/catalog/03.05.24kostjumyletnie/2024-04-06_erist08878-332x483.webp',
            sortOrder: 2,
          },
          {
            id: '2d4a0f23-733d-4360-a15e-e4b5ca35bd24',
            image:
              'https://erist.store/image/cache/webp/catalog/novinkivesna2024/1foto/tb-58-332x483.webp',
            sortOrder: 1,
          },
        ],
      },
      {
        id: '8faf6f35-1fa4-490f-bda3-017462282ab6',
        model: 'Model123',
        price: 1459,
        quantity: 100,
        maincategory: 'Electronics',
        categories: ['1bab9b17-54f6-4e56-8648-280dc66b459c'],
        status: true,
        sortOrder: 1,
        description: {
          name: 'Джинсы Slouchy Light Blue',
          description: 'Product Description',
          tag: 'Product Tag',
          meta_title: 'Product Meta Title',
          meta_h1: 'Product Meta H1',
          meta_description: 'Product Meta Description',
        },
        images: [
          {
            id: 'ff2a8661-3769-419f-8c80-913c840dbde6',
            image:
              'https://erist.store/image/cache/webp/catalog/03.05.24kostjumyletnie/2024-04-06_erist08878-332x483.webp',
            sortOrder: 2,
          },
          {
            id: '2d4a0f23-733d-4360-a15e-e4b5ca35bd24',
            image:
              'https://erist.store/image/cache/webp/catalog/novinkivesna2024/1foto/tb-58-332x483.webp',
            sortOrder: 1,
          },
        ],
      },
      {
        id: '8faf6f35-1fa4-490f-bda3-017462282ab6',
        model: 'Model123',
        price: 1459,
        quantity: 100,
        maincategory: 'Electronics',
        categories: ['1bab9b17-54f6-4e56-8648-280dc66b459c'],
        status: true,
        sortOrder: 1,
        description: {
          name: 'Джинсы Slouchy Light Blue',
          description: 'Product Description',
          tag: 'Product Tag',
          meta_title: 'Product Meta Title',
          meta_h1: 'Product Meta H1',
          meta_description: 'Product Meta Description',
        },
        images: [
          {
            id: 'ff2a8661-3769-419f-8c80-913c840dbde6',
            image:
              'https://erist.store/image/cache/webp/catalog/03.05.24kostjumyletnie/2024-04-06_erist08878-332x483.webp',
            sortOrder: 2,
          },
          {
            id: '2d4a0f23-733d-4360-a15e-e4b5ca35bd24',
            image:
              'https://erist.store/image/cache/webp/catalog/novinkivesna2024/1foto/tb-58-332x483.webp',
            sortOrder: 1,
          },
        ],
      },
    ],
  },
  {
    id: '27b55560-bf82-4512-9759-1f07f7160c79',
    name: 'Название нового блока',
    title: 'Штаны',
    link: 'https://example.com',
    status: true,
    products: [
      {
        id: '24a2115d-b1d4-4cb9-910b-c661abaeb99e',
        model: 'Model123',
        price: 1459,
        quantity: 100,
        maincategory: 'Electronics',
        categories: ['1bab9b17-54f6-4e56-8648-280dc66b459c'],
        status: true,
        sortOrder: 1,
        description: {
          name: 'Джинсы Slouchy Light Blue',
          description: 'Product Description',
          tag: 'Product Tag',
          meta_title: 'Product Meta Title',
          meta_h1: 'Product Meta H1',
          meta_description: 'Product Meta Description',
        },
        images: [
          {
            id: '08dbb3ab-fb47-494d-a781-d27ef9b7c97a',
            image:
              'https://erist.store/image/cache/webp/catalog/03.05.24kostjumyletnie/2024-04-06_erist08878-332x483.webp',
            sortOrder: 2,
          },
          {
            id: 'bce5dd61-1c08-4176-b620-6264bc1137da',
            image:
              'https://erist.store/image/cache/webp/catalog/novinkivesna2024/1foto/tb-58-332x483.webp',
            sortOrder: 1,
          },
        ],
      },
      {
        id: '8faf6f35-1fa4-490f-bda3-017462282ab6',
        model: 'Model123',
        price: 1459,
        quantity: 100,
        maincategory: 'Electronics',
        categories: ['1bab9b17-54f6-4e56-8648-280dc66b459c'],
        status: true,
        sortOrder: 1,
        description: {
          name: 'Джинсы Slouchy Light Blue',
          description: 'Product Description',
          tag: 'Product Tag',
          meta_title: 'Product Meta Title',
          meta_h1: 'Product Meta H1',
          meta_description: 'Product Meta Description',
        },
        images: [
          {
            id: 'ff2a8661-3769-419f-8c80-913c840dbde6',
            image:
              'https://erist.store/image/cache/webp/catalog/03.05.24kostjumyletnie/2024-04-06_erist08878-332x483.webp',
            sortOrder: 2,
          },
          {
            id: '2d4a0f23-733d-4360-a15e-e4b5ca35bd24',
            image:
              'https://erist.store/image/cache/webp/catalog/novinkivesna2024/1foto/tb-58-332x483.webp',
            sortOrder: 1,
          },
        ],
      },
      {
        id: '8faf6f35-1fa4-490f-bda3-017462282ab6',
        model: 'Model123',
        price: 1459,
        quantity: 100,
        maincategory: 'Electronics',
        categories: ['1bab9b17-54f6-4e56-8648-280dc66b459c'],
        status: true,
        sortOrder: 1,
        description: {
          name: 'Джинсы Slouchy Light Blue',
          description: 'Product Description',
          tag: 'Product Tag',
          meta_title: 'Product Meta Title',
          meta_h1: 'Product Meta H1',
          meta_description: 'Product Meta Description',
        },
        images: [
          {
            id: 'ff2a8661-3769-419f-8c80-913c840dbde6',
            image:
              'https://erist.store/image/cache/webp/catalog/03.05.24kostjumyletnie/2024-04-06_erist08878-332x483.webp',
            sortOrder: 2,
          },
          {
            id: '2d4a0f23-733d-4360-a15e-e4b5ca35bd24',
            image:
              'https://erist.store/image/cache/webp/catalog/novinkivesna2024/1foto/tb-58-332x483.webp',
            sortOrder: 1,
          },
        ],
      },

      {
        id: '8faf6f35-1fa4-490f-bda3-017462282ab6',
        model: 'Model123',
        price: 1459,
        quantity: 100,
        maincategory: 'Electronics',
        categories: ['1bab9b17-54f6-4e56-8648-280dc66b459c'],
        status: true,
        sortOrder: 1,
        description: {
          name: 'Джинсы Slouchy Light Blue',
          description: 'Product Description',
          tag: 'Product Tag',
          meta_title: 'Product Meta Title',
          meta_h1: 'Product Meta H1',
          meta_description: 'Product Meta Description',
        },
        images: [
          {
            id: 'ff2a8661-3769-419f-8c80-913c840dbde6',
            image:
              'https://erist.store/image/cache/webp/catalog/03.05.24kostjumyletnie/2024-04-06_erist08878-332x483.webp',
            sortOrder: 2,
          },
          {
            id: '2d4a0f23-733d-4360-a15e-e4b5ca35bd24',
            image:
              'https://erist.store/image/cache/webp/catalog/novinkivesna2024/1foto/tb-58-332x483.webp',
            sortOrder: 1,
          },
        ],
      },
      {
        id: '8faf6f35-1fa4-490f-bda3-017462282ab6',
        model: 'Model123',
        price: 1459,
        quantity: 100,
        maincategory: 'Electronics',
        categories: ['1bab9b17-54f6-4e56-8648-280dc66b459c'],
        status: true,
        sortOrder: 1,
        description: {
          name: 'Джинсы Slouchy Light Blue',
          description: 'Product Description',
          tag: 'Product Tag',
          meta_title: 'Product Meta Title',
          meta_h1: 'Product Meta H1',
          meta_description: 'Product Meta Description',
        },
        images: [
          {
            id: 'ff2a8661-3769-419f-8c80-913c840dbde6',
            image:
              'https://erist.store/image/cache/webp/catalog/03.05.24kostjumyletnie/2024-04-06_erist08878-332x483.webp',
            sortOrder: 2,
          },
          {
            id: '2d4a0f23-733d-4360-a15e-e4b5ca35bd24',
            image:
              'https://erist.store/image/cache/webp/catalog/novinkivesna2024/1foto/tb-58-332x483.webp',
            sortOrder: 1,
          },
        ],
      },
      {
        id: '8faf6f35-1fa4-490f-bda3-017462282ab6',
        model: 'Model123',
        price: 1459,
        quantity: 100,
        maincategory: 'Electronics',
        categories: ['1bab9b17-54f6-4e56-8648-280dc66b459c'],
        status: true,
        sortOrder: 1,
        description: {
          name: 'Джинсы Slouchy Light Blue',
          description: 'Product Description',
          tag: 'Product Tag',
          meta_title: 'Product Meta Title',
          meta_h1: 'Product Meta H1',
          meta_description: 'Product Meta Description',
        },
        images: [
          {
            id: 'ff2a8661-3769-419f-8c80-913c840dbde6',
            image:
              'https://erist.store/image/cache/webp/catalog/03.05.24kostjumyletnie/2024-04-06_erist08878-332x483.webp',
            sortOrder: 2,
          },
          {
            id: '2d4a0f23-733d-4360-a15e-e4b5ca35bd24',
            image:
              'https://erist.store/image/cache/webp/catalog/novinkivesna2024/1foto/tb-58-332x483.webp',
            sortOrder: 1,
          },
        ],
      },
      {
        id: '8faf6f35-1fa4-490f-bda3-017462282ab6',
        model: 'Model123',
        price: 1459,
        quantity: 100,
        maincategory: 'Electronics',
        categories: ['1bab9b17-54f6-4e56-8648-280dc66b459c'],
        status: true,
        sortOrder: 1,
        description: {
          name: 'Джинсы Slouchy Light Blue',
          description: 'Product Description',
          tag: 'Product Tag',
          meta_title: 'Product Meta Title',
          meta_h1: 'Product Meta H1',
          meta_description: 'Product Meta Description',
        },
        images: [
          {
            id: 'ff2a8661-3769-419f-8c80-913c840dbde6',
            image:
              'https://erist.store/image/cache/webp/catalog/03.05.24kostjumyletnie/2024-04-06_erist08878-332x483.webp',
            sortOrder: 2,
          },
          {
            id: '2d4a0f23-733d-4360-a15e-e4b5ca35bd24',
            image:
              'https://erist.store/image/cache/webp/catalog/novinkivesna2024/1foto/tb-58-332x483.webp',
            sortOrder: 1,
          },
        ],
      },
      {
        id: '8faf6f35-1fa4-490f-bda3-017462282ab6',
        model: 'Model123',
        price: 1459,
        quantity: 100,
        maincategory: 'Electronics',
        categories: ['1bab9b17-54f6-4e56-8648-280dc66b459c'],
        status: true,
        sortOrder: 1,
        description: {
          name: 'Джинсы Slouchy Light Blue',
          description: 'Product Description',
          tag: 'Product Tag',
          meta_title: 'Product Meta Title',
          meta_h1: 'Product Meta H1',
          meta_description: 'Product Meta Description',
        },
        images: [
          {
            id: 'ff2a8661-3769-419f-8c80-913c840dbde6',
            image:
              'https://erist.store/image/cache/webp/catalog/03.05.24kostjumyletnie/2024-04-06_erist08878-332x483.webp',
            sortOrder: 2,
          },
          {
            id: '2d4a0f23-733d-4360-a15e-e4b5ca35bd24',
            image:
              'https://erist.store/image/cache/webp/catalog/novinkivesna2024/1foto/tb-58-332x483.webp',
            sortOrder: 1,
          },
        ],
      },
      {
        id: '8faf6f35-1fa4-490f-bda3-017462282ab6',
        model: 'Model123',
        price: 1459,
        quantity: 100,
        maincategory: 'Electronics',
        categories: ['1bab9b17-54f6-4e56-8648-280dc66b459c'],
        status: true,
        sortOrder: 1,
        description: {
          name: 'Джинсы Slouchy Light Blue',
          description: 'Product Description',
          tag: 'Product Tag',
          meta_title: 'Product Meta Title',
          meta_h1: 'Product Meta H1',
          meta_description: 'Product Meta Description',
        },
        images: [
          {
            id: 'ff2a8661-3769-419f-8c80-913c840dbde6',
            image:
              'https://erist.store/image/cache/webp/catalog/03.05.24kostjumyletnie/2024-04-06_erist08878-332x483.webp',
            sortOrder: 2,
          },
          {
            id: '2d4a0f23-733d-4360-a15e-e4b5ca35bd24',
            image:
              'https://erist.store/image/cache/webp/catalog/novinkivesna2024/1foto/tb-58-332x483.webp',
            sortOrder: 1,
          },
        ],
      },
      {
        id: '8faf6f35-1fa4-490f-bda3-017462282ab6',
        model: 'Model123',
        price: 1459,
        quantity: 100,
        maincategory: 'Electronics',
        categories: ['1bab9b17-54f6-4e56-8648-280dc66b459c'],
        status: true,
        sortOrder: 1,
        description: {
          name: 'Джинсы Slouchy Light Blue',
          description: 'Product Description',
          tag: 'Product Tag',
          meta_title: 'Product Meta Title',
          meta_h1: 'Product Meta H1',
          meta_description: 'Product Meta Description',
        },
        images: [
          {
            id: 'ff2a8661-3769-419f-8c80-913c840dbde6',
            image:
              'https://erist.store/image/cache/webp/catalog/03.05.24kostjumyletnie/2024-04-06_erist08878-332x483.webp',
            sortOrder: 2,
          },
          {
            id: '2d4a0f23-733d-4360-a15e-e4b5ca35bd24',
            image:
              'https://erist.store/image/cache/webp/catalog/novinkivesna2024/1foto/tb-58-332x483.webp',
            sortOrder: 1,
          },
        ],
      },
    ],
  },
];
