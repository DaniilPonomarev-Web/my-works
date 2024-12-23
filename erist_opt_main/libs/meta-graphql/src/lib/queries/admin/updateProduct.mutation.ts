import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateProductMutationVariables = Types.Exact<{
  updateProductInput: Types.InputUpdateProductDto;
}>;

export type UpdateProductMutation = {
  __typename?: 'Mutation';
  updateProduct: {
    __typename?: 'TransformedProductDTO';
    id: string;
    model: string;
    price: number;
    quantity: number;
    maincategory: string;
    categories: Array<string>;
    status: boolean;
    sortOrder: number;
    hrefCloudPhotos?: string | null;
    dateAdded?: any | null;
    description: {
      __typename?: 'ProductDescriptionDTO';
      id: string;
      name: string;
      description?: string | null;
      tag?: string | null;
      meta_title?: string | null;
      meta_h1?: string | null;
      meta_description?: string | null;
      compound?: string | null;
      model_parameters?: string | null;
      care?: string | null;
      parameters?: string | null;
    };
    images: Array<{
      __typename?: 'ProductImageDTO';
      id: string;
      imageNameMinio: string;
      image?: string | null;
      sortOrder: number;
    }>;
    options: Array<{
      __typename?: 'ProductOptionDTO';
      id: string;
      name: string;
      type: string;
      values: Array<{
        __typename?: 'ProductOptionValueDTO';
        id: string;
        href?: string | null;
        price: number;
        quantity: number;
        option?: {
          __typename?: 'OptionDTO';
          id: string;
          name: string;
          type: string;
        } | null;
        value?: {
          __typename?: 'OptionValueDTO';
          id: string;
          name: string;
        } | null;
      }>;
    }>;
    productsRelated?: Array<{
      __typename?: 'TransformedProductDTO';
      id: string;
      description: { __typename?: 'ProductDescriptionDTO'; name: string };
      images: Array<{
        __typename?: 'ProductImageDTO';
        id: string;
        imageNameMinio: string;
        image?: string | null;
        sortOrder: number;
      }>;
    }> | null;
    otherColorsProducts?: Array<{
      __typename?: 'TransformedProductDTO';
      id: string;
      images: Array<{
        __typename?: 'ProductImageDTO';
        image?: string | null;
        blurDataURL?: string | null;
      }>;
      description: { __typename?: 'ProductDescriptionDTO'; name: string };
    }> | null;
  };
};

export const UpdateProductDocument = gql`
  mutation UpdateProduct($updateProductInput: InputUpdateProductDTO!) {
    updateProduct(updateProductInput: $updateProductInput) {
      id
      model
      price
      quantity
      maincategory
      categories
      status
      sortOrder
      hrefCloudPhotos
      dateAdded
      description {
        id
        name
        description
        tag
        meta_title
        meta_h1
        meta_description
        compound
        model_parameters
        care
        parameters
      }
      images {
        id
        imageNameMinio
        image
        sortOrder
      }
      options {
        id
        name
        type
        values {
          id
          href
          price
          quantity
          option {
            id
            name
            type
          }
          value {
            id
            name
          }
        }
      }
      productsRelated {
        id
        description {
          name
        }
        images {
          id
          imageNameMinio
          image
          sortOrder
        }
      }
      otherColorsProducts {
        id
        images {
          image
          blurDataURL
        }
        description {
          name
        }
      }
    }
  }
`;
export type UpdateProductMutationFn = Apollo.MutationFunction<
  UpdateProductMutation,
  UpdateProductMutationVariables
>;

/**
 * __useUpdateProductMutation__
 *
 * To run a mutation, you first call `useUpdateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductMutation, { data, loading, error }] = useUpdateProductMutation({
 *   variables: {
 *      updateProductInput: // value for 'updateProductInput'
 *   },
 * });
 */
export function useUpdateProductMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateProductMutation,
    UpdateProductMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateProductMutation,
    UpdateProductMutationVariables
  >(UpdateProductDocument, options);
}
export type UpdateProductMutationHookResult = ReturnType<
  typeof useUpdateProductMutation
>;
export type UpdateProductMutationResult =
  Apollo.MutationResult<UpdateProductMutation>;
export type UpdateProductMutationOptions = Apollo.BaseMutationOptions<
  UpdateProductMutation,
  UpdateProductMutationVariables
>;
