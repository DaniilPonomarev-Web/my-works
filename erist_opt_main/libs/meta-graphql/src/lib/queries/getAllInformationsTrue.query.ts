import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllInformationsTrueQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllInformationsTrueQuery = { __typename?: 'Query', getAllInformationsTrue: Array<{ __typename?: 'InformationDTO', id: string, name: string, title: string, content: string, status: boolean }> };


export const GetAllInformationsTrueDocument = gql`
    query getAllInformationsTrue {
  getAllInformationsTrue {
    id
    name
    title
    content
    status
  }
}
    `;

/**
 * __useGetAllInformationsTrueQuery__
 *
 * To run a query within a React component, call `useGetAllInformationsTrueQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllInformationsTrueQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllInformationsTrueQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllInformationsTrueQuery(baseOptions?: Apollo.QueryHookOptions<GetAllInformationsTrueQuery, GetAllInformationsTrueQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllInformationsTrueQuery, GetAllInformationsTrueQueryVariables>(GetAllInformationsTrueDocument, options);
      }
export function useGetAllInformationsTrueLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllInformationsTrueQuery, GetAllInformationsTrueQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllInformationsTrueQuery, GetAllInformationsTrueQueryVariables>(GetAllInformationsTrueDocument, options);
        }
export type GetAllInformationsTrueQueryHookResult = ReturnType<typeof useGetAllInformationsTrueQuery>;
export type GetAllInformationsTrueLazyQueryHookResult = ReturnType<typeof useGetAllInformationsTrueLazyQuery>;
export type GetAllInformationsTrueQueryResult = Apollo.QueryResult<GetAllInformationsTrueQuery, GetAllInformationsTrueQueryVariables>;