import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllBannersAdminQueryVariables = Types.Exact<{
  sortBy: Types.Scalars['String'];
  sortOrder: Types.Scalars['String'];
  pagination: Types.OrdersPaginationAdminDto;
}>;


export type GetAllBannersAdminQuery = { __typename?: 'Query', getAllBannersAdmin: { __typename?: 'BannersListDTO', total: number, banners: Array<{ __typename?: 'BannerDTO', id: string, name: string, title?: string | null, link?: string | null, status: boolean, image: string, image_mob: string, image_href: string, image_mob_href: string }> } };


export const GetAllBannersAdminDocument = gql`
    query getAllBannersAdmin($sortBy: String!, $sortOrder: String!, $pagination: OrdersPaginationAdminDTO!) {
  getAllBannersAdmin(
    sortBy: $sortBy
    sortOrder: $sortOrder
    pagination: $pagination
  ) {
    banners {
      id
      name
      title
      link
      status
      image
      image_mob
      image_href
      image_mob_href
    }
    total
  }
}
    `;

/**
 * __useGetAllBannersAdminQuery__
 *
 * To run a query within a React component, call `useGetAllBannersAdminQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllBannersAdminQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllBannersAdminQuery({
 *   variables: {
 *      sortBy: // value for 'sortBy'
 *      sortOrder: // value for 'sortOrder'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useGetAllBannersAdminQuery(baseOptions: Apollo.QueryHookOptions<GetAllBannersAdminQuery, GetAllBannersAdminQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllBannersAdminQuery, GetAllBannersAdminQueryVariables>(GetAllBannersAdminDocument, options);
      }
export function useGetAllBannersAdminLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllBannersAdminQuery, GetAllBannersAdminQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllBannersAdminQuery, GetAllBannersAdminQueryVariables>(GetAllBannersAdminDocument, options);
        }
export type GetAllBannersAdminQueryHookResult = ReturnType<typeof useGetAllBannersAdminQuery>;
export type GetAllBannersAdminLazyQueryHookResult = ReturnType<typeof useGetAllBannersAdminLazyQuery>;
export type GetAllBannersAdminQueryResult = Apollo.QueryResult<GetAllBannersAdminQuery, GetAllBannersAdminQueryVariables>;