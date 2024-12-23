import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetSynonymGroupByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type GetSynonymGroupByIdQuery = { __typename?: 'Query', getSynonymGroupById: { __typename?: 'SynonymGroupDto', id: string, synonyms: string } };


export const GetSynonymGroupByIdDocument = gql`
    query GetSynonymGroupById($id: ID!) {
  getSynonymGroupById(id: $id) {
    id
    synonyms
  }
}
    `;

/**
 * __useGetSynonymGroupByIdQuery__
 *
 * To run a query within a React component, call `useGetSynonymGroupByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSynonymGroupByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSynonymGroupByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetSynonymGroupByIdQuery(baseOptions: Apollo.QueryHookOptions<GetSynonymGroupByIdQuery, GetSynonymGroupByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSynonymGroupByIdQuery, GetSynonymGroupByIdQueryVariables>(GetSynonymGroupByIdDocument, options);
      }
export function useGetSynonymGroupByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSynonymGroupByIdQuery, GetSynonymGroupByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSynonymGroupByIdQuery, GetSynonymGroupByIdQueryVariables>(GetSynonymGroupByIdDocument, options);
        }
export type GetSynonymGroupByIdQueryHookResult = ReturnType<typeof useGetSynonymGroupByIdQuery>;
export type GetSynonymGroupByIdLazyQueryHookResult = ReturnType<typeof useGetSynonymGroupByIdLazyQuery>;
export type GetSynonymGroupByIdQueryResult = Apollo.QueryResult<GetSynonymGroupByIdQuery, GetSynonymGroupByIdQueryVariables>;