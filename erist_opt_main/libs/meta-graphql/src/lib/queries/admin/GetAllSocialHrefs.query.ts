import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllSocialHrefsQueryVariables = Types.Exact<{
  pagination: Types.OrdersPaginationAdminDto;
}>;


export type GetAllSocialHrefsQuery = { __typename?: 'Query', getAllSocialHrefs: { __typename?: 'SocialHrefsDataDTO', total: number, data: Array<{ __typename?: 'SocialHrefDTO', id: string, name: string, href: string, sortOrder: number }> } };


export const GetAllSocialHrefsDocument = gql`
    query GetAllSocialHrefs($pagination: OrdersPaginationAdminDTO!) {
  getAllSocialHrefs(pagination: $pagination) {
    data {
      id
      name
      href
      sortOrder
    }
    total
  }
}
    `;

/**
 * __useGetAllSocialHrefsQuery__
 *
 * To run a query within a React component, call `useGetAllSocialHrefsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllSocialHrefsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllSocialHrefsQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useGetAllSocialHrefsQuery(baseOptions: Apollo.QueryHookOptions<GetAllSocialHrefsQuery, GetAllSocialHrefsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllSocialHrefsQuery, GetAllSocialHrefsQueryVariables>(GetAllSocialHrefsDocument, options);
      }
export function useGetAllSocialHrefsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllSocialHrefsQuery, GetAllSocialHrefsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllSocialHrefsQuery, GetAllSocialHrefsQueryVariables>(GetAllSocialHrefsDocument, options);
        }
export type GetAllSocialHrefsQueryHookResult = ReturnType<typeof useGetAllSocialHrefsQuery>;
export type GetAllSocialHrefsLazyQueryHookResult = ReturnType<typeof useGetAllSocialHrefsLazyQuery>;
export type GetAllSocialHrefsQueryResult = Apollo.QueryResult<GetAllSocialHrefsQuery, GetAllSocialHrefsQueryVariables>;