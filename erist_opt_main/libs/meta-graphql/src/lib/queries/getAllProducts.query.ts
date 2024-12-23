import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetProductsQueryVariables = Types.Exact<{
  categoryId?: Types.InputMaybe<Types.Scalars['String']>;
  mainCategoryId?: Types.InputMaybe<Types.Scalars['String']>;
  offset: Types.Scalars['Float'];
  limit: Types.Scalars['Float'];
  sortBy?: Types.InputMaybe<Types.Scalars['String']>;
  sortOrder?: Types.InputMaybe<Types.Scalars['String']>;
  filter?: Types.InputMaybe<Types.ProductsFilterInputDto>;
}>;


export type GetProductsQuery = { __typename?: 'Query', getProducts: { __typename?: 'TransformedProductsDTO', total: number, data?: Array<{ __typename?: 'TransformedProductDTO', id: string, price: number, status: boolean, description: { __typename?: 'ProductDescriptionDTO', name: string, description?: string | null }, images: Array<{ __typename?: 'ProductImageDTO', image?: string | null, blurDataURL?: string | null }>, options: Array<{ __typename?: 'ProductOptionDTO', id: string, name: string, type: string, values: Array<{ __typename?: 'ProductOptionValueDTO', option?: { __typename?: 'OptionDTO', name: string, type: string } | null, value?: { __typename?: 'OptionValueDTO', name: string } | null }> }> }> | null } };


export const GetProductsDocument = gql`
    query GetProducts($categoryId: String, $mainCategoryId: String, $offset: Float!, $limit: Float!, $sortBy: String, $sortOrder: String, $filter: ProductsFilterInputDTO) {
  getProducts(
    categoryId: $categoryId
    mainCategoryId: $mainCategoryId
    filter: $filter
    offset: $offset
    limit: $limit
    sortBy: $sortBy
    sortOrder: $sortOrder
  ) {
    data {
      id
      price
      status
      description {
        name
        description
      }
      images {
        image
        blurDataURL
      }
      options {
        id
        name
        type
        values {
          option {
            name
            type
          }
          value {
            name
          }
        }
      }
    }
    total
  }
}
    `;

/**
 * __useGetProductsQuery__
 *
 * To run a query within a React component, call `useGetProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsQuery({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *      mainCategoryId: // value for 'mainCategoryId'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      sortBy: // value for 'sortBy'
 *      sortOrder: // value for 'sortOrder'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetProductsQuery(baseOptions: Apollo.QueryHookOptions<GetProductsQuery, GetProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, options);
      }
export function useGetProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductsQuery, GetProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, options);
        }
export type GetProductsQueryHookResult = ReturnType<typeof useGetProductsQuery>;
export type GetProductsLazyQueryHookResult = ReturnType<typeof useGetProductsLazyQuery>;
export type GetProductsQueryResult = Apollo.QueryResult<GetProductsQuery, GetProductsQueryVariables>;