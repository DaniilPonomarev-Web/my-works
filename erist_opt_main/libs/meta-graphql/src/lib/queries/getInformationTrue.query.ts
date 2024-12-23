import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetInformationTrueQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type GetInformationTrueQuery = { __typename?: 'Query', getInformationTrue: { __typename?: 'InformationDTO', id: string, name: string, title: string, content: string, status: boolean } };


export const GetInformationTrueDocument = gql`
    query GetInformationTrue($id: String!) {
  getInformationTrue(id: $id) {
    id
    name
    title
    content
    status
  }
}
    `;

/**
 * __useGetInformationTrueQuery__
 *
 * To run a query within a React component, call `useGetInformationTrueQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInformationTrueQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInformationTrueQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetInformationTrueQuery(baseOptions: Apollo.QueryHookOptions<GetInformationTrueQuery, GetInformationTrueQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetInformationTrueQuery, GetInformationTrueQueryVariables>(GetInformationTrueDocument, options);
      }
export function useGetInformationTrueLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInformationTrueQuery, GetInformationTrueQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetInformationTrueQuery, GetInformationTrueQueryVariables>(GetInformationTrueDocument, options);
        }
export type GetInformationTrueQueryHookResult = ReturnType<typeof useGetInformationTrueQuery>;
export type GetInformationTrueLazyQueryHookResult = ReturnType<typeof useGetInformationTrueLazyQuery>;
export type GetInformationTrueQueryResult = Apollo.QueryResult<GetInformationTrueQuery, GetInformationTrueQueryVariables>;