import {
  GetProductByIdAdminDocument,
  GetProductByIdAdminQuery,
  GetProductByIdAdminQueryVariables,
  GetProductsAdminDocument,
  GetProductsAdminQuery,
  GetProductsAdminQueryVariables,
  UpdateProductDocument,
  UpdateProductMutation,
  UpdateProductMutationVariables,
} from '@erist-opt/meta-graphql';
import client from '../apollo';

export const fetchProducts = async (params) => {
  try {
    const { sort, pagination, filter } = params;
    if (!sort || !pagination) {
      console.error('Сортировка и пагинация обязательные');
      throw new Error('Сортировка и пагинация обязательные');
    }

    const { field, order } = sort;
    const { page, perPage } = pagination;

    const variables: GetProductsAdminQueryVariables = {
      sortBy: field,
      sortOrder: order.toLowerCase(),
      pagination: {
        page,
        perPage,
      },
      filter: {
        ...filter,
        priceFrom: Number(filter.priceFrom) ? Number(filter.priceFrom) : 0,
        priceTo: Number(filter.priceTo) ? Number(filter.priceTo) : 100000000,
        name: filter.name ? filter.name : null,
        colors: filter.colors ? filter.colors : null,
        sizes: filter.sizes ? filter.sizes : null,
        mainCategoryId: filter.mainCategoryId ? filter.mainCategoryId : null,
        categoryId: filter.categoryId ? filter.categoryId : null,
        status: filter.status ?? null,
      },
    };

    const { data } = await client.query<GetProductsAdminQuery>({
      query: GetProductsAdminDocument,
      variables,
    });

    if (!data || !data.getProductsAdmin) {
      throw new Error('Ошибка получения товаров');
    }

    return {
      data: data.getProductsAdmin.data,
      total: data.getProductsAdmin.total,
    };
  } catch (error) {
    console.error('Ошибка получения товаров:', error);
    throw error;
  }
};

export const getOneProduct = async (params) => {
  try {
    const variables: GetProductByIdAdminQueryVariables = {
      id: params.id,
    };
    const { data } = await client.mutate<GetProductByIdAdminQuery>({
      mutation: GetProductByIdAdminDocument,
      variables,
    });

    if (!data) {
      throw new Error('Ошибка получения данных товара');
    }
    return {
      data: data.getProductByIdAdmin,
    };
  } catch (error) {
    console.error('Ошибка получения данных товара:', error);
    throw error;
  }
};
//  console.debug('=======params==========');
//  console.debug(params);
//  console.debug('========params=========');
//  console.debug('=====variables============');
//  console.debug(variables);
//  console.debug('=======variables==========');
export const updateProduct = async (params) => {
  try {
    console.debug('=================');
    console.debug(params);
    console.debug('=================');

    const getUniqueImages = (existingImages, newImages) => {
      const existingImageIds = new Set(existingImages.map((image) => image.id));
      const uniqueNewImages = newImages.filter(
        (image) => !existingImageIds.has(image.id)
      );
      return [...existingImages, ...uniqueNewImages];
    };

    // Создаем массив изображений, который включает только уникальные изображения
    const existingImages = params.data.images || [];
    const newImages = params.images || [];
    const images = getUniqueImages(existingImages, newImages);

    let count = 0;
    const filteredImages = images.map(
      (image) => (
        count++,
        {
          imageNameMinio: image.imageNameMinio,
          sortOrder: count,
        }
      )
    );

    const optionValues = await transformOptions(params.data.options || []);

    // console.debug('=======optionValues==========');
    // console.debug(optionValues);
    // console.debug('========optionValues=========');

    // console.log(params.data.description?.description);

    const productIds = params.data.productsRelated
      .map((product: any) => {
        if (typeof product === 'object' && product.id) {
          if (Array.isArray(product.id)) {
            return product.id;
          }
          return product.id;
        }
        return '';
      })
      .flat(); // Если есть вложенные массивы, их нужно объединить

    const otherColorProductsIds = params.data.otherColorsProducts
      .map((product: any) => {
        if (typeof product === 'object' && product.id) {
          if (Array.isArray(product.id)) {
            return product.id;
          }
          return product.id;
        }
        return '';
      })
      .flat(); // Если есть вложенные массивы, их нужно объединить

    const variables: UpdateProductMutationVariables = {
      updateProductInput: {
        id: params.id,
        maincategory: params.data.maincategory,
        categories: params.data.categories,
        status: params.data.status,
        sortOrder: params.data.sortOrder,
        hrefCloudPhotos: params.data.hrefCloudPhotos || null,
        description: {
          name: params.data.description?.name,
          description:
            params.data.description.description ||
            params.data.description?.name,
          tag: params.data.description?.tag,
          meta_title: params.data.description?.meta_title,
          meta_h1: params.data.description?.meta_h1,
          meta_description: params.data.description?.meta_description,
          compound: params.data.description?.compound,
          model_parameters: params.data.description?.model_parameters,
          care: params.data.description?.care,
          parameters: params.data.description?.parameters,
        },
        images: filteredImages,
        optionValues,
        relatedProductsIds: productIds,
        otherColorsProductsIds: otherColorProductsIds,
      },
    };

    // console.log('=====variables============');
    // console.log(variables);
    // console.log('=======variables==========');

    const { data } = await client.mutate<UpdateProductMutation>({
      mutation: UpdateProductDocument,
      variables,
    });

    return { data: data?.updateProduct };
  } catch (error) {
    console.log(params);
    console.error('Ошибка изменения продукта:', error);
    throw error;
  }
};

const transformOptions = (options) => {
  // Проверка, если это объект
  if (typeof options === 'object' && !Array.isArray(options)) {
    // Преобразование объекта в массив
    options = Object.entries(options).map(([optionId, values]) => ({
      id: optionId,
      values: Object.entries(values).map(([valueId, valueData]) => ({
        value: {
          id: valueId,
        },
        ...valueData,
      })),
    }));
  }

  if (!Array.isArray(options)) {
    console.debug('Expected an array for options, but got:', options);
    return [];
  }

  // Преобразование массива опций в формат, требуемый для обновления продукта
  return options.reduce((acc, option) => {
    if (!option.values || !Array.isArray(option.values)) {
      console.debug('опции собака', option.values);
      return acc;
    }

    const values = option.values.map((value) => ({
      optionId: option.id,
      valueId: value.value.id,
      price: value.price || 0,
      href: value.href || null,
      quantity: Number(value.quantity) || 0,
    }));

    return acc.concat(values);
  }, []);
};

// export const uploadProductImage = async (file: File) => {
//   try {
//     const variables: UploadProductImageToMinioMutationVariables = {
//       ProductUploadImageDTO: {
//         image: file,
//       },
//     };

//     const { data } = await client.mutate<UploadProductImageToMinioMutation>({
//       mutation: UploadProductImageToMinioDocument,
//       variables,
//     });

//     if (!data || !data.uploadProductImageToMinio) {
//       throw new Error('Ошибка загрузки изображения');
//     }

//     return {
//       imageName: data.uploadProductImageToMinio.imageName,
//     };
//   } catch (error) {
//     console.error('Ошибка загрузки изображения:', error);
//     throw error;
//   }
// };
