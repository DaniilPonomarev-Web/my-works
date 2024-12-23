import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RandProductsByCategoryQueryVariables = Types.Exact<{
  mainCategory: Types.Scalars['String'];
  productId: Types.Scalars['String'];
}>;


export type RandProductsByCategoryQuery = { __typename?: 'Query', randProductsByCategory: Array<{ __typename?: 'TransformedProductDTO', id: string, description: { __typename?: 'ProductDescriptionDTO', name: string }, images: Array<{ __typename?: 'ProductImageDTO', id: string, blurDataURL?: string | null, image?: string | null, sortOrder: number }> }> };


export const RandProductsByCategoryDocument = gql`
    query randProductsByCategory($mainCategory: String!, $productId: String!) {
  randProductsByCategory(mainCategory: $mainCategory, productId: $productId) {
    id
    description {
      name
    }
    images {
      id
      blurDataURL
      image
      sortOrder
    }
  }
}
    `;

/**
 * __useRandProductsByCategoryQuery__
 *
 * To run a query within a React component, call `useRandProductsByCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useRandProductsByCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRandProductsByCategoryQuery({
 *   variables: {
 *      mainCategory: // value for 'mainCategory'
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useRandProductsByCategoryQuery(baseOptions: Apollo.QueryHookOptions<RandProductsByCategoryQuery, RandProductsByCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RandProductsByCategoryQuery, RandProductsByCategoryQueryVariables>(RandProductsByCategoryDocument, options);
      }
export function useRandProductsByCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RandProductsByCategoryQuery, RandProductsByCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RandProductsByCategoryQuery, RandProductsByCategoryQueryVariables>(RandProductsByCategoryDocument, options);
        }
export type RandProductsByCategoryQueryHookResult = ReturnType<typeof useRandProductsByCategoryQuery>;
export type RandProductsByCategoryLazyQueryHookResult = ReturnType<typeof useRandProductsByCategoryLazyQuery>;
export type RandProductsByCategoryQueryResult = Apollo.QueryResult<RandProductsByCategoryQuery, RandProductsByCategoryQueryVariables>;