import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UploadProductImageToMinioMutationVariables = Types.Exact<{
  ProductUploadImageDTO: Types.InputProductImageUploadDto;
}>;


export type UploadProductImageToMinioMutation = { __typename?: 'Mutation', uploadProductImageToMinio: { __typename?: 'ProductUploadImageDTO', imageName: string } };


export const UploadProductImageToMinioDocument = gql`
    mutation uploadProductImageToMinio($ProductUploadImageDTO: InputProductImageUploadDTO!) {
  uploadProductImageToMinio(ProductUploadImageDTO: $ProductUploadImageDTO) {
    imageName
  }
}
    `;
export type UploadProductImageToMinioMutationFn = Apollo.MutationFunction<UploadProductImageToMinioMutation, UploadProductImageToMinioMutationVariables>;

/**
 * __useUploadProductImageToMinioMutation__
 *
 * To run a mutation, you first call `useUploadProductImageToMinioMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadProductImageToMinioMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadProductImageToMinioMutation, { data, loading, error }] = useUploadProductImageToMinioMutation({
 *   variables: {
 *      ProductUploadImageDTO: // value for 'ProductUploadImageDTO'
 *   },
 * });
 */
export function useUploadProductImageToMinioMutation(baseOptions?: Apollo.MutationHookOptions<UploadProductImageToMinioMutation, UploadProductImageToMinioMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadProductImageToMinioMutation, UploadProductImageToMinioMutationVariables>(UploadProductImageToMinioDocument, options);
      }
export type UploadProductImageToMinioMutationHookResult = ReturnType<typeof useUploadProductImageToMinioMutation>;
export type UploadProductImageToMinioMutationResult = Apollo.MutationResult<UploadProductImageToMinioMutation>;
export type UploadProductImageToMinioMutationOptions = Apollo.BaseMutationOptions<UploadProductImageToMinioMutation, UploadProductImageToMinioMutationVariables>;