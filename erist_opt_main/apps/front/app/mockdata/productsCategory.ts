const names = [
  'Футболка Summer vibe Coral',
  'Футболка Surf Grey',
  'Футболка The best summer moments Black',
  'Футболка Pocket Black',
  'Футболка SOOO FRESH',
  'Футболка Heart wants Pink',
  'Футболка AFTER THIRTY YEARS club',
  'Футболка Heart wants Green',
  'Футболка Heart wants Dark Grey',
  'Футболка Erist travels Black',
];
const imageses = [
  'https://erist.store/image/cache/webp/catalog/010iju/2024-06-14_erist_03307-332x483.webp',
  'https://erist.store/image/cache/webp/catalog/010iju/2024-06-14_erist_03697-332x483.webp',
  'https://erist.store/image/cache/webp/catalog/22.04.2024/24-04-10_76411-332x483.webp',
  'https://erist.store/image/cache/webp/catalog/03.05.24kostjumyletnie/24-04-10_76140-332x483.webp',
  'https://erist.store/image/cache/webp/catalog/010iju/2024-06-14_erist_03465-332x483.webp',
  'https://erist.store/image/cache/webp/catalog/010iju/2024-06-14_erist_03536-332x483.webp',
  'https://erist.store/image/cache/webp/catalog/23.05/futbolki/tb-35-332x483.webp',
  'https://erist.store/image/cache/webp/catalog/010iju/2024-06-14_erist_03470-332x483.webp',
  'https://erist.store/image/cache/webp/catalog/t-shirt-sparkling/24-03-28_74829-332x483.webp',
  'https://erist.store/image/cache/webp/catalog/semka06.05.24/2024-04-06_erist08565-332x483.webp',
  'https://erist.store/image/cache/webp/catalog/semka06.05.24/2024-04-06_erist08557-332x483.webp',
];

function generateRandomPrice(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const products = Array.from({ length: 6 }, (_, index) => {
  const randomNameIndex = Math.floor(Math.random() * names.length);
  const randomImageIndex = Math.floor(Math.random() * imageses.length);
  return {
    id: `${index + 1}`,
    model: 'Model123',
    price: generateRandomPrice(1000, 15000),
    quantity: 100,
    maincategory: 'Electronics',
    categories: ['1bab9b17-54f6-4e56-8648-280dc66b459c'],
    status: true,
    sortOrder: 1,
    description: {
      name: names[randomNameIndex],
      description: 'Product Description',
    },
    images: [
      {
        id: `${index + 1}-image-1`,
        image: imageses[randomImageIndex],
        sortOrder: 1,
      },
      {
        id: `${index + 1}-image-2`,
        image: imageses[(randomImageIndex + 1) % imageses.length],
        sortOrder: 2,
      },
      {
        id: `${index + 1}-image-3`,
        image: imageses[(randomImageIndex + 1) % imageses.length],
        sortOrder: 3,
      },
    ],
  };
});

export const productsData = {
  data: {
    products: products,
  },
};
