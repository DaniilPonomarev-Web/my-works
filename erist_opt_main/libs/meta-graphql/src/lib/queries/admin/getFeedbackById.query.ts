import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetFeedbackByIdQueryVariables = Types.Exact<{
  input: Types.FeedBackIdInput;
}>;


export type GetFeedbackByIdQuery = { __typename?: 'Query', getFeedbackById: { __typename?: 'FeedBackDto', id: string, text: string, status: boolean, user: { __typename?: 'UserDTO', id: string, name: string, company: { __typename?: 'UserCompanyDTO', inn: string, name: string } } } };


export const GetFeedbackByIdDocument = gql`
    query GetFeedbackById($input: FeedBackIdInput!) {
  getFeedbackById(input: $input) {
    id
    text
    status
    user {
      id
      name
      company {
        inn
        name
      }
    }
  }
}
    `;

/**
 * __useGetFeedbackByIdQuery__
 *
 * To run a query within a React component, call `useGetFeedbackByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFeedbackByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFeedbackByIdQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetFeedbackByIdQuery(baseOptions: Apollo.QueryHookOptions<GetFeedbackByIdQuery, GetFeedbackByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFeedbackByIdQuery, GetFeedbackByIdQueryVariables>(GetFeedbackByIdDocument, options);
      }
export function useGetFeedbackByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFeedbackByIdQuery, GetFeedbackByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFeedbackByIdQuery, GetFeedbackByIdQueryVariables>(GetFeedbackByIdDocument, options);
        }
export type GetFeedbackByIdQueryHookResult = ReturnType<typeof useGetFeedbackByIdQuery>;
export type GetFeedbackByIdLazyQueryHookResult = ReturnType<typeof useGetFeedbackByIdLazyQuery>;
export type GetFeedbackByIdQueryResult = Apollo.QueryResult<GetFeedbackByIdQuery, GetFeedbackByIdQueryVariables>;