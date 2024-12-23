import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllFeedbacksQueryVariables = Types.Exact<{
  pagination: Types.OrdersPaginationAdminDto;
  filter?: Types.InputMaybe<Types.FeedBackListFilterAdminDto>;
}>;


export type GetAllFeedbacksQuery = { __typename?: 'Query', getAllFeedbacks: { __typename?: 'FeedBackListDTO', total: number, data: Array<{ __typename?: 'FeedBackDto', id: string, text: string, status: boolean, user: { __typename?: 'UserDTO', id: string, name: string, company: { __typename?: 'UserCompanyDTO', inn: string, name: string } } }> } };


export const GetAllFeedbacksDocument = gql`
    query GetAllFeedbacks($pagination: OrdersPaginationAdminDTO!, $filter: FeedBackListFilterAdminDTO) {
  getAllFeedbacks(pagination: $pagination, filter: $filter) {
    data {
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
    total
  }
}
    `;

/**
 * __useGetAllFeedbacksQuery__
 *
 * To run a query within a React component, call `useGetAllFeedbacksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllFeedbacksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllFeedbacksQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetAllFeedbacksQuery(baseOptions: Apollo.QueryHookOptions<GetAllFeedbacksQuery, GetAllFeedbacksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllFeedbacksQuery, GetAllFeedbacksQueryVariables>(GetAllFeedbacksDocument, options);
      }
export function useGetAllFeedbacksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllFeedbacksQuery, GetAllFeedbacksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllFeedbacksQuery, GetAllFeedbacksQueryVariables>(GetAllFeedbacksDocument, options);
        }
export type GetAllFeedbacksQueryHookResult = ReturnType<typeof useGetAllFeedbacksQuery>;
export type GetAllFeedbacksLazyQueryHookResult = ReturnType<typeof useGetAllFeedbacksLazyQuery>;
export type GetAllFeedbacksQueryResult = Apollo.QueryResult<GetAllFeedbacksQuery, GetAllFeedbacksQueryVariables>;