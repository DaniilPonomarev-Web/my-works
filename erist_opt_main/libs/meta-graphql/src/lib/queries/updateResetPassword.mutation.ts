import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateResetPasswordMutationVariables = Types.Exact<{
  newPassword: Types.NewUserPasswordInputDto;
}>;


export type UpdateResetPasswordMutation = { __typename?: 'Mutation', updateResetPassword: boolean };


export const UpdateResetPasswordDocument = gql`
    mutation updateResetPassword($newPassword: newUserPasswordInputDTO!) {
  updateResetPassword(newPassword: $newPassword)
}
    `;
export type UpdateResetPasswordMutationFn = Apollo.MutationFunction<UpdateResetPasswordMutation, UpdateResetPasswordMutationVariables>;

/**
 * __useUpdateResetPasswordMutation__
 *
 * To run a mutation, you first call `useUpdateResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateResetPasswordMutation, { data, loading, error }] = useUpdateResetPasswordMutation({
 *   variables: {
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useUpdateResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<UpdateResetPasswordMutation, UpdateResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateResetPasswordMutation, UpdateResetPasswordMutationVariables>(UpdateResetPasswordDocument, options);
      }
export type UpdateResetPasswordMutationHookResult = ReturnType<typeof useUpdateResetPasswordMutation>;
export type UpdateResetPasswordMutationResult = Apollo.MutationResult<UpdateResetPasswordMutation>;
export type UpdateResetPasswordMutationOptions = Apollo.BaseMutationOptions<UpdateResetPasswordMutation, UpdateResetPasswordMutationVariables>;