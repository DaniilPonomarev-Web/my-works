import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateUserAdminMutationVariables = Types.Exact<{
  updateUserForAdminDto: Types.UpdateUserForAdminDto;
}>;


export type UpdateUserAdminMutation = { __typename?: 'Mutation', updateUserAdmin: { __typename?: 'UserDTO', id: string, name: string, phone: string, email: string, registrationDate: any, lastLogin?: any | null, status: boolean, company: { __typename?: 'UserCompanyDTO', id: string, name: string, inn: string, kpp?: string | null, ogrn?: string | null, urAddress?: string | null, checkingAccount: string, correspondentAccount: string, bankName: string, bikBank: string } } };


export const UpdateUserAdminDocument = gql`
    mutation updateUserAdmin($updateUserForAdminDto: UpdateUserForAdminDto!) {
  updateUserAdmin(updateUserForAdminDto: $updateUserForAdminDto) {
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
      correspondentAccount
      bankName
      bikBank
      correspondentAccount
    }
  }
}
    `;
export type UpdateUserAdminMutationFn = Apollo.MutationFunction<UpdateUserAdminMutation, UpdateUserAdminMutationVariables>;

/**
 * __useUpdateUserAdminMutation__
 *
 * To run a mutation, you first call `useUpdateUserAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserAdminMutation, { data, loading, error }] = useUpdateUserAdminMutation({
 *   variables: {
 *      updateUserForAdminDto: // value for 'updateUserForAdminDto'
 *   },
 * });
 */
export function useUpdateUserAdminMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserAdminMutation, UpdateUserAdminMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserAdminMutation, UpdateUserAdminMutationVariables>(UpdateUserAdminDocument, options);
      }
export type UpdateUserAdminMutationHookResult = ReturnType<typeof useUpdateUserAdminMutation>;
export type UpdateUserAdminMutationResult = Apollo.MutationResult<UpdateUserAdminMutation>;
export type UpdateUserAdminMutationOptions = Apollo.BaseMutationOptions<UpdateUserAdminMutation, UpdateUserAdminMutationVariables>;