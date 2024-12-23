export * from './verifyTokenCustomer.query';
export * from './loginCustomer.mutation';
export * from './refreshTokenCustomer.mutation';
export * from './whoIAmCustomer.query';

/**Заказы */
export * from './DeleteOrder.mutation';
export * from './UpdateOrderStatus.mutation';
export * from './getOrderByIdAdmin.mutation';
export * from './getOrdersUsersAdmin.mutation';
/**Заказы */

/**Блоки на главной */
export * from './mainPageBlocks.query';
export * from './createMainPageBlock.mutation';
export * from './updateMainPageBlock.mutation';
export * from './removeMainPageBlock.mutation';
export * from './getMainPageBlock.query';
/**Блоки на главной */

/**
 Баннеры на главную
 */
export * from './GetAllBannersAdmin.mutation';
export * from './RemoveBanner.mutation';
export * from './GetBanner.query';
export * from './UpdateBanner.mutation';
export * from './CreateBanner.mutation';
export * from './uploadBannerImageToMinio.mutation';

/**Пользователи Сайта */
export * from './getAllUsers.mutation';
export * from './updateUserAdmin.mutation';
export * from './getUserById.query';
export * from './createUserAdmin.mutation';

/**Пользователи Админки */
export * from './getAllCustomers.query';
export * from './getCustomer.query';
export * from './CreateCustomer.mutation';
export * from './DeleteCustomer.mutation';
export * from './UpdateCustomer.mutation';

/*Все товары Админки */
export * from './getProductsAdmin.query';
export * from './getProductByIdAdmin.query';
export * from './updateProduct.mutation';
export * from './uploadProductImageToMinio.mutation';

// Синонимы поиска
export * from './GetAllSynonymGroups.query';
export * from './GetSynonymGroupById.query';
export * from './UpdateSynonymGroup.mutation';
export * from './CreateSynonymGroup.mutation';
export * from './DeleteSynonymGroup.mutation';

export * from './getDashbord.query';

// Социальные сети
export * from './GetAllSocialHrefs.query';
export * from './getSocialHref.query';
export * from './CreateSocialHref.mutation';
export * from './updateSocialHref.mutation';
export * from './DeleteSocialHref.mutation';

// Информационные страницы
export * from './GetAllInformations.query';
export * from './GetInformation.query';
export * from './UpdateInformation.mutation';
export * from './DeleteInformation.mutatuion';
export * from './CreateInformation.mutation';

// Категории
export * from './CreateCategoryWithDescription.mutation';
export * from './UpdateCategory.mutation';
export * from './GetCategoryTree.query';
export * from './GetCategoryById.query';
export * from './DeleteCategory.mutation';
export * from './getChildrenCategories.query';
export * from './GetParentCategories.query';
export * from './GetAllCategories.query';

// DADATA
export * from './getDadataData.mutation';

// ОПЦИИ
export * from './GetAllOptionsWithValues.query';
export * from './getOptionById.query';
export * from './CreateOption.mutation';
export * from './CreateOptionValues.mutation';
export * from './DeleteOption.mutation';
export * from './DeleteOptionValue.mutation';
export * from './updateOptionValues.mutation';

// LOGS
export * from './getAllLogs.query';

//Запросы
export * from './GetAllFeedbacks.query';
export * from './getFeedbackById.query';
export * from './UpdateFeedbackStatus.mutation';
