import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MainPageBlocksQueryVariables = Types.Exact<{
  sortBy: Types.Scalars['String'];
  sortOrder: Types.Scalars['String'];
  pagination: Types.OrdersPaginationAdminDto;
}>;


export type MainPageBlocksQuery = { __typename?: 'Query', mainPageBlocks: { __typename?: 'MainPageBlockListDTO', total: number, blocks: Array<{ __typename?: 'MainPageBlockDTO', id: string, name?: string | null, title?: string | null, link?: string | null, status: boolean, sort: number, products: Array<{ __typename?: 'ProductDTO', id: string, model: string, price: number, quantity: number, maincategory: string, categories: Array<string>, status: boolean, sortOrder: number, description: { __typename?: 'ProductDescriptionDTO', name: string, description?: string | null, tag?: string | null, meta_title?: string | null, meta_h1?: string | null, meta_description?: string | null }, images?: Array<{ __typename?: 'ProductImageDTO', id: string, image?: string | null, sortOrder: number }> | null }> }> } };


export const MainPageBlocksDocument = gql`
    query MainPageBlocks($sortBy: String!, $sortOrder: String!, $pagination: OrdersPaginationAdminDTO!) {
  mainPageBlocks(sortBy: $sortBy, sortOrder: $sortOrder, pagination: $pagination) {
    blocks {
      id
      name
      title
      link
      status
      sort
      products {
        id
        model
        price
        quantity
        maincategory
        categories
        status
        sortOrder
        description {
          name
          description
          tag
          meta_title
          meta_h1
          meta_description
        }
        images {
          id
          image
          sortOrder
        }
      }
    }
    total
  }
}
    `;

/**
 * __useMainPageBlocksQuery__
 *
 * To run a query within a React component, call `useMainPageBlocksQuery` and pass it any options that fit your needs.
 * When your component renders, `useMainPageBlocksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMainPageBlocksQuery({
 *   variables: {
 *      sortBy: // value for 'sortBy'
 *      sortOrder: // value for 'sortOrder'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useMainPageBlocksQuery(baseOptions: Apollo.QueryHookOptions<MainPageBlocksQuery, MainPageBlocksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MainPageBlocksQuery, MainPageBlocksQueryVariables>(MainPageBlocksDocument, options);
      }
export function useMainPageBlocksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MainPageBlocksQuery, MainPageBlocksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MainPageBlocksQuery, MainPageBlocksQueryVariables>(MainPageBlocksDocument, options);
        }
export type MainPageBlocksQueryHookResult = ReturnType<typeof useMainPageBlocksQuery>;
export type MainPageBlocksLazyQueryHookResult = ReturnType<typeof useMainPageBlocksLazyQuery>;
export type MainPageBlocksQueryResult = Apollo.QueryResult<MainPageBlocksQuery, MainPageBlocksQueryVariables>;