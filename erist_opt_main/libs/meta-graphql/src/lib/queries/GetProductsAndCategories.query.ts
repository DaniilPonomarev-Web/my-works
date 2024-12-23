import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetProductsAndCategoriesQueryVariables = Types.Exact<{
  searchInput: Types.SearchInputDto;
}>;


export type GetProductsAndCategoriesQuery = { __typename?: 'Query', GetProductsAndCategories: { __typename?: 'ProductsAndCategoriesDTO', products?: Array<{ __typename?: 'TransformedProductDTO', id: string, model: string, price: number, quantity: number, description: { __typename?: 'ProductDescriptionDTO', name: string, description?: string | null }, images: Array<{ __typename?: 'ProductImageDTO', image?: string | null }> }> | null, categories?: Array<{ __typename?: 'CategoryDTO', id: string, descriptions?: Array<{ __typename?: 'CategoryDescriptionDTO', id: string, name: string, description?: string | null }> | null }> | null } };


export const GetProductsAndCategoriesDocument = gql`
    query GetProductsAndCategories($searchInput: SearchInputDTO!) {
  GetProductsAndCategories(searchInput: $searchInput) {
    products {
      id
      model
      price
      quantity
      description {
        name
        description
      }
      images {
        image
      }
    }
    categories {
      id
      descriptions {
        id
        name
        description
      }
    }
  }
}
    `;

/**
 * __useGetProductsAndCategoriesQuery__
 *
 * To run a query within a React component, call `useGetProductsAndCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsAndCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsAndCategoriesQuery({
 *   variables: {
 *      searchInput: // value for 'searchInput'
 *   },
 * });
 */
export function useGetProductsAndCategoriesQuery(baseOptions: Apollo.QueryHookOptions<GetProductsAndCategoriesQuery, GetProductsAndCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductsAndCategoriesQuery, GetProductsAndCategoriesQueryVariables>(GetProductsAndCategoriesDocument, options);
      }
export function useGetProductsAndCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductsAndCategoriesQuery, GetProductsAndCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductsAndCategoriesQuery, GetProductsAndCategoriesQueryVariables>(GetProductsAndCategoriesDocument, options);
        }
export type GetProductsAndCategoriesQueryHookResult = ReturnType<typeof useGetProductsAndCategoriesQuery>;
export type GetProductsAndCategoriesLazyQueryHookResult = ReturnType<typeof useGetProductsAndCategoriesLazyQuery>;
export type GetProductsAndCategoriesQueryResult = Apollo.QueryResult<GetProductsAndCategoriesQuery, GetProductsAndCategoriesQueryVariables>;