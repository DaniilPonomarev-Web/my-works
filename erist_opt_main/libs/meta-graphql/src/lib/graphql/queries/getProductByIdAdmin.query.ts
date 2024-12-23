import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetProductByIdAdminQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type GetProductByIdAdminQuery = { __typename?: 'Query', getProductByIdAdmin: { __typename?: 'TransformedProductDTO', id: string, model: string, price: number, quantity: number, maincategory: string, categories: Array<string>, status: boolean, sortOrder: number, dateAdded?: any | null, hrefCloudPhotos?: string | null, description: { __typename?: 'ProductDescriptionDTO', id: string, name: string, description?: string | null, tag?: string | null, meta_title?: string | null, meta_h1?: string | null, meta_description?: string | null, compound?: string | null, model_parameters?: string | null, care?: string | null, parameters?: string | null }, images: Array<{ __typename?: 'ProductImageDTO', id: string, imageNameMinio: string, image?: string | null, sortOrder: number }>, options: Array<{ __typename?: 'ProductOptionDTO', id: string, name: string, type: string, values: Array<{ __typename?: 'ProductOptionValueDTO', id: string, href?: string | null, price: number, quantity: number, value?: { __typename?: 'OptionValueDTO', id: string, name: string, colorCode?: string | null } | null }> }>, productsRelated?: Array<{ __typename?: 'TransformedProductDTO', id: string, description: { __typename?: 'ProductDescriptionDTO', name: string }, images: Array<{ __typename?: 'ProductImageDTO', image?: string | null, blurDataURL?: string | null }> }> | null, otherColorsProducts?: Array<{ __typename?: 'TransformedProductDTO', id: string, images: Array<{ __typename?: 'ProductImageDTO', image?: string | null, blurDataURL?: string | null }>, description: { __typename?: 'ProductDescriptionDTO', name: string } }> | null } };


export const GetProductByIdAdminDocument = gql`
    query getProductByIdAdmin($id: String!) {
  getProductByIdAdmin(id: $id) {
    id
    model
    price
    quantity
    maincategory
    categories
    status
    sortOrder
    dateAdded
    hrefCloudPhotos
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
        value {
          id
          name
          colorCode
        }
      }
    }
    productsRelated {
      id
      description {
        name
      }
      images {
        image
        blurDataURL
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

/**
 * __useGetProductByIdAdminQuery__
 *
 * To run a query within a React component, call `useGetProductByIdAdminQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductByIdAdminQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductByIdAdminQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProductByIdAdminQuery(baseOptions: Apollo.QueryHookOptions<GetProductByIdAdminQuery, GetProductByIdAdminQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductByIdAdminQuery, GetProductByIdAdminQueryVariables>(GetProductByIdAdminDocument, options);
      }
export function useGetProductByIdAdminLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductByIdAdminQuery, GetProductByIdAdminQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductByIdAdminQuery, GetProductByIdAdminQueryVariables>(GetProductByIdAdminDocument, options);
        }
export type GetProductByIdAdminQueryHookResult = ReturnType<typeof useGetProductByIdAdminQuery>;
export type GetProductByIdAdminLazyQueryHookResult = ReturnType<typeof useGetProductByIdAdminLazyQuery>;
export type GetProductByIdAdminQueryResult = Apollo.QueryResult<GetProductByIdAdminQuery, GetProductByIdAdminQueryVariables>;