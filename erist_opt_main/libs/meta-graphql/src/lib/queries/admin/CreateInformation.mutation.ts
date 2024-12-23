import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateInformationMutationVariables = Types.Exact<{
  data: Types.InputCreateInformationDto;
}>;


export type CreateInformationMutation = { __typename?: 'Mutation', createInformation: { __typename?: 'InformationDTO', id: string, name: string, title: string, content: string, status: boolean } };


export const CreateInformationDocument = gql`
    mutation CreateInformation($data: InputCreateInformationDTO!) {
  createInformation(data: $data) {
    id
    name
    title
    content
    status
  }
}
    `;
export type CreateInformationMutationFn = Apollo.MutationFunction<CreateInformationMutation, CreateInformationMutationVariables>;

/**
 * __useCreateInformationMutation__
 *
 * To run a mutation, you first call `useCreateInformationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateInformationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createInformationMutation, { data, loading, error }] = useCreateInformationMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateInformationMutation(baseOptions?: Apollo.MutationHookOptions<CreateInformationMutation, CreateInformationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateInformationMutation, CreateInformationMutationVariables>(CreateInformationDocument, options);
      }
export type CreateInformationMutationHookResult = ReturnType<typeof useCreateInformationMutation>;
export type CreateInformationMutationResult = Apollo.MutationResult<CreateInformationMutation>;
export type CreateInformationMutationOptions = Apollo.BaseMutationOptions<CreateInformationMutation, CreateInformationMutationVariables>;