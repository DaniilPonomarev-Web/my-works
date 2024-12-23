import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllLogsQueryVariables = Types.Exact<{
  pagination: Types.OrdersPaginationAdminDto;
  service?: Types.InputMaybe<Types.Scalars['String']>;
  admin?: Types.InputMaybe<Types.Scalars['String']>;
  dataId?: Types.InputMaybe<Types.Scalars['String']>;
  fromDate?: Types.InputMaybe<Types.Scalars['String']>;
  toDate?: Types.InputMaybe<Types.Scalars['String']>;
  title?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type GetAllLogsQuery = { __typename?: 'Query', getAllLogs: { __typename?: 'LogsAdminDTO', total: number, logs: Array<{ __typename?: 'LogAdminDTO', id: string, service: string, admin?: string | null, text: string, registred: any, additionalData?: any | null }> } };


export const GetAllLogsDocument = gql`
    query GetAllLogs($pagination: OrdersPaginationAdminDTO!, $service: String, $admin: String, $dataId: String, $fromDate: String, $toDate: String, $title: String) {
  getAllLogs(
    pagination: $pagination
    dataId: $dataId
    service: $service
    admin: $admin
    fromDate: $fromDate
    toDate: $toDate
    title: $title
  ) {
    logs {
      id
      service
      admin
      text
      registred
      additionalData
    }
    total
  }
}
    `;

/**
 * __useGetAllLogsQuery__
 *
 * To run a query within a React component, call `useGetAllLogsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllLogsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllLogsQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      service: // value for 'service'
 *      admin: // value for 'admin'
 *      dataId: // value for 'dataId'
 *      fromDate: // value for 'fromDate'
 *      toDate: // value for 'toDate'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useGetAllLogsQuery(baseOptions: Apollo.QueryHookOptions<GetAllLogsQuery, GetAllLogsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllLogsQuery, GetAllLogsQueryVariables>(GetAllLogsDocument, options);
      }
export function useGetAllLogsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllLogsQuery, GetAllLogsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllLogsQuery, GetAllLogsQueryVariables>(GetAllLogsDocument, options);
        }
export type GetAllLogsQueryHookResult = ReturnType<typeof useGetAllLogsQuery>;
export type GetAllLogsLazyQueryHookResult = ReturnType<typeof useGetAllLogsLazyQuery>;
export type GetAllLogsQueryResult = Apollo.QueryResult<GetAllLogsQuery, GetAllLogsQueryVariables>;