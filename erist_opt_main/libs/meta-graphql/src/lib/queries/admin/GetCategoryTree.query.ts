import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetCategoryTreeQueryVariables = Types.Exact<{
  pagination: Types.OrdersPaginationAdminDto;
  filter?: Types.InputMaybe<Types.CategoryListFilterAdminDto>;
}>;


export type GetCategoryTreeQuery = { __typename?: 'Query', getCategoryTree: { __typename?: 'CategoryListDTO', total: number, data: Array<{ __typename?: 'CategoryDTO', id: string, image?: string | null, parent_id?: string | null, sort_order: number, status: boolean, descriptions?: Array<{ __typename?: 'CategoryDescriptionDTO', id: string, name: string, description?: string | null, meta_title?: string | null, meta_h1?: string | null, meta_description?: string | null, meta_keyword?: string | null }> | null, children?: Array<{ __typename?: 'CategoryDTO', id: string, image?: string | null, parent_id?: string | null, sort_order: number, status: boolean, descriptions?: Array<{ __typename?: 'CategoryDescriptionDTO', id: string, name: string, description?: string | null, meta_title?: string | null, meta_h1?: string | null, meta_description?: string | null, meta_keyword?: string | null }> | null, children?: Array<{ __typename?: 'CategoryDTO', id: string, image?: string | null, parent_id?: string | null, sort_order: number, status: boolean, descriptions?: Array<{ __typename?: 'CategoryDescriptionDTO', id: string, name: string, description?: string | null, meta_title?: string | null, meta_h1?: string | null, meta_description?: string | null, meta_keyword?: string | null }> | null }> | null }> | null }> } };


export const GetCategoryTreeDocument = gql`
    query GetCategoryTree($pagination: OrdersPaginationAdminDTO!, $filter: CategoryListFilterAdminDTO) {
  getCategoryTree(pagination: $pagination, filter: $filter) {
    data {
      id
      image
      parent_id
      sort_order
      status
      descriptions {
        id
        name
        description
        meta_title
        meta_h1
        meta_description
        meta_keyword
      }
      children {
        id
        image
        parent_id
        sort_order
        status
        descriptions {
          id
          name
          description
          meta_title
          meta_h1
          meta_description
          meta_keyword
        }
        children {
          id
          image
          parent_id
          sort_order
          status
          descriptions {
            id
            name
            description
            meta_title
            meta_h1
            meta_description
            meta_keyword
          }
        }
      }
    }
    total
  }
}
    `;

/**
 * __useGetCategoryTreeQuery__
 *
 * To run a query within a React component, call `useGetCategoryTreeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoryTreeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoryTreeQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetCategoryTreeQuery(baseOptions: Apollo.QueryHookOptions<GetCategoryTreeQuery, GetCategoryTreeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoryTreeQuery, GetCategoryTreeQueryVariables>(GetCategoryTreeDocument, options);
      }
export function useGetCategoryTreeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoryTreeQuery, GetCategoryTreeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoryTreeQuery, GetCategoryTreeQueryVariables>(GetCategoryTreeDocument, options);
        }
export type GetCategoryTreeQueryHookResult = ReturnType<typeof useGetCategoryTreeQuery>;
export type GetCategoryTreeLazyQueryHookResult = ReturnType<typeof useGetCategoryTreeLazyQuery>;
export type GetCategoryTreeQueryResult = Apollo.QueryResult<GetCategoryTreeQuery, GetCategoryTreeQueryVariables>;