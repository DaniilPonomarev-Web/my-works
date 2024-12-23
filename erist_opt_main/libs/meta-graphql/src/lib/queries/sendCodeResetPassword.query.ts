import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SendCodeResetPasswordQueryVariables = Types.Exact<{
  codeForResetPasswordInput: Types.CodeForResetPasswordInputDto;
}>;


export type SendCodeResetPasswordQuery = { __typename?: 'Query', sendCodeResetPassword: boolean };


export const SendCodeResetPasswordDocument = gql`
    query sendCodeResetPassword($codeForResetPasswordInput: CodeForResetPasswordInputDTO!) {
  sendCodeResetPassword(codeForResetPasswordInput: $codeForResetPasswordInput)
}
    `;

/**
 * __useSendCodeResetPasswordQuery__
 *
 * To run a query within a React component, call `useSendCodeResetPasswordQuery` and pass it any options that fit your needs.
 * When your component renders, `useSendCodeResetPasswordQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSendCodeResetPasswordQuery({
 *   variables: {
 *      codeForResetPasswordInput: // value for 'codeForResetPasswordInput'
 *   },
 * });
 */
export function useSendCodeResetPasswordQuery(baseOptions: Apollo.QueryHookOptions<SendCodeResetPasswordQuery, SendCodeResetPasswordQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SendCodeResetPasswordQuery, SendCodeResetPasswordQueryVariables>(SendCodeResetPasswordDocument, options);
      }
export function useSendCodeResetPasswordLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SendCodeResetPasswordQuery, SendCodeResetPasswordQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SendCodeResetPasswordQuery, SendCodeResetPasswordQueryVariables>(SendCodeResetPasswordDocument, options);
        }
export type SendCodeResetPasswordQueryHookResult = ReturnType<typeof useSendCodeResetPasswordQuery>;
export type SendCodeResetPasswordLazyQueryHookResult = ReturnType<typeof useSendCodeResetPasswordLazyQuery>;
export type SendCodeResetPasswordQueryResult = Apollo.QueryResult<SendCodeResetPasswordQuery, SendCodeResetPasswordQueryVariables>;