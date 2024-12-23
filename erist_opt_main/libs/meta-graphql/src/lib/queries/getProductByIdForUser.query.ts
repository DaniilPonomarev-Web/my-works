import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetProductByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type GetProductByIdQuery = { __typename?: 'Query', getProductById: { __typename?: 'TransformedProductDTO', id: string, model: string, price: number, quantity: number, maincategory: string, hrefCloudPhotos?: string | null, categories: Array<string>, status: boolean, sortOrder: number, dateAdded?: any | null, id1c: string, description: { __typename?: 'ProductDescriptionDTO', id: string, name: string, description?: string | null, tag?: string | null, meta_title?: string | null, meta_h1?: string | null, meta_description?: string | null, compound?: string | null, model_parameters?: string | null, care?: string | null, parameters?: string | null }, images: Array<{ __typename?: 'ProductImageDTO', id: string, imageNameMinio: string, blurDataURL?: string | null, image?: string | null, sortOrder: number }>, options: Array<{ __typename?: 'ProductOptionDTO', id: string, name: string, type: string, values: Array<{ __typename?: 'ProductOptionValueDTO', id: string, href?: string | null, price: number, quantity: number, option?: { __typename?: 'OptionDTO', id: string, name: string, type: string } | null, value?: { __typename?: 'OptionValueDTO', id: string, colorCode?: string | null, name: string } | null }> }>, productsRelated?: Array<{ __typename?: 'TransformedProductDTO', id: string, images: Array<{ __typename?: 'ProductImageDTO', image?: string | null, blurDataURL?: string | null }>, description: { __typename?: 'ProductDescriptionDTO', name: string } }> | null, otherColorsProducts?: Array<{ __typename?: 'TransformedProductDTO', id: string, images: Array<{ __typename?: 'ProductImageDTO', image?: string | null, blurDataURL?: string | null }>, description: { __typename?: 'ProductDescriptionDTO', name: string } }> | null } };


export const GetProductByIdDocument = gql`
    query getProductById($id: String!) {
  getProductById(id: $id) {
    id
    model
    price
    quantity
    maincategory
    hrefCloudPhotos
    categories
    status
    sortOrder
    dateAdded
    id1c
    description {
      id
      name
      description
      tag
      meta_title
      meta_h1
      meta_description
      compound
      model_parameters
      care
      parameters
    }
    images {
      id
      imageNameMinio
      blurDataURL
      image
      sortOrder
    }
    options {
      id
      name
      type
      values {
        id
        href
        price
        quantity
        option {
          id
          name
          type
        }
        value {
          id
          colorCode
          name
        }
      }
    }
    productsRelated {
      id
      images {
        image
        blurDataURL
      }
      description {
        name
      }
    }
    otherColorsProducts {
      id
      images {
        image
        blurDataURL
      }
      description {
        name
      }
    }
  }
}
    `;

/**
 * __useGetProductByIdQuery__
 *
 * To run a query within a React component, call `useGetProductByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProductByIdQuery(baseOptions: Apollo.QueryHookOptions<GetProductByIdQuery, GetProductByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductByIdQuery, GetProductByIdQueryVariables>(GetProductByIdDocument, options);
      }
export function useGetProductByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductByIdQuery, GetProductByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductByIdQuery, GetProductByIdQueryVariables>(GetProductByIdDocument, options);
        }
export type GetProductByIdQueryHookResult = ReturnType<typeof useGetProductByIdQuery>;
export type GetProductByIdLazyQueryHookResult = ReturnType<typeof useGetProductByIdLazyQuery>;
export type GetProductByIdQueryResult = Apollo.QueryResult<GetProductByIdQuery, GetProductByIdQueryVariables>;