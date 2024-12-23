import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetUserByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type GetUserByIdQuery = { __typename?: 'Query', getUserById: { __typename?: 'UserDTO', id: string, name: string, phone: string, email: string, registrationDate: any, lastLogin?: any | null, status: boolean, company: { __typename?: 'UserCompanyDTO', id: string, name: string, inn: string, kpp?: string | null, ogrn?: string | null, urAddress?: string | null, checkingAccount: string, bankName: string, bikBank: string, correspondentAccount: string }, agreement?: { __typename?: 'UserAgreementDTO', id: string, signed: boolean } | null } };


export const GetUserByIdDocument = gql`
    query getUserById($id: String!) {
  getUserById(id: $id) {
    id
    name
    phone
    email
    registrationDate
    lastLogin
    status
    company {
      id
      name
      inn
      kpp
      ogrn
      urAddress
      checkingAccount
      bankName
      bikBank
      correspondentAccount
    }
    agreement {
      id
      signed
    }
  }
}
    `;

/**
 * __useGetUserByIdQuery__
 *
 * To run a query within a React component, call `useGetUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserByIdQuery(baseOptions: Apollo.QueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
      }
export function useGetUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
        }
export type GetUserByIdQueryHookResult = ReturnType<typeof useGetUserByIdQuery>;
export type GetUserByIdLazyQueryHookResult = ReturnType<typeof useGetUserByIdLazyQuery>;
export type GetUserByIdQueryResult = Apollo.QueryResult<GetUserByIdQuery, GetUserByIdQueryVariables>;