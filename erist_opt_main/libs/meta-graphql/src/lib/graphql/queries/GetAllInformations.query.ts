import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllInformationsQueryVariables = Types.Exact<{
  pagination: Types.OrdersPaginationAdminDto;
}>;


export type GetAllInformationsQuery = { __typename?: 'Query', getAllInformations: { __typename?: 'InformationDataDTO', total: number, data: Array<{ __typename?: 'InformationDTO', id: string, name: string, title: string, content: string, status: boolean }> } };


export const GetAllInformationsDocument = gql`
    query getAllInformations($pagination: OrdersPaginationAdminDTO!) {
  getAllInformations(pagination: $pagination) {
    data {
      id
      name
      title
      content
      status
    }
    total
  }
}
    `;

/**
 * __useGetAllInformationsQuery__
 *
 * To run a query within a React component, call `useGetAllInformationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllInformationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllInformationsQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useGetAllInformationsQuery(baseOptions: Apollo.QueryHookOptions<GetAllInformationsQuery, GetAllInformationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllInformationsQuery, GetAllInformationsQueryVariables>(GetAllInformationsDocument, options);
      }
export function useGetAllInformationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllInformationsQuery, GetAllInformationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllInformationsQuery, GetAllInformationsQueryVariables>(GetAllInformationsDocument, options);
        }
export type GetAllInformationsQueryHookResult = ReturnType<typeof useGetAllInformationsQuery>;
export type GetAllInformationsLazyQueryHookResult = ReturnType<typeof useGetAllInformationsLazyQuery>;
export type GetAllInformationsQueryResult = Apollo.QueryResult<GetAllInformationsQuery, GetAllInformationsQueryVariables>;