import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetRandProductsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetRandProductsQuery = { __typename?: 'Query', getRandProducts: Array<{ __typename?: 'TransformedProductDTO', id: string, model: string, price: number, quantity: number, maincategory: string, categories: Array<string>, status: boolean, sortOrder: number, dateAdded?: any | null, description: { __typename?: 'ProductDescriptionDTO', name: string, description?: string | null }, images: Array<{ __typename?: 'ProductImageDTO', id: string, image?: string | null, sortOrder: number }>, options: Array<{ __typename?: 'ProductOptionDTO', id: string, name: string, type: string, values: Array<{ __typename?: 'ProductOptionValueDTO', id: string, href?: string | null, price: number, quantity: number, option?: { __typename?: 'OptionDTO', name: string, type: string } | null, value?: { __typename?: 'OptionValueDTO', name: string } | null }> }> }> };


export const GetRandProductsDocument = gql`
    query getRandProducts {
  getRandProducts {
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
      name
      description
    }
    images {
      id
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
}
    `;

/**
 * __useGetRandProductsQuery__
 *
 * To run a query within a React component, call `useGetRandProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRandProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRandProductsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRandProductsQuery(baseOptions?: Apollo.QueryHookOptions<GetRandProductsQuery, GetRandProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRandProductsQuery, GetRandProductsQueryVariables>(GetRandProductsDocument, options);
      }
export function useGetRandProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRandProductsQuery, GetRandProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRandProductsQuery, GetRandProductsQueryVariables>(GetRandProductsDocument, options);
        }
export type GetRandProductsQueryHookResult = ReturnType<typeof useGetRandProductsQuery>;
export type GetRandProductsLazyQueryHookResult = ReturnType<typeof useGetRandProductsLazyQuery>;
export type GetRandProductsQueryResult = Apollo.QueryResult<GetRandProductsQuery, GetRandProductsQueryVariables>;