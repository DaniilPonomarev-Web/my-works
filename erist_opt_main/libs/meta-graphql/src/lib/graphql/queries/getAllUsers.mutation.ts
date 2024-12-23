import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllUsersMutationVariables = Types.Exact<{
  sortBy?: Types.InputMaybe<Types.Scalars['String']>;
  sortOrder?: Types.InputMaybe<Types.Scalars['String']>;
  pagination: Types.OrdersPaginationAdminDto;
  filter?: Types.InputMaybe<Types.UsersFilterAdminDto>;
}>;


export type GetAllUsersMutation = { __typename?: 'Mutation', getAllUsers: { __typename?: 'UsersResultsDTO', total?: number | null, users?: Array<{ __typename?: 'UserDTO', id: string, name: string, phone: string, email: string, registrationDate: any, lastLogin?: any | null, status: boolean, company: { __typename?: 'UserCompanyDTO', id: string, name: string, inn: string, ogrn?: string | null, kpp?: string | null, urAddress?: string | null, checkingAccount: string, correspondentAccount: string, bankName: string, bikBank: string }, agreement?: { __typename?: 'UserAgreementDTO', id: string, signed: boolean } | null }> | null } };


export const GetAllUsersDocument = gql`
    mutation getAllUsers($sortBy: String, $sortOrder: String, $pagination: OrdersPaginationAdminDTO!, $filter: UsersFilterAdminDTO) {
  getAllUsers(
    sortBy: $sortBy
    sortOrder: $sortOrder
    pagination: $pagination
    filter: $filter
  ) {
    users {
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
        ogrn
        kpp
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
    total
  }
}
    `;
export type GetAllUsersMutationFn = Apollo.MutationFunction<GetAllUsersMutation, GetAllUsersMutationVariables>;

/**
 * __useGetAllUsersMutation__
 *
 * To run a mutation, you first call `useGetAllUsersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getAllUsersMutation, { data, loading, error }] = useGetAllUsersMutation({
 *   variables: {
 *      sortBy: // value for 'sortBy'
 *      sortOrder: // value for 'sortOrder'
 *      pagination: // value for 'pagination'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetAllUsersMutation(baseOptions?: Apollo.MutationHookOptions<GetAllUsersMutation, GetAllUsersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetAllUsersMutation, GetAllUsersMutationVariables>(GetAllUsersDocument, options);
      }
export type GetAllUsersMutationHookResult = ReturnType<typeof useGetAllUsersMutation>;
export type GetAllUsersMutationResult = Apollo.MutationResult<GetAllUsersMutation>;
export type GetAllUsersMutationOptions = Apollo.BaseMutationOptions<GetAllUsersMutation, GetAllUsersMutationVariables>;