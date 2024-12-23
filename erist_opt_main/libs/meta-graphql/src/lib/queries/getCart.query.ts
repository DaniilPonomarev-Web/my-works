import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetCartQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetCartQuery = { __typename?: 'Query', getCart: { __typename?: 'CartDTO', totalAmount: number, discount?: number | null, total: number, percentDiscount?: number | null, canCheckout: boolean, messageError?: string | null, items: Array<{ __typename?: 'CartItemDetailDTO', id: string, quantity: number, available: boolean, product: { __typename?: 'CartProductDTO', id: string, model: string, price: number, name: string, image?: string | null, optionName?: string | null, availableQuantity?: number | null } }> } };


export const GetCartDocument = gql`
    query getCart {
  getCart {
    items {
      id
      product {
        id
        model
        price
        name
        image
        optionName
        availableQuantity
      }
      quantity
      available
    }
    totalAmount
    discount
    total
    percentDiscount
    canCheckout
    messageError
  }
}
    `;

/**
 * __useGetCartQuery__
 *
 * To run a query within a React component, call `useGetCartQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCartQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCartQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCartQuery(baseOptions?: Apollo.QueryHookOptions<GetCartQuery, GetCartQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCartQuery, GetCartQueryVariables>(GetCartDocument, options);
      }
export function useGetCartLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCartQuery, GetCartQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCartQuery, GetCartQueryVariables>(GetCartDocument, options);
        }
export type GetCartQueryHookResult = ReturnType<typeof useGetCartQuery>;
export type GetCartLazyQueryHookResult = ReturnType<typeof useGetCartLazyQuery>;
export type GetCartQueryResult = Apollo.QueryResult<GetCartQuery, GetCartQueryVariables>;