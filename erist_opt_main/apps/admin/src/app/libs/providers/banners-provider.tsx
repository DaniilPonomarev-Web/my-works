import {
  CreateBannerDocument,
  CreateBannerMutation,
  CreateBannerMutationVariables,
  GetAllBannersAdminDocument,
  GetAllBannersAdminQuery,
  GetAllBannersAdminQueryVariables,
  GetBannerDocument,
  GetBannerQuery,
  GetBannerQueryVariables,
  RemoveBannerDocument,
  RemoveBannerMutation,
  RemoveBannerMutationVariables,
  UpdateBannerDocument,
  UpdateBannerMutation,
  UpdateBannerMutationVariables,
} from '@erist-opt/meta-graphql';
import client from '../apollo';

export const fetchBanners = async (params) => {
  try {
    const { sort, pagination } = params;
    const { field, order } = sort;
    const { page, perPage } = pagination;

    const variables: GetAllBannersAdminQueryVariables = {
      sortBy: field,
      sortOrder: order.toLowerCase(),
      pagination: {
        page,
        perPage,
      },
    };

    const { data } = await client.query<GetAllBannersAdminQuery>({
      query: GetAllBannersAdminDocument,
      variables,
    });

    if (!data || !data.getAllBannersAdmin) {
      throw new Error('Ошибка получения данных баннеров для главной странице');
    }

    return {
      data: data.getAllBannersAdmin.banners,
      total: data.getAllBannersAdmin.total,
    };
  } catch (error) {
    console.error('Ошибка получения баннера для главной странице:', error);
    throw error;
  }
};

export const getOneBanner = async (params) => {
  try {
    const variables: GetBannerQueryVariables = {
      id: params.id,
    };
    const { data } = await client.mutate<GetBannerQuery>({
      mutation: GetBannerDocument,
      variables,
    });

    if (!data) {
      throw new Error('Ошибка получения данных баннера');
    }
    return {
      data: data.banner,
    };
  } catch (error) {
    console.error('Ошибка получения баннера:', error);
    throw error;
  }
};

export const updateBanner = async (params) => {
  try {
    const variables: UpdateBannerMutationVariables = {
      updateBannerInput: {
        id: params.id,
        name: params.data.name,
        title: params.data.title ?? null,
        link: params.data.link ?? null,
        status: params.data.status,
        image: params.image,
        image_mob: params.image_mob,
      },
    };

    const { data } = await client.mutate<UpdateBannerMutation>({
      mutation: UpdateBannerDocument,
      variables,
    });
    return { data: data?.updateBanner };
  } catch (error) {
    console.error('Ошибка изменения баннера:', error);
    throw error;
  }
};

export const createBanner = async (params) => {
  console.log(params);

  try {
    const variables: CreateBannerMutationVariables = {
      createBannerInput: {
        name: params.data.name,
        title: params.data.title ?? null,
        link: params.data.link ?? null,
        status: params.data.status,
        image: params.image,
        image_mob: params.image_mob,
      },
    };

    const { data } = await client.mutate<CreateBannerMutation>({
      mutation: CreateBannerDocument,
      variables,
    });

    return { data: data?.createBanner };
  } catch (error) {
    console.error('Ошибка создания баннера:', error);
    throw error;
  }
};

export const deleteBanner = async (params) => {
  try {
    const variables: RemoveBannerMutationVariables = {
      id: params.id,
    };
    const data = await client.mutate<RemoveBannerMutation>({
      mutation: RemoveBannerDocument,
      variables,
    });
    return { data: { id: params.id } };
  } catch (error) {
    console.error('Delete Error:', error);
    throw error;
  }
};
