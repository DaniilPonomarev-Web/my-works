import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetMainPageBlocksOnlyTrueQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetMainPageBlocksOnlyTrueQuery = { __typename?: 'Query', getMainPageBlocksOnlyTrue: Array<{ __typename?: 'MainPageBlockDTO', id: string, name?: string | null, title?: string | null, link?: string | null, status: boolean, products: Array<{ __typename?: 'ProductDTO', id: string, price: number, quantity: number, status: boolean, sortOrder: number, description: { __typename?: 'ProductDescriptionDTO', name: string, description?: string | null }, images?: Array<{ __typename?: 'ProductImageDTO', image?: string | null, blurDataURL?: string | null }> | null }> }> };


export const GetMainPageBlocksOnlyTrueDocument = gql`
    query getMainPageBlocksOnlyTrue {
  getMainPageBlocksOnlyTrue {
    id
    name
    title
    link
    status
    products {
      id
      price
      quantity
      status
      sortOrder
      description {
        name
        description
      }
      images {
        image
        blurDataURL
      }
    }
  }
}
    `;

/**
 * __useGetMainPageBlocksOnlyTrueQuery__
 *
 * To run a query within a React component, call `useGetMainPageBlocksOnlyTrueQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMainPageBlocksOnlyTrueQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMainPageBlocksOnlyTrueQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMainPageBlocksOnlyTrueQuery(baseOptions?: Apollo.QueryHookOptions<GetMainPageBlocksOnlyTrueQuery, GetMainPageBlocksOnlyTrueQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMainPageBlocksOnlyTrueQuery, GetMainPageBlocksOnlyTrueQueryVariables>(GetMainPageBlocksOnlyTrueDocument, options);
      }
export function useGetMainPageBlocksOnlyTrueLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMainPageBlocksOnlyTrueQuery, GetMainPageBlocksOnlyTrueQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMainPageBlocksOnlyTrueQuery, GetMainPageBlocksOnlyTrueQueryVariables>(GetMainPageBlocksOnlyTrueDocument, options);
        }
export type GetMainPageBlocksOnlyTrueQueryHookResult = ReturnType<typeof useGetMainPageBlocksOnlyTrueQuery>;
export type GetMainPageBlocksOnlyTrueLazyQueryHookResult = ReturnType<typeof useGetMainPageBlocksOnlyTrueLazyQuery>;
export type GetMainPageBlocksOnlyTrueQueryResult = Apollo.QueryResult<GetMainPageBlocksOnlyTrueQuery, GetMainPageBlocksOnlyTrueQueryVariables>;