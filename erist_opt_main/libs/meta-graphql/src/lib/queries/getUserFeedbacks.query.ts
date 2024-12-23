import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetUserFeedbacksQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetUserFeedbacksQuery = { __typename?: 'Query', getUserFeedbacks: Array<{ __typename?: 'FeedBackDto', id: string, text: string, status: boolean, user: { __typename?: 'UserDTO', id: string, company: { __typename?: 'UserCompanyDTO', inn: string } } }> };


export const GetUserFeedbacksDocument = gql`
    query GetUserFeedbacks {
  getUserFeedbacks {
    id
    text
    status
    user {
      id
      company {
        inn
      }
    }
  }
}
    `;

/**
 * __useGetUserFeedbacksQuery__
 *
 * To run a query within a React component, call `useGetUserFeedbacksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserFeedbacksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserFeedbacksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserFeedbacksQuery(baseOptions?: Apollo.QueryHookOptions<GetUserFeedbacksQuery, GetUserFeedbacksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserFeedbacksQuery, GetUserFeedbacksQueryVariables>(GetUserFeedbacksDocument, options);
      }
export function useGetUserFeedbacksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserFeedbacksQuery, GetUserFeedbacksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserFeedbacksQuery, GetUserFeedbacksQueryVariables>(GetUserFeedbacksDocument, options);
        }
export type GetUserFeedbacksQueryHookResult = ReturnType<typeof useGetUserFeedbacksQuery>;
export type GetUserFeedbacksLazyQueryHookResult = ReturnType<typeof useGetUserFeedbacksLazyQuery>;
export type GetUserFeedbacksQueryResult = Apollo.QueryResult<GetUserFeedbacksQuery, GetUserFeedbacksQueryVariables>;