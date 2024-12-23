import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SignUpUserMutationVariables = Types.Exact<{
  signUpUserInput: Types.SignUpUserInputDto;
}>;


export type SignUpUserMutation = { __typename?: 'Mutation', signUpUser: { __typename?: 'UserDTO', id: string, name: string, phone: string, email: string, registrationDate: any, lastLogin?: any | null, company: { __typename?: 'UserCompanyDTO', name: string, inn: string, kpp?: string | null, ogrn?: string | null, urAddress?: string | null, checkingAccount: string, correspondentAccount: string, bankName: string, bikBank: string } } };


export const SignUpUserDocument = gql`
    mutation signUpUser($signUpUserInput: SignUpUserInputDTO!) {
  signUpUser(signUpUserInput: $signUpUserInput) {
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
export type SignUpUserMutationFn = Apollo.MutationFunction<SignUpUserMutation, SignUpUserMutationVariables>;

/**
 * __useSignUpUserMutation__
 *
 * To run a mutation, you first call `useSignUpUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpUserMutation, { data, loading, error }] = useSignUpUserMutation({
 *   variables: {
 *      signUpUserInput: // value for 'signUpUserInput'
 *   },
 * });
 */
export function useSignUpUserMutation(baseOptions?: Apollo.MutationHookOptions<SignUpUserMutation, SignUpUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpUserMutation, SignUpUserMutationVariables>(SignUpUserDocument, options);
      }
export type SignUpUserMutationHookResult = ReturnType<typeof useSignUpUserMutation>;
export type SignUpUserMutationResult = Apollo.MutationResult<SignUpUserMutation>;
export type SignUpUserMutationOptions = Apollo.BaseMutationOptions<SignUpUserMutation, SignUpUserMutationVariables>;