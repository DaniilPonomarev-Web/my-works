import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllSocialHrefsForUserQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllSocialHrefsForUserQuery = { __typename?: 'Query', getAllSocialHrefsForUser: Array<{ __typename?: 'SocialHrefDTO', id: string, name: string, href: string, sortOrder: number }> };


export const GetAllSocialHrefsForUserDocument = gql`
    query getAllSocialHrefsForUser {
  getAllSocialHrefsForUser {
    id
    name
    href
    sortOrder
  }
}
    `;

/**
 * __useGetAllSocialHrefsForUserQuery__
 *
 * To run a query within a React component, call `useGetAllSocialHrefsForUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllSocialHrefsForUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllSocialHrefsForUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllSocialHrefsForUserQuery(baseOptions?: Apollo.QueryHookOptions<GetAllSocialHrefsForUserQuery, GetAllSocialHrefsForUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllSocialHrefsForUserQuery, GetAllSocialHrefsForUserQueryVariables>(GetAllSocialHrefsForUserDocument, options);
      }
export function useGetAllSocialHrefsForUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllSocialHrefsForUserQuery, GetAllSocialHrefsForUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllSocialHrefsForUserQuery, GetAllSocialHrefsForUserQueryVariables>(GetAllSocialHrefsForUserDocument, options);
        }
export type GetAllSocialHrefsForUserQueryHookResult = ReturnType<typeof useGetAllSocialHrefsForUserQuery>;
export type GetAllSocialHrefsForUserLazyQueryHookResult = ReturnType<typeof useGetAllSocialHrefsForUserLazyQuery>;
export type GetAllSocialHrefsForUserQueryResult = Apollo.QueryResult<GetAllSocialHrefsForUserQuery, GetAllSocialHrefsForUserQueryVariables>;