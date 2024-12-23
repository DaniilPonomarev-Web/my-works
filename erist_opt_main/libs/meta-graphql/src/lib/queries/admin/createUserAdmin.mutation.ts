import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateUserAdminMutationVariables = Types.Exact<{
  createUserAdminInput: Types.SignUpUserInputDto;
}>;


export type CreateUserAdminMutation = { __typename?: 'Mutation', createUserAdmin: { __typename?: 'UserDTO', id: string, name: string, phone: string, email: string, registrationDate: any, lastLogin?: any | null, company: { __typename?: 'UserCompanyDTO', name: string, inn: string, kpp?: string | null, ogrn?: string | null, urAddress?: string | null, checkingAccount: string, correspondentAccount: string, bankName: string, bikBank: string } } };


export const CreateUserAdminDocument = gql`
    mutation createUserAdmin($createUserAdminInput: SignUpUserInputDTO!) {
  createUserAdmin(createUserAdminInput: $createUserAdminInput) {
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
  }
}
    `;
export type CreateUserAdminMutationFn = Apollo.MutationFunction<CreateUserAdminMutation, CreateUserAdminMutationVariables>;

/**
 * __useCreateUserAdminMutation__
 *
 * To run a mutation, you first call `useCreateUserAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserAdminMutation, { data, loading, error }] = useCreateUserAdminMutation({
 *   variables: {
 *      createUserAdminInput: // value for 'createUserAdminInput'
 *   },
 * });
 */
export function useCreateUserAdminMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserAdminMutation, CreateUserAdminMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserAdminMutation, CreateUserAdminMutationVariables>(CreateUserAdminDocument, options);
      }
export type CreateUserAdminMutationHookResult = ReturnType<typeof useCreateUserAdminMutation>;
export type CreateUserAdminMutationResult = Apollo.MutationResult<CreateUserAdminMutation>;
export type CreateUserAdminMutationOptions = Apollo.BaseMutationOptions<CreateUserAdminMutation, CreateUserAdminMutationVariables>;