import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type WhoIAmQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type WhoIAmQuery = { __typename?: 'Query', whoIAm: { __typename?: 'UserDTO', id: string, name: string, phone: string, email: string, registrationDate: any, lastLogin?: any | null, company: { __typename?: 'UserCompanyDTO', name: string, inn: string, kpp?: string | null, ogrn?: string | null, urAddress?: string | null, checkingAccount: string, correspondentAccount: string, bankName: string, bikBank: string }, agreement?: { __typename?: 'UserAgreementDTO', id: string, signed: boolean } | null } };


export const WhoIAmDocument = gql`
    query WhoIAm {
  whoIAm {
    id
    name
    phone
    email
    registrationDate
    lastLogin
    company {
      name
      inn
      kpp
      ogrn
      urAddress
      checkingAccount
      correspondentAccount
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
 * __useWhoIAmQuery__
 *
 * To run a query within a React component, call `useWhoIAmQuery` and pass it any options that fit your needs.
 * When your component renders, `useWhoIAmQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWhoIAmQuery({
 *   variables: {
 *   },
 * });
 */
export function useWhoIAmQuery(baseOptions?: Apollo.QueryHookOptions<WhoIAmQuery, WhoIAmQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WhoIAmQuery, WhoIAmQueryVariables>(WhoIAmDocument, options);
      }
export function useWhoIAmLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WhoIAmQuery, WhoIAmQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WhoIAmQuery, WhoIAmQueryVariables>(WhoIAmDocument, options);
        }
export type WhoIAmQueryHookResult = ReturnType<typeof useWhoIAmQuery>;
export type WhoIAmLazyQueryHookResult = ReturnType<typeof useWhoIAmLazyQuery>;
export type WhoIAmQueryResult = Apollo.QueryResult<WhoIAmQuery, WhoIAmQueryVariables>;