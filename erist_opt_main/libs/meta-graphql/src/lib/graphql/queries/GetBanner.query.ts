import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetBannerQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type GetBannerQuery = { __typename?: 'Query', banner: { __typename?: 'BannerDTO', id: string, name: string, status: boolean, title?: string | null, link?: string | null, image: string, image_mob: string, image_href: string, image_mob_href: string } };


export const GetBannerDocument = gql`
    query GetBanner($id: ID!) {
  banner(id: $id) {
    id
    name
    status
    title
    link
    image
    image_mob
    image_href
    image_mob_href
  }
}
    `;

/**
 * __useGetBannerQuery__
 *
 * To run a query within a React component, call `useGetBannerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBannerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBannerQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetBannerQuery(baseOptions: Apollo.QueryHookOptions<GetBannerQuery, GetBannerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBannerQuery, GetBannerQueryVariables>(GetBannerDocument, options);
      }
export function useGetBannerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBannerQuery, GetBannerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBannerQuery, GetBannerQueryVariables>(GetBannerDocument, options);
        }
export type GetBannerQueryHookResult = ReturnType<typeof useGetBannerQuery>;
export type GetBannerLazyQueryHookResult = ReturnType<typeof useGetBannerLazyQuery>;
export type GetBannerQueryResult = Apollo.QueryResult<GetBannerQuery, GetBannerQueryVariables>;