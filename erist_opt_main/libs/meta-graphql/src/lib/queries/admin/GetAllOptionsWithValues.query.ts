import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllOptionsWithValuesQueryVariables = Types.Exact<{
  pagination: Types.OrdersPaginationAdminDto;
}>;


export type GetAllOptionsWithValuesQuery = { __typename?: 'Query', getAllOptionsWithValues: { __typename?: 'OptionsListDTO', total: number, options: Array<{ __typename?: 'OptionDTO', id: string, name: string, type: string, sortOrder: number, values: Array<{ __typename?: 'OptionValueDTO', id: string, name: string, sortOrder: number, colorCode?: string | null }> }> } };


export const GetAllOptionsWithValuesDocument = gql`
    query GetAllOptionsWithValues($pagination: OrdersPaginationAdminDTO!) {
  getAllOptionsWithValues(pagination: $pagination) {
    options {
      id
      name
      type
      sortOrder
      values {
        id
        name
        sortOrder
        colorCode
      }
    }
    total
  }
}
    `;

/**
 * __useGetAllOptionsWithValuesQuery__
 *
 * To run a query within a React component, call `useGetAllOptionsWithValuesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllOptionsWithValuesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllOptionsWithValuesQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useGetAllOptionsWithValuesQuery(baseOptions: Apollo.QueryHookOptions<GetAllOptionsWithValuesQuery, GetAllOptionsWithValuesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllOptionsWithValuesQuery, GetAllOptionsWithValuesQueryVariables>(GetAllOptionsWithValuesDocument, options);
      }
export function useGetAllOptionsWithValuesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllOptionsWithValuesQuery, GetAllOptionsWithValuesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllOptionsWithValuesQuery, GetAllOptionsWithValuesQueryVariables>(GetAllOptionsWithValuesDocument, options);
        }
export type GetAllOptionsWithValuesQueryHookResult = ReturnType<typeof useGetAllOptionsWithValuesQuery>;
export type GetAllOptionsWithValuesLazyQueryHookResult = ReturnType<typeof useGetAllOptionsWithValuesLazyQuery>;
export type GetAllOptionsWithValuesQueryResult = Apollo.QueryResult<GetAllOptionsWithValuesQuery, GetAllOptionsWithValuesQueryVariables>;