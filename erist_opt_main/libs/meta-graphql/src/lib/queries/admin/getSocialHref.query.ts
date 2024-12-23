import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetSocialHrefQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type GetSocialHrefQuery = { __typename?: 'Query', getSocialHref: { __typename?: 'SocialHrefDTO', id: string, name: string, href: string, sortOrder: number } };


export const GetSocialHrefDocument = gql`
    query getSocialHref($id: ID!) {
  getSocialHref(id: $id) {
    id
    name
    href
    sortOrder
  }
}
    `;

/**
 * __useGetSocialHrefQuery__
 *
 * To run a query within a React component, call `useGetSocialHrefQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSocialHrefQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSocialHrefQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetSocialHrefQuery(baseOptions: Apollo.QueryHookOptions<GetSocialHrefQuery, GetSocialHrefQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSocialHrefQuery, GetSocialHrefQueryVariables>(GetSocialHrefDocument, options);
      }
export function useGetSocialHrefLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSocialHrefQuery, GetSocialHrefQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSocialHrefQuery, GetSocialHrefQueryVariables>(GetSocialHrefDocument, options);
        }
export type GetSocialHrefQueryHookResult = ReturnType<typeof useGetSocialHrefQuery>;
export type GetSocialHrefLazyQueryHookResult = ReturnType<typeof useGetSocialHrefLazyQuery>;
export type GetSocialHrefQueryResult = Apollo.QueryResult<GetSocialHrefQuery, GetSocialHrefQueryVariables>;