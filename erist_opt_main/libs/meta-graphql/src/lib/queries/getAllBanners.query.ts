import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllBannersQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllBannersQuery = { __typename?: 'Query', bannersTrue: Array<{ __typename?: 'BannerDTO', id: string, name: string, status: boolean, title?: string | null, link?: string | null, image: string, image_mob: string, image_href: string, image_mob_href: string }> };


export const GetAllBannersDocument = gql`
    query GetAllBanners {
  bannersTrue {
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
 * __useGetAllBannersQuery__
 *
 * To run a query within a React component, call `useGetAllBannersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllBannersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllBannersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllBannersQuery(baseOptions?: Apollo.QueryHookOptions<GetAllBannersQuery, GetAllBannersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllBannersQuery, GetAllBannersQueryVariables>(GetAllBannersDocument, options);
      }
export function useGetAllBannersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllBannersQuery, GetAllBannersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllBannersQuery, GetAllBannersQueryVariables>(GetAllBannersDocument, options);
        }
export type GetAllBannersQueryHookResult = ReturnType<typeof useGetAllBannersQuery>;
export type GetAllBannersLazyQueryHookResult = ReturnType<typeof useGetAllBannersLazyQuery>;
export type GetAllBannersQueryResult = Apollo.QueryResult<GetAllBannersQuery, GetAllBannersQueryVariables>;