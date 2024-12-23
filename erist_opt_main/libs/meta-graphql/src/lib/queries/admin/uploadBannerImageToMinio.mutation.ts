import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UploadBannerImageToMinioMutationVariables = Types.Exact<{
  BannerUploadImageDTO: Types.InputBannerImageUploadDto;
}>;


export type UploadBannerImageToMinioMutation = { __typename?: 'Mutation', uploadBannerImageToMinio: { __typename?: 'BannerUploadImageDTO', imageName: string } };


export const UploadBannerImageToMinioDocument = gql`
    mutation uploadBannerImageToMinio($BannerUploadImageDTO: InputBannerImageUploadDTO!) {
  uploadBannerImageToMinio(BannerUploadImageDTO: $BannerUploadImageDTO) {
    imageName
  }
}
    `;
export type UploadBannerImageToMinioMutationFn = Apollo.MutationFunction<UploadBannerImageToMinioMutation, UploadBannerImageToMinioMutationVariables>;

/**
 * __useUploadBannerImageToMinioMutation__
 *
 * To run a mutation, you first call `useUploadBannerImageToMinioMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadBannerImageToMinioMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadBannerImageToMinioMutation, { data, loading, error }] = useUploadBannerImageToMinioMutation({
 *   variables: {
 *      BannerUploadImageDTO: // value for 'BannerUploadImageDTO'
 *   },
 * });
 */
export function useUploadBannerImageToMinioMutation(baseOptions?: Apollo.MutationHookOptions<UploadBannerImageToMinioMutation, UploadBannerImageToMinioMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadBannerImageToMinioMutation, UploadBannerImageToMinioMutationVariables>(UploadBannerImageToMinioDocument, options);
      }
export type UploadBannerImageToMinioMutationHookResult = ReturnType<typeof useUploadBannerImageToMinioMutation>;
export type UploadBannerImageToMinioMutationResult = Apollo.MutationResult<UploadBannerImageToMinioMutation>;
export type UploadBannerImageToMinioMutationOptions = Apollo.BaseMutationOptions<UploadBannerImageToMinioMutation, UploadBannerImageToMinioMutationVariables>;