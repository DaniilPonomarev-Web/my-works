/**
 * ADMIN
 */
export * from './admin';

/**
 * AUTH
 */
export * from './login.mutation';
export * from './signUpUser.mutation';
export * from './whoIAm.query';
export * from './verifyTokenUser.query';
export * from './refreshToken.query';

/**
 * ResetPassword
 */
export * from './sendCodeResetPassword.query';
export * from './updateResetPassword.mutation';
export * from './resetPassword.query';

/**
 * Баннер на главной
 */
export * from './getAllBanners.query';

/**
 * Категории
 */
export * from './getCategoryTreeForUser.query';
export * from './getCategoryByIdForUser.query';
export * from './getOptionsForFilter.query';
export * from './getCategoriesForHomePage.query';

export * from './getAllProducts.query';
export * from './getProductByIdForUser.query';
export * from './getRandProducts.query';
export * from './getNewProducts.query';
export * from './randProductsByCategory.query';

/**
 * Блоки на главной
 */
export * from './getMainPageBlocksOnlyTrue.query';

/**
 * Соц сети
 */
export * from './getAllSocialHrefsForUser.query';

/**
 * Информационные страницы
 */
export * from './getInformationTrue.query';
export * from './getAllInformationsTrue.query';

/**
 * Для личного кабинета
 */

// //адреса
// export * from './updateAddress.mutation';
// export * from './deleteAddress.mutation';
// export * from './addAddress.mutation';

//пользователь
export * from './updateUser.mutation';
export * from './changePassword.mutation';
export * from './updateCompany.mutation';

// ПОИСК
export * from './GetProductsAndCategories.query';

// Корзина
export * from './AddToCart.mutation';
export * from './getCart.query';
export * from './removeFromCart.mutation';
export * from './UpdateCartItemQuantity.mutation';

//Заказы
export * from './getOrdersUsers.mutation';
export * from './GetOrderById.mutation';
export * from './createOrder.mutation';

//feedbacks
export * from './createFeedback.mutation';
export * from './getUserFeedbacks.query';
