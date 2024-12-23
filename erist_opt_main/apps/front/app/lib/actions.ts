'use server';

import {
  SignUpUserDocument,
  WhoIAmDocument,
  GetCategoryByIdForUserDocument,
  GetProductsDocument,
  // DeleteAddressDocument,
  // AddAddressDocument,
  // UpdateAddressDocument,
  UpdateCompanyDocument,
  UpdateUserDocument,
  ChangePasswordDocument,
  GetProductsAndCategoriesDocument,
  GetOptionsForFilterDocument,
  GetCategoryTreeForUserDocument,
  GetAllSocialHrefsForUserDocument,
  GetAllInformationsTrueDocument,
  GetAllBannersDocument,
  GetMainPageBlocksOnlyTrueDocument,
  GetProductByIdDocument,
  AddToCartDocument,
  AddToCartMutation,
  AddToCartMutationVariables,
  GetCartDocument,
  GetCartQuery,
  SignUpUserMutationVariables,
  GetOrdersUsersDocument,
  RemoveFromCartDocument,
  RemoveFromCartMutationVariables,
  RemoveFromCartMutation,
  WhoIAmQuery,
  CreateOrderDocument,
  CreateOrderMutationVariables,
  CreateOrderMutation,
  GetOrderByIdDocument,
  UpdateCartItemQuantityMutationVariables,
  UpdateCartItemQuantityMutation,
  UpdateCartItemQuantityDocument,
  GetOrderByIdMutationVariables,
  GetOrderByIdMutation,
  GetRandProductsQuery,
  GetRandProductsDocument,
  ResetPasswordQueryVariables,
  ResetPasswordDocument,
  SendCodeResetPasswordDocument,
  SendCodeResetPasswordQueryVariables,
  UpdateResetPasswordMutationVariables,
  UpdateResetPasswordDocument,
  GetUserFeedbacksDocument,
  CreateFeedbackMutationVariables,
  CreateFeedbackMutation,
  CreateFeedbackDocument,
  GetOrdersUsersMutation,
  RandProductsByCategoryDocument,
  GetCategoriesForHomePageDocument,
} from '@erist-opt/meta-graphql';

import { signIn, signOut } from '../../auth';
import { getClient } from './apollo';
import { getAuthToken } from './auth';
import { flattenError, parseSort } from './utils';
import { revalidatePath } from 'next/cache';
import {
  ChangePassFormSchema,
  AddCartSchema,
  RemoveFromCartSchema,
  UpdateCartItemQuantitySchema,
} from './formSchemas';
import { redirect } from 'next/navigation';
import { OrdersUsersParams } from './types';

interface QueryOptions {
  currentPage: number;
  limit: number;
  sort?: string;
  filter?: {
    priceFrom?: string;
    priceTo?: string;
    name?: string;
  };
}

const client = getClient();

const getToken = async () => {
  try {
    const token = await getAuthToken();

    if (!token) {
      throw Error('not fount token');
    }

    return token;
  } catch (error) {
    console.error(error);
    await signOut({ redirectTo: 'login' });
  }
};

export async function signout() {
  await signOut();
}

export const revalidateCheckout = () => {
  revalidatePath('/checkout');
};

export async function authenticate(prevState: any, formData: FormData) {
  try {
    const result = await signIn('credentials', {
      redirect: false,
      email: formData.get('email'),
      password: formData.get('password'),
    });

    if (result?.error) {
      const errorMessage =
        result.error === 'CredentialsSignin'
          ? 'Неверный логин или пароль.'
          : 'Неопознанная ошибка.';
      return {
        success: false,
        message: errorMessage,
        errors: { global: errorMessage },
      };
    }

    return {
      success: true,
      message: 'Авторизация успешна',
      errors: null,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Произошла ошибка при авторизации.',
      errors: { global: 'Произошла ошибка при авторизации.' },
    };
  }
}

export async function register(prevState: any, formData: FormData) {
  try {
    const kpp = formData.get('kpp') || null;
    const ogrn = formData.get('ogrn') || null;

    const variables: SignUpUserMutationVariables = {
      signUpUserInput: {
        name: formData.get('name')?.toString() ?? '',
        email: formData.get('email')?.toString() ?? '',
        phone: formData.get('phone')?.toString() ?? '',
        password: formData.get('password')?.toString() ?? '',
        secondPassword: formData.get('password')?.toString() ?? '',
        company: {
          inn: formData.get('inn')?.toString() ?? '',
          kpp: kpp?.toString() ?? null,
          ogrn: ogrn?.toString() ?? null,
          name: formData.get('companyName')?.toString() ?? '',
          urAddress: formData.get('urAddress')?.toString() ?? '',
          bankName: formData.get('bankName')?.toString() ?? '',
          bikBank: formData.get('bikBank')?.toString() ?? '',
          checkingAccount: formData.get('checkingAccount')?.toString() ?? '',
          correspondentAccount:
            formData.get('correspondentAccount')?.toString() ?? '',
        },
        // addresses: [
        //   {
        //     city: formData.get('city')?.toString() ?? '',
        //     country: formData.get('country')?.toString() ?? '',
        //     street: formData.get('street')?.toString() ?? '',
        //     home: formData.get('home')?.toString() ?? '',
        //     apartmentORoffice:
        //       formData.get('apartmentORoffice')?.toString() ?? '',
        //   },
        // ],
      },
    };
    await client.mutate({
      mutation: SignUpUserDocument,
      variables,
    });
  } catch (error: any) {
    const errors = flattenError(error.graphQLErrors);
    const state = {
      success: false,
      message: error.message,
      errors,
    };
    return state;
  }

  redirect('/login');
}

export async function resetPasswordFirst(prevState: any, formData: any) {
  try {
    const variables: ResetPasswordQueryVariables = {
      resetPasswordInput: {
        email: formData.email,
      },
    };
    await client.query({
      query: ResetPasswordDocument,
      variables,
    });
  } catch (error: any) {
    const errors = flattenError(error.graphQLErrors);
    const state = {
      success: false,
      message: error.message,
      errors,
    };
    return state;
  }
}

export async function resetPasswordSecond(prevState: any, data: any) {
  try {
    const variables: SendCodeResetPasswordQueryVariables = {
      codeForResetPasswordInput: {
        email: data.email,
        code: Number(data.code),
      },
    };
    await client.query({
      query: SendCodeResetPasswordDocument,
      variables,
    });
  } catch (error: any) {
    const errors = flattenError(error.graphQLErrors);
    const state = {
      success: false,
      message: error.message,
      errors,
    };
    return state;
  }
}

export async function resetPasswordThree(prevState: any, formData: any) {
  try {
    const variables: UpdateResetPasswordMutationVariables = {
      newPassword: {
        email: formData.email,
        newPassword: formData.newPassword,
      },
    };

    await client.mutate({
      mutation: UpdateResetPasswordDocument,
      variables,
    });

    // return { success: true };
  } catch (error: any) {
    const state = {
      success: false,
      message: error.message,
      error,
    };
    return state;
  }
  redirect('/login');
}

export async function getUserData() {
  try {
    const token = await getToken();

    const { data } = await client.query<WhoIAmQuery>({
      query: WhoIAmDocument,
      context: {
        headers: {
          Authorization: token,
        },
      },
      fetchPolicy: 'no-cache',
    });

    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

export async function getCategoryId(id: string) {
  const token = await getToken();
  const result = await client.query({
    query: GetCategoryByIdForUserDocument,
    variables: { id },
    context: {
      headers: {
        Authorization: token,
      },
    },
    fetchPolicy: 'no-cache',
  });

  const categoryData = result.data.getCategoryByIdForUser;

  return {
    category: categoryData,
    children: categoryData.children,
    image: categoryData.image,
  };
}

export async function getOptionsForFilter() {
  const token = await getToken();
  const result = await client.query({
    query: GetOptionsForFilterDocument,
    context: {
      headers: {
        Authorization: token,
      },
    },
    fetchPolicy: 'no-cache',
  });
  const dataOptions = result.data.getOptionsForFilter;
  return dataOptions;
}

export async function getRandomProductsByCategory(
  mainCategory: string,
  productId: string
) {
  const token = await getToken();
  const result = await client.query({
    query: RandProductsByCategoryDocument,
    variables: {
      mainCategory: mainCategory,
      productId: productId,
    },
    context: {
      headers: {
        Authorization: token,
      },
    },
    fetchPolicy: 'no-cache',
  });

  const data = result.data.randProductsByCategory;
  if (!data) {
    return [];
  }

  return data;
}

export async function getProductsByCategory(
  categoryId: string,
  options: QueryOptions | any
) {
  const token = await getToken();
  const { sortBy, sortOrder } = parseSort(options?.sort);

  const offset = (options.currentPage - 1) * options.limit;
  const limit = options.limit * options.currentPage;

  const filters: any = {};

  if (options.priceFrom !== undefined) {
    filters.priceFrom = options.priceFrom;
  }
  if (options.priceTo !== undefined) {
    filters.priceTo = options.priceTo;
  }
  if (options.sizes && options.sizes.length > 0) {
    filters.sizes = options.sizes;
  }
  if (options.colors && options.colors.length > 0) {
    filters.colors = options.colors;
  }

  const result = await client.query({
    query: GetProductsDocument,
    variables: {
      categoryId: categoryId,
      mainCategoryId: null,
      offset,
      limit,
      sortBy,
      sortOrder,
      filter: {
        ...filters,
        name: null,
      },
    },
    context: {
      headers: {
        Authorization: token,
      },
    },
    fetchPolicy: 'no-cache',
  });

  return result.data.getProducts;
}

export async function getAllProductsForCategory(options: QueryOptions | any) {
  const token = await getToken();
  const { sortBy, sortOrder } = parseSort(options?.sort);

  const offset = (options.currentPage - 1) * options.limit;
  const limit = options.limit * options.currentPage;

  const filters: any = {};

  if (options.priceFrom !== undefined) {
    filters.priceFrom = options.priceFrom;
  }
  if (options.priceTo !== undefined) {
    filters.priceTo = options.priceTo;
  }
  if (options.sizes && options.sizes.length > 0) {
    filters.sizes = options.sizes;
  }
  if (options.colors && options.colors.length > 0) {
    filters.colors = options.colors;
  }

  const result = await client.query({
    query: GetProductsDocument,
    variables: {
      categoryId: null,
      mainCategoryId: null,
      offset,
      limit,
      sortBy,
      sortOrder,
      filter: {
        ...filters,
        name: null,
      },
    },
    context: {
      headers: {
        Authorization: token,
      },
    },
    fetchPolicy: 'no-cache',
  });

  return result.data.getProducts;
}

export async function getRandProducts() {
  try {
    const token = await getToken();
    const { data } = await client.query({
      query: GetRandProductsDocument,
      context: {
        headers: {
          Authorization: token,
        },
      },
      fetchPolicy: 'no-cache',
    });

    return data.getRandProducts;
  } catch (error) {
    console.error('Error fetching рандомных товаров:', error);
    throw error;
  }
}

// export const addAddress = async (
//   prevState: any | undefined,
//   formData: FormData
// ) => {
//   const token = await getToken();

//   try {
//     await client.mutate({
//       mutation: AddAddressDocument,
//       variables: {
//         createAddressInputDTO: {
//           city: formData.get('city'),
//           country: formData.get('country'),
//           street: formData.get('street'),
//           home: formData.get('home'),
//           apartmentORoffice: formData.get('apartmentORoffice'),
//         },
//       },
//       context: {
//         headers: {
//           Authorization: token,
//         },
//       },
//       fetchPolicy: 'no-cache',
//     });
//     revalidatePath('/lk');
//     return {
//       success: true,
//       message: 'Адрес добавлен',
//       resetKey: Date.now().toString(),
//     };
//   } catch (error: any) {
//     const errors = flattenError(error.graphQLErrors);
//     const state = {
//       success: false,
//       message: error.message,
//       errors,
//     };
//     return state;
//   }
// };

// export const deleteAddress = async (id: string) => {
//   const token = await getToken();

//   try {
//     await client.mutate({
//       mutation: DeleteAddressDocument,
//       variables: {
//         addressIdDto: {
//           id: id,
//         },
//       },
//       context: {
//         headers: {
//           Authorization: token,
//         },
//       },
//       fetchPolicy: 'no-cache',
//     });
//     revalidatePath('/lk');
//     return {
//       success: true,
//       message: 'Адрес удален',
//       resetKey: Date.now().toString(),
//     };
//   } catch (error: any) {
//     const errors = flattenError(error.graphQLErrors);
//     const state = {
//       success: false,
//       message: error.message,
//       errors,
//     };
//     return state;
//   }
// };

// export const updateAddress = async (
//   id: string,
//   prevState: any | undefined,
//   formData: FormData
// ) => {
//   const token = await getToken();
//   try {
//     await client.mutate({
//       mutation: UpdateAddressDocument,
//       variables: {
//         updateAddressDto: {
//           id,
//           city: formData.get('city'),
//           country: formData.get('country'),
//           street: formData.get('street'),
//           home: formData.get('home'),
//           apartmentORoffice: formData.get('apartmentORoffice'),
//         },
//       },
//       context: {
//         headers: {
//           Authorization: token,
//         },
//       },
//       fetchPolicy: 'no-cache',
//     });
//     revalidatePath('/lk');
//     return {
//       success: true,
//       message: 'Адрес обновлен',
//       resetKey: Date.now().toString(),
//     };
//   } catch (error: any) {
//     const errors = flattenError(error.graphQLErrors);
//     const state = {
//       success: false,
//       message: error.message,
//       errors,
//     };
//     return state;
//   }
// };

export const updateCompany = async (
  prevState: any | undefined,
  formData: FormData
) => {
  const token = await getToken();

  try {
    await client.mutate({
      mutation: UpdateCompanyDocument,
      variables: {
        updateCompanyDto: {
          name: formData.get('name'),
          urAddress: formData.get('urAddress'),
          inn: formData.get('inn'),
          ogrn: formData.get('ogrn'),
          kpp: formData.get('kpp') || null,
          correspondentAccount: formData.get('correspondentAccount'),
          checkingAccount: formData.get('checkingAccount'),
          bankName: formData.get('bankName'),
          bikBank: formData.get('bikBank'),
        },
      },
      context: {
        headers: {
          Authorization: token,
        },
      },
      fetchPolicy: 'no-cache',
    });
    revalidatePath('/lk');
    return {
      success: true,
      message: 'Информация о компании обновлена',
      resetKey: Date.now().toString(),
    };
  } catch (error: any) {
    console.error('Error updating компани:', error);
    const errors = flattenError(error.graphQLErrors);
    const state = {
      success: false,
      message: error.message,
      errors,
    };
    return state;
  }
};

export const updateUser = async (
  prevState: string | undefined,
  formData: FormData
) => {
  const token = await getToken();
  try {
    await client.mutate({
      mutation: UpdateUserDocument,
      variables: {
        updateUserDto: {
          name: formData.get('name'),
          phone: formData.get('phone'),
          status: true,
        },
      },
      context: {
        headers: {
          Authorization: token,
        },
      },
      fetchPolicy: 'no-cache',
    });
    revalidatePath('/lk');
    return {
      success: true,
      message: 'Пользователь обновлен',
      resetKey: Date.now().toString(),
    };
  } catch (error: any) {
    console.error('Error updating юзер:', error);
    const errors = flattenError(error.graphQLErrors);
    const state = {
      success: false,
      message: error.message,
      errors,
    };
    return state;
  }
};

export const changePassword = async (
  prevState: string | undefined,
  formData: FormData
) => {
  const validatedFields = ChangePassFormSchema.safeParse({
    currentPassword: formData.get('currentPassword'),
    newPassword: formData.get('newPassword'),
    confirmNewPassword: formData.get('confirmNewPassword'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields.',
    };
  }

  try {
    const token = await getToken();
    const { currentPassword, newPassword } = validatedFields.data;
    await client.mutate({
      mutation: ChangePasswordDocument,
      variables: {
        changePasswordDto: {
          currentPassword: currentPassword,
          newPassword: newPassword,
        },
      },
      context: {
        headers: {
          Authorization: token,
        },
      },
    });
    revalidatePath('/lk');
    return {
      success: true,
      message: 'Пароль изменен',
      resetKey: Date.now().toString(),
    };
  } catch (error: any) {
    const errors = flattenError(error.graphQLErrors);
    const state = {
      success: false,
      message: error.message,
      errors,
    };
    return state;
  }
};

export const searchRequest = async (searchString: string) => {
  const token = await getToken();
  try {
    const { data } = await client.mutate({
      mutation: GetProductsAndCategoriesDocument,
      variables: {
        searchInput: { searchString },
      },
      context: {
        headers: {
          Authorization: token,
        },
      },
      fetchPolicy: 'no-cache',
    });

    return data;
  } catch (error) {
    console.error('Error updating юзер:', error);
    throw error;
  }
};

export const getNavigation = async () => {
  const token = await getToken();
  try {
    const { data } = await client.query({
      query: GetCategoryTreeForUserDocument,
      context: {
        headers: {
          Authorization: token,
        },
      },
      fetchPolicy: 'no-cache',
    });

    const navs = data?.getCategoryTreeForUser;

    if (!navs) {
      throw Error('Не удалось загрузить');
    }

    return navs;
  } catch (error) {
    // TODO Обработать ошибку
  }
};

export const getCategoriesForHomePage = async () => {
  try {
    const { data } = await client.query({
      query: GetCategoriesForHomePageDocument,
      context: {
        headers: {},
      },
      fetchPolicy: 'no-cache',
    });

    const res = data?.getCategoriesForHomePage;
    if (!res) {
      return [];
    }

    return res;
  } catch (error) {
    return [];
  }
};

export const getSocialHrefsForUser = async () => {
  try {
    const token = await getToken();
    const { data } = await client.query({
      query: GetAllSocialHrefsForUserDocument,
      context: {
        headers: {
          Authorization: token,
        },
      },
    });

    const socialInfo = data?.getAllSocialHrefsForUser;

    if (!socialInfo) throw Error('Не удалось загрузить');

    return socialInfo;
  } catch (error) {
    // TODO Обработать ошибку
  }
};

export const getAllInformationsTrue = async () => {
  try {
    const token = await getToken();
    const { data } = await client.query({
      query: GetAllInformationsTrueDocument,
      context: {
        headers: {
          Authorization: token,
        },
      },
      fetchPolicy: 'no-cache',
    });
    if (!data?.getAllInformationsTrue) throw Error('Не удалось загрузить');

    return data.getAllInformationsTrue;
  } catch (error) {
    // TODO Обработать ошибку
  }
};

export const getHomeBanner = async () => {
  try {
    const token = await getToken();
    const { data } = await client.query({
      query: GetAllBannersDocument,
      context: {
        headers: {
          Authorization: token,
        },
      },
      fetchPolicy: 'no-cache',
    });
    const banner = data?.bannersTrue[0] ?? null;
    if (!banner) throw Error('Не удалось загрузить баннер');
    return banner;
  } catch (error) {
    console.log(error);
  }
};

export const getMainPageBlocks = async () => {
  try {
    const token = await getToken();
    const { data } = await client.query({
      query: GetMainPageBlocksOnlyTrueDocument,
      context: {
        headers: {
          Authorization: token,
        },
      },
      fetchPolicy: 'no-cache',
    });
    if (!data?.getMainPageBlocksOnlyTrue)
      throw Error('Не удалось загрузить блоки');
    return data.getMainPageBlocksOnlyTrue;
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (id: string) => {
  try {
    const token = await getToken();
    const { data } = await client.query({
      query: GetProductByIdDocument,
      variables: {
        id,
      },
      context: {
        headers: {
          Authorization: token,
        },
      },
      fetchPolicy: 'no-cache',
    });

    if (!data?.getProductById) throw Error('Не удалось загрузить товар');

    return data?.getProductById;
  } catch (error) {
    console.log(error);
  }
};

export const getOrdersUsers = async ({
  sort,
  pagination,
  filter,
}: OrdersUsersParams) => {
  const offset = (pagination.page - 1) * pagination.limit;
  const limit = pagination.limit * pagination.page;

  try {
    const token = await getToken();
    const { data } = await client.mutate<GetOrdersUsersMutation>({
      mutation: GetOrdersUsersDocument,
      variables: {
        sortBy: sort.key,
        sortOrder: sort.orderBy,
        offset,
        limit,
        filter,
      },
      context: {
        headers: {
          Authorization: token,
        },
      },
      fetchPolicy: 'no-cache',
    });

    if (!data?.getOrdersUsers) {
      throw new Error('Не удалось загрузить заказы');
    }

    return data.getOrdersUsers;
  } catch (error) {
    console.error('Ошибка запроса getOrdersUsers:', error);
    return {
      success: false,
      message: 'Упс... что-то пошло не так',
    };
  }
};

export const AddToBasket = async (
  id: string,
  prevState: any | undefined,
  formData: FormData
) => {
  try {
    const token = await getToken();
    const quantity = formData.get('quantity') || 0; //TODO front
    const validatedFields = AddCartSchema.safeParse({
      productId: id,
      quantity: parseInt(quantity.toString()),
      optionValueId: formData.get('optionValueId')?.toString(),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Упс... Что-то пошло не так',
      };
    }

    const variables: AddToCartMutationVariables = {
      input: {
        productId: validatedFields.data.productId,
        quantity: validatedFields.data.quantity,
        optionValueId: validatedFields.data.optionValueId,
      },
    };

    const { data } = await client.mutate<AddToCartMutation>({
      mutation: AddToCartDocument,
      variables,
      context: {
        headers: {
          Authorization: token,
        },
      },
    });
    if (!data?.addToCart) throw Error('Не удалось добавить товар');

    return {
      success: data.addToCart.status,
      message: 'Товар в корзине',
      cart: {
        quantity: data.addToCart.quantity,
      },
      resetKey: Date.now().toString(),
    };
  } catch (error) {
    return {
      success: false,
      message: 'Упс... что то пошло не так',
    };
  }
};

export const getCart = async () => {
  try {
    const token = await getToken();
    const { data } = await client.query<GetCartQuery>({
      query: GetCartDocument,
      context: {
        headers: {
          Authorization: token,
        },
      },
      fetchPolicy: 'no-cache',
    });

    return data.getCart;
  } catch (error) {
    // TODO
  }
};

export const removeFromCart = async (itemId: string) => {
  try {
    const token = await getToken();
    const validatedFields = RemoveFromCartSchema.safeParse({
      itemId: itemId,
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields.',
      };
    }

    const variables: RemoveFromCartMutationVariables = {
      input: {
        itemId: validatedFields.data.itemId,
      },
    };

    const { data } = await client.mutate<RemoveFromCartMutation>({
      mutation: RemoveFromCartDocument,
      variables,
      context: {
        headers: {
          Authorization: token,
        },
      },
    });
    if (!data?.removeFromCart) throw Error('Не удалось удалить товар');

    return {
      success: true,
      message: 'Товар удален',
      cart: {
        quantity: data.removeFromCart.quantity,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: 'Упс... что то пошло не так',
    };
  }
};

export const updateCartItemQuantity = async (
  itemId: string,
  quantity: number
) => {
  try {
    const token = await getToken();
    const validatedFields = UpdateCartItemQuantitySchema.safeParse({
      itemId: itemId,
      quantity: quantity,
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields.',
      };
    }

    const variables: UpdateCartItemQuantityMutationVariables = {
      input: {
        itemId: validatedFields.data.itemId,
        quantity: validatedFields.data.quantity,
      },
    };

    const { data } = await client.mutate<UpdateCartItemQuantityMutation>({
      mutation: UpdateCartItemQuantityDocument,
      variables,
      context: {
        headers: {
          Authorization: token,
        },
      },
    });

    if (!data?.updateCartItemQuantity) throw Error('Не удалось удалить товар');

    return {
      success: true,
      message: 'Изменение количества успех',
      cart: {
        quantity: data.updateCartItemQuantity.quantity,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: 'Упс... что то пошло не так',
    };
  }
};

export const deleteProductFromCart = async (id: string) => {
  try {
    const token = await getToken();
    const variables: RemoveFromCartMutationVariables = {
      input: {
        itemId: id,
      },
    };

    const { data } = await client.mutate<RemoveFromCartMutation>({
      mutation: RemoveFromCartDocument,
      variables,
      context: {
        headers: {
          Authorization: token,
        },
      },
    });
    revalidatePath('/checkout');
    return {
      success: true,
      message: 'Товар удален',
      resetKey: Date.now().toString(),
    };
  } catch (error) {
    return {
      success: false,
      message: 'Упс... что то пошло не так',
    };
  }
};

export const createOrder = async (prevState: any, formData: FormData) => {
  let orderId: string;
  try {
    const token = await getToken();

    // const variables: CreateOrderMutationVariables = {
    // createOrderData: {
    //   shippingAddressId: formData.get('shippingAddressId')?.toString() ?? '',
    // },
    // };

    const { data } = await client.mutate<CreateOrderMutation>({
      mutation: CreateOrderDocument,
      // variables,
      context: {
        headers: {
          Authorization: token,
        },
      },
    });
    if (!data?.createOrder?.id) throw Error('Заказ не создался');

    orderId = data.createOrder.id;
  } catch (error: any) {
    const errors = flattenError(error.graphQLErrors);
    const state = {
      success: false,
      message: error.message,
      errors,
    };
    return state;
  }

  orderId && redirect(`/thank-you/${orderId}`);
};

export const getOrderById = async (id: string) => {
  try {
    const token = await getToken();

    const variables: GetOrderByIdMutationVariables = {
      orderId: id,
    };

    const { data } = await client.query<GetOrderByIdMutation>({
      query: GetOrderByIdDocument,
      variables,
      context: {
        headers: {
          Authorization: token,
        },
      },
      fetchPolicy: 'no-cache',
    });

    if (!data?.getOrderById) throw Error('Не удалось загрузить заказ');

    return data.getOrderById;
  } catch (error) {
    console.log(error);
  }
};

export const getUserFeedbacks = async () => {
  try {
    const token = await getToken();
    const { data } = await client.query({
      query: GetUserFeedbacksDocument,
      context: {
        headers: {
          Authorization: token,
        },
      },
      fetchPolicy: 'no-cache',
    });
    if (!data?.getUserFeedbacks) throw Error('Не удалось загрузить запросы');
    return data.getUserFeedbacks;
  } catch (error) {
    return [];
    console.log(error);
  }
};

export const createFeedback = async (prevState: any, formData: FormData) => {
  try {
    const token = await getToken();

    const variables: CreateFeedbackMutationVariables = {
      input: {
        text: formData.get('text')?.toString() ?? '',
      },
    };

    const { data } = await client.mutate<CreateFeedbackMutation>({
      mutation: CreateFeedbackDocument,
      variables,
      context: {
        headers: {
          Authorization: token,
        },
      },
    });

    if (!data?.createFeedback)
      throw Error('Запрос не был отправлен. Попробуйте позже');
    return true;
  } catch (error: any) {
    console.warn(error);

    const errors = flattenError(error.graphQLErrors);
    const state = {
      success: false,
      message: error.message,
      errors,
    };
    return state;
  }
};
