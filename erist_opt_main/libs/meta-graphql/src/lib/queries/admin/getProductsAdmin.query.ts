import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetProductsAdminQueryVariables = Types.Exact<{
  sortBy?: Types.InputMaybe<Types.Scalars['String']>;
  sortOrder?: Types.InputMaybe<Types.Scalars['String']>;
  pagination: Types.OrdersPaginationAdminDto;
  filter?: Types.InputMaybe<Types.ProductsFilterAdminDto>;
}>;


export type GetProductsAdminQuery = { __typename?: 'Query', getProductsAdmin: { __typename?: 'TransformedProductsDTO', total: number, data?: Array<{ __typename?: 'TransformedProductDTO', id: string, model: string, price: number, quantity: number, maincategory: string, categories: Array<string>, status: boolean, sortOrder: number, dateAdded?: any | null, description: { __typename?: 'ProductDescriptionDTO', id: string, name: string, description?: string | null, tag?: string | null }, images: Array<{ __typename?: 'ProductImageDTO', id: string, imageNameMinio: string, image?: string | null, sortOrder: number }>, options: Array<{ __typename?: 'ProductOptionDTO', id: string, name: string, type: string, values: Array<{ __typename?: 'ProductOptionValueDTO', id: string, href?: string | null, price: number, quantity: number, option?: { __typename?: 'OptionDTO', name: string, type: string } | null, value?: { __typename?: 'OptionValueDTO', name: string } | null }> }> }> | null } };


export const GetProductsAdminDocument = gql`
    query getProductsAdmin($sortBy: String, $sortOrder: String, $pagination: OrdersPaginationAdminDTO!, $filter: ProductsFilterAdminDTO) {
  getProductsAdmin(
    filter: $filter
    pagination: $pagination
    sortBy: $sortBy
    sortOrder: $sortOrder
  ) {
    data {
      id
      model
      price
      quantity
      maincategory
      categories
      status
      sortOrder
      dateAdded
      description {
        id
        name
        description
        tag
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
 * __useGetProductsAdminQuery__
 *
 * To run a query within a React component, call `useGetProductsAdminQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsAdminQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsAdminQuery({
 *   variables: {
 *      sortBy: // value for 'sortBy'
 *      sortOrder: // value for 'sortOrder'
 *      pagination: // value for 'pagination'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetProductsAdminQuery(baseOptions: Apollo.QueryHookOptions<GetProductsAdminQuery, GetProductsAdminQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductsAdminQuery, GetProductsAdminQueryVariables>(GetProductsAdminDocument, options);
      }
export function useGetProductsAdminLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductsAdminQuery, GetProductsAdminQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductsAdminQuery, GetProductsAdminQueryVariables>(GetProductsAdminDocument, options);
        }
export type GetProductsAdminQueryHookResult = ReturnType<typeof useGetProductsAdminQuery>;
export type GetProductsAdminLazyQueryHookResult = ReturnType<typeof useGetProductsAdminLazyQuery>;
export type GetProductsAdminQueryResult = Apollo.QueryResult<GetProductsAdminQuery, GetProductsAdminQueryVariables>;