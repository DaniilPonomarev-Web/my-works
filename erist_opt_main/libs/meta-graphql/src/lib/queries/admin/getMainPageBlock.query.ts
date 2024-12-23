import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetMainPageBlockQueryVariables = Types.Exact<{
  IdMainPageBlockInputDTO: Types.IdMainPageBlockInputDto;
}>;


export type GetMainPageBlockQuery = { __typename?: 'Query', getMainPageBlock: { __typename?: 'MainPageBlockDTO', id: string, name?: string | null, title?: string | null, link?: string | null, status: boolean, sort: number, products: Array<{ __typename?: 'ProductDTO', id: string, model: string, price: number, quantity: number, maincategory: string, categories: Array<string>, status: boolean, sortOrder: number, description: { __typename?: 'ProductDescriptionDTO', name: string, description?: string | null, tag?: string | null, meta_title?: string | null, meta_h1?: string | null, meta_description?: string | null }, images?: Array<{ __typename?: 'ProductImageDTO', id: string, image?: string | null, sortOrder: number }> | null }> } };


export const GetMainPageBlockDocument = gql`
    query getMainPageBlock($IdMainPageBlockInputDTO: IdMainPageBlockInputDTO!) {
  getMainPageBlock(IdMainPageBlockInputDTO: $IdMainPageBlockInputDTO) {
    id
    name
    title
    link
    status
    sort
    products {
      id
      model
      price
      quantity
      maincategory
      categories
      status
      sortOrder
      description {
        name
        description
        tag
        meta_title
        meta_h1
        meta_description
      }
      images {
        id
        image
        sortOrder
      }
    }
  }
}
    `;

/**
 * __useGetMainPageBlockQuery__
 *
 * To run a query within a React component, call `useGetMainPageBlockQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMainPageBlockQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMainPageBlockQuery({
 *   variables: {
 *      IdMainPageBlockInputDTO: // value for 'IdMainPageBlockInputDTO'
 *   },
 * });
 */
export function useGetMainPageBlockQuery(baseOptions: Apollo.QueryHookOptions<GetMainPageBlockQuery, GetMainPageBlockQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMainPageBlockQuery, GetMainPageBlockQueryVariables>(GetMainPageBlockDocument, options);
      }
export function useGetMainPageBlockLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMainPageBlockQuery, GetMainPageBlockQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMainPageBlockQuery, GetMainPageBlockQueryVariables>(GetMainPageBlockDocument, options);
        }
export type GetMainPageBlockQueryHookResult = ReturnType<typeof useGetMainPageBlockQuery>;
export type GetMainPageBlockLazyQueryHookResult = ReturnType<typeof useGetMainPageBlockLazyQuery>;
export type GetMainPageBlockQueryResult = Apollo.QueryResult<GetMainPageBlockQuery, GetMainPageBlockQueryVariables>;