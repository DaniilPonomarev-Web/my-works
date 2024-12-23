import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllSynonymGroupsQueryVariables = Types.Exact<{
  pagination: Types.OrdersPaginationAdminDto;
  filter: Types.SynonymGroupFilterAdminDto;
}>;


export type GetAllSynonymGroupsQuery = { __typename?: 'Query', getAllSynonymGroups: { __typename?: 'SynonymGroupListDto', total: number, data: Array<{ __typename?: 'SynonymGroupDto', id: string, synonyms: string }> } };


export const GetAllSynonymGroupsDocument = gql`
    query GetAllSynonymGroups($pagination: OrdersPaginationAdminDTO!, $filter: SynonymGroupFilterAdminDTO!) {
  getAllSynonymGroups(pagination: $pagination, filter: $filter) {
    data {
      id
      synonyms
    }
    total
  }
}
    `;

/**
 * __useGetAllSynonymGroupsQuery__
 *
 * To run a query within a React component, call `useGetAllSynonymGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllSynonymGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllSynonymGroupsQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetAllSynonymGroupsQuery(baseOptions: Apollo.QueryHookOptions<GetAllSynonymGroupsQuery, GetAllSynonymGroupsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllSynonymGroupsQuery, GetAllSynonymGroupsQueryVariables>(GetAllSynonymGroupsDocument, options);
      }
export function useGetAllSynonymGroupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllSynonymGroupsQuery, GetAllSynonymGroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllSynonymGroupsQuery, GetAllSynonymGroupsQueryVariables>(GetAllSynonymGroupsDocument, options);
        }
export type GetAllSynonymGroupsQueryHookResult = ReturnType<typeof useGetAllSynonymGroupsQuery>;
export type GetAllSynonymGroupsLazyQueryHookResult = ReturnType<typeof useGetAllSynonymGroupsLazyQuery>;
export type GetAllSynonymGroupsQueryResult = Apollo.QueryResult<GetAllSynonymGroupsQuery, GetAllSynonymGroupsQueryVariables>;