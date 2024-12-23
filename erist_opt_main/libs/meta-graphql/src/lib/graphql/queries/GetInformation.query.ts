import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetInformationQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type GetInformationQuery = { __typename?: 'Query', getInformation: { __typename?: 'InformationDTO', id: string, name: string, title: string, content: string, status: boolean } };


export const GetInformationDocument = gql`
    query GetInformation($id: String!) {
  getInformation(id: $id) {
    id
    name
    title
    content
    status
  }
}
    `;

/**
 * __useGetInformationQuery__
 *
 * To run a query within a React component, call `useGetInformationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInformationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInformationQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetInformationQuery(baseOptions: Apollo.QueryHookOptions<GetInformationQuery, GetInformationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetInformationQuery, GetInformationQueryVariables>(GetInformationDocument, options);
      }
export function useGetInformationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInformationQuery, GetInformationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetInformationQuery, GetInformationQueryVariables>(GetInformationDocument, options);
        }
export type GetInformationQueryHookResult = ReturnType<typeof useGetInformationQuery>;
export type GetInformationLazyQueryHookResult = ReturnType<typeof useGetInformationLazyQuery>;
export type GetInformationQueryResult = Apollo.QueryResult<GetInformationQuery, GetInformationQueryVariables>;