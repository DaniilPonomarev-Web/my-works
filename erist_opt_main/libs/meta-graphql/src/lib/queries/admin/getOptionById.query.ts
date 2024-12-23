import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetOptionByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type GetOptionByIdQuery = { __typename?: 'Query', getOptionById: { __typename?: 'OptionDTO', id: string, name: string, type: string, sortOrder: number, values: Array<{ __typename?: 'OptionValueDTO', id: string, name: string, sortOrder: number, colorCode?: string | null }> } };


export const GetOptionByIdDocument = gql`
    query getOptionById($id: String!) {
  getOptionById(id: $id) {
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
}
    `;

/**
 * __useGetOptionByIdQuery__
 *
 * To run a query within a React component, call `useGetOptionByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOptionByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOptionByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOptionByIdQuery(baseOptions: Apollo.QueryHookOptions<GetOptionByIdQuery, GetOptionByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOptionByIdQuery, GetOptionByIdQueryVariables>(GetOptionByIdDocument, options);
      }
export function useGetOptionByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOptionByIdQuery, GetOptionByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOptionByIdQuery, GetOptionByIdQueryVariables>(GetOptionByIdDocument, options);
        }
export type GetOptionByIdQueryHookResult = ReturnType<typeof useGetOptionByIdQuery>;
export type GetOptionByIdLazyQueryHookResult = ReturnType<typeof useGetOptionByIdLazyQuery>;
export type GetOptionByIdQueryResult = Apollo.QueryResult<GetOptionByIdQuery, GetOptionByIdQueryVariables>;