import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllCustomersQueryVariables = Types.Exact<{
  sortBy?: Types.InputMaybe<Types.Scalars['String']>;
  sortOrder?: Types.InputMaybe<Types.Scalars['String']>;
  pagination: Types.OrdersPaginationAdminDto;
  filter?: Types.InputMaybe<Types.CustomersFilterAdminDto>;
}>;


export type GetAllCustomersQuery = { __typename?: 'Query', getAllCustomers: { __typename?: 'CustomersResultDTO', total?: number | null, customers?: Array<{ __typename?: 'CustomerDTO', id: string, login: string, email: string, role: Types.CustomerRole, lastLogin?: any | null }> | null } };


export const GetAllCustomersDocument = gql`
    query getAllCustomers($sortBy: String, $sortOrder: String, $pagination: OrdersPaginationAdminDTO!, $filter: CustomersFilterAdminDTO) {
  getAllCustomers(
    sortBy: $sortBy
    sortOrder: $sortOrder
    pagination: $pagination
    filter: $filter
  ) {
    customers {
      id
      login
      email
      role
      lastLogin
    }
    total
  }
}
    `;

/**
 * __useGetAllCustomersQuery__
 *
 * To run a query within a React component, call `useGetAllCustomersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCustomersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCustomersQuery({
 *   variables: {
 *      sortBy: // value for 'sortBy'
 *      sortOrder: // value for 'sortOrder'
 *      pagination: // value for 'pagination'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetAllCustomersQuery(baseOptions: Apollo.QueryHookOptions<GetAllCustomersQuery, GetAllCustomersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllCustomersQuery, GetAllCustomersQueryVariables>(GetAllCustomersDocument, options);
      }
export function useGetAllCustomersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllCustomersQuery, GetAllCustomersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllCustomersQuery, GetAllCustomersQueryVariables>(GetAllCustomersDocument, options);
        }
export type GetAllCustomersQueryHookResult = ReturnType<typeof useGetAllCustomersQuery>;
export type GetAllCustomersLazyQueryHookResult = ReturnType<typeof useGetAllCustomersLazyQuery>;
export type GetAllCustomersQueryResult = Apollo.QueryResult<GetAllCustomersQuery, GetAllCustomersQueryVariables>;