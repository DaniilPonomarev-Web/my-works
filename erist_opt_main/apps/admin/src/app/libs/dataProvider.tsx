import { withLifecycleCallbacks } from 'react-admin';

import {
  deleteOrder,
  fetchOrders,
  getOneOrder,
  updateOrderStatus,
} from './providers/order-provider';
import {
  createMainPageBlock,
  deleteMainPageBlock,
  fetchMainPageBlocks,
  getOneMainPageBlock,
  updateMainPageBlock,
} from './providers/mainpageblocks-provider';
import {
  createBanner,
  deleteBanner,
  fetchBanners,
  getOneBanner,
  updateBanner,
} from './providers/banners-provider';
import {
  createUser,
  fetchUsers,
  getDadataDataUser,
  getOneUser,
  updateUser,
} from './providers/users-provider';
import {
  createCustomer,
  deleteCustomer,
  fetchCustomers,
  getOneCustomer,
  updateСustomer,
} from './providers/customers-provider';
import {
  fetchProducts,
  getOneProduct,
  updateProduct,
  // uploadProductImage,
} from './providers/products-provider';
import {
  createGropuSynonyms,
  deleteGropuSynonyms,
  fetcGroupsSynonyms,
  getOneGroupSynonyms,
  updateGropuSynonyms,
} from './providers/synonyms-provider';
import { getDashBoardData } from './providers/dashboard-provider';
import {
  createInformation,
  deleteInformation,
  fetcInformations,
  getOneInformation,
  updateInformation,
} from './providers/information-provider';
import {
  createSocialHref,
  deleteSocialHref,
  fetchSocialHrefs,
  getSocialHref,
  updateSocialHref,
} from './providers/social-hrefs-provider';
import {
  createCategoryWithDescription,
  deleteCategory,
  getCategoryById,
  getCategoryTree,
  updateCategory,
  getChildrenCategories,
  getParentCategories,
  getAllCategories,
} from './providers/category-provider';
import { uploadImage } from './upload';
import { uploadBannerImage } from './uploadBanner';
import {
  createOption,
  deleteOption,
  fetchAllOptions,
  getOneOption,
  updateOptionValues,
} from './providers/option-provider';
import { fetchAllLogs } from './providers/logs-provider';
import {
  fetcAllFeedbacks,
  getOneFeedback,
  updateFeedBack,
} from './providers/feedbacks-provider';

const baseDataProvider = {
  getAll: async (resource: any, params: any) => {
    switch (resource) {
      case 'category':
        return getAllCategories(params);
    }
  },
  getList: async (resource: any, params: any) => {
    switch (resource) {
      case 'orders':
        return fetchOrders(params);
      case 'mainPageBlocks':
        return fetchMainPageBlocks(params);
      case 'banners':
        return fetchBanners(params);
      case 'users':
        return fetchUsers(params);
      case 'customers':
        return fetchCustomers(params);
      case 'products':
        return fetchProducts(params);
      case 'synonyms':
        return fetcGroupsSynonyms(params);
      case 'information':
        return fetcInformations(params);
      case 'socialHrefs':
        return fetchSocialHrefs(params);
      case 'category':
        return getCategoryTree(params);
      case 'option':
        return fetchAllOptions(params);
      case 'logs':
        return fetchAllLogs(params);
      case 'feedback':
        return fetcAllFeedbacks(params);

      default:
        throw new Error(`Неизвестный ресурс: ${resource}`);
    }
  },
  getTree: async (resource: any, params: any) => {
    switch (resource) {
      case 'category':
        return getCategoryTree(params);
    }
  },
  getOne: async (resource: any, params: any) => {
    switch (resource) {
      case 'orders':
        return getOneOrder(params);
      case 'mainPageBlocks':
        return getOneMainPageBlock(params);
      case 'banners':
        return getOneBanner(params);
      case 'users':
        return getOneUser(params);
      case 'customers':
        return getOneCustomer(params);
      case 'products':
        return getOneProduct(params);
      case 'synonyms':
        return getOneGroupSynonyms(params);
      case 'information':
        return getOneInformation(params);
      case 'socialHrefs':
        return getSocialHref(params);
      case 'category':
        return getCategoryById(params);
      case 'option':
        return getOneOption(params);
      case 'feedback':
        return getOneFeedback(params);
      default:
        throw new Error(`Неизвестный ресурс: ${resource}`);
    }
  },
  create: async (resource: any, params: any) => {
    switch (resource) {
      case 'banners':
        return createBanner(params);
      case 'users':
        return createUser(params);
      case 'customers':
        return createCustomer(params);
      case 'synonyms':
        return createGropuSynonyms(params);
      case 'information':
        return createInformation(params);
      case 'socialHrefs':
        return createSocialHref(params);
      case 'mainPageBlocks':
        return createMainPageBlock(params);
      case 'category':
        return createCategoryWithDescription(params);
      case 'option':
        return createOption(params);
      default:
        throw new Error(`Неизвестный ресурс: ${resource}`);
    }
  },
  delete: async (resource: any, params: any) => {
    switch (resource) {
      case 'orders':
        return deleteOrder(params);
      case 'mainPageBlocks':
        return deleteMainPageBlock(params);
      case 'banners':
        return deleteBanner(params);
      case 'customers':
        return deleteCustomer(params);
      case 'synonyms':
        return deleteGropuSynonyms(params);
      case 'information':
        return deleteInformation(params);
      case 'socialHrefs':
        return deleteSocialHref(params);
      case 'category':
        return deleteCategory(params);
      case 'option':
        return deleteOption(params);
      default:
        throw new Error(`Неизвестный ресурс: ${resource}`);
    }
  },
  update: async (resource: any, params: any) => {
    switch (resource) {
      case 'orders':
        return updateOrderStatus(params);
      case 'mainPageBlocks':
        return updateMainPageBlock(params);
      case 'banners':
        return updateBanner(params);
      case 'users':
        return updateUser(params);
      case 'customers':
        return updateСustomer(params);
      case 'synonyms':
        return updateGropuSynonyms(params);
      case 'information':
        return updateInformation(params);
      case 'socialHrefs':
        return updateSocialHref(params);
      case 'category':
        return updateCategory(params);
      case 'products':
        return updateProduct(params);
      case 'option':
        return updateOptionValues(params);
      case 'feedback':
        return updateFeedBack(params);
      default:
        throw new Error(`Неизвестный ресурс: ${resource}`);
    }
  },

  updateStatus: async (resource: any, params: any) => {
    switch (resource) {
      case 'orders':
        return updateOrderStatus(params);
      // case 'category':
      //   return updateCategoryStatus(params);
      default:
        throw new Error(`Неизвестный ресурс: ${resource}`);
    }
  },
  uploadImageProduct: async (params: any) => {
    return await uploadProductImage(params);
  },
  getDashboard: async () => {
    return await getDashBoardData();
  },
  getParentsCategories: async () => {
    return await getParentCategories();
  },
  getChildrenCategories: async () => {
    return await getChildrenCategories();
  },

  getDadataDataUser: async (params: any, inn: string) => {
    return await getDadataDataUser(params, inn);
  },
};

const dataProvider = withLifecycleCallbacks(baseDataProvider, [
  {
    resource: 'products',
    beforeUpdate: async (params, dataProvider) => {
      const images = [];
      if (
        params.data.attachments &&
        Array.isArray(params.data.attachments) &&
        params.data.attachments.length > 0
      ) {
        let count = 0;
        for (const attachment of params.data.attachments) {
          const result = await uploadImage(attachment.rawFile);

          const uploaded = {
            imageNameMinio: result.data?.uploadProductImageToMinio.imageName,
            sortOrder: count++,
          };

          images.push(uploaded);
        }
      }

      // если нет новых изображений, существующие

      const existingImages = params.data.images || [];
      return {
        ...params,
        images: images.length > 0 ? images : existingImages,
      };
    },
  },
  {
    resource: 'banners',
    beforeUpdate: async (params, dataProvider) => {
      const images = {};

      if (params.data.attachment_desc) {
        const result_desc = await uploadBannerImage(
          params.data.attachment_desc.rawFile
        );
        const uploaded_desc =
          result_desc.data?.uploadBannerImageToMinio.imageName;
        images.image = uploaded_desc;
      }
      if (params.data.attachment_mob) {
        const result_mob = await uploadBannerImage(
          params.data.attachment_mob.rawFile
        );
        const uploaded_mob =
          result_mob.data?.uploadBannerImageToMinio.imageName;
        images.image_mob = uploaded_mob;
      }
      const existingImageDesc = params.data.image || null;
      const existingImageMob = params.data.image_mob || null;

      return {
        ...params,
        image: images.image || existingImageDesc,
        image_mob: images.image_mob || existingImageMob, //новое изображение или существующее
      };
    },
  },
  {
    resource: 'banners',
    beforeCreate: async (params, dataProvider) => {
      const images = {};

      if (params.data.attachment_desc && params.data.attachment_mob) {
        // console.log('rawfile', params.data.attachment_desc.rawFile);

        // Загрузка изображений
        const result_desc = await uploadBannerImage(
          params.data.attachment_desc.rawFile
        );
        const uploaded_desc =
          result_desc.data?.uploadBannerImageToMinio.imageName;
        images.image = uploaded_desc;

        const result_mob = await uploadBannerImage(
          params.data.attachment_mob.rawFile
        );
        const uploaded_mob =
          result_mob.data?.uploadBannerImageToMinio.imageName;
        images.image_mob = uploaded_mob;
      }

      return {
        ...params,
        image: images.image,
        image_mob: images.image_mob,
      };
    },
  },
]);

export default dataProvider;
