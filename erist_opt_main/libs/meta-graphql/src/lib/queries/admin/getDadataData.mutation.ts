import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetDadataDataMutationVariables = Types.Exact<{
  inn: Types.Scalars['String'];
}>;


export type GetDadataDataMutation = { __typename?: 'Mutation', getDadataData: { __typename?: 'DadataDataDTO', citizenship?: string | null, source?: string | null, qc?: string | null, hid?: string | null, type?: string | null, inn?: string | null, ogrn?: string | null, okpo?: string | null, okato?: string | null, oktmo?: string | null, okogu?: string | null, okfs?: string | null, okved?: string | null, okveds?: string | null, authorities?: string | null, documents?: string | null, licenses?: string | null, finance?: string | null, phones?: string | null, emails?: string | null, ogrn_date?: number | null, okved_type?: string | null, employee_count?: string | null, fio?: { __typename?: 'Fio', surname: string, name: string, patronymic: string, gender?: string | null, source?: string | null, qc?: string | null } | null, state?: { __typename?: 'State', status?: string | null, code?: string | null, actuality_date?: number | null, registration_date?: number | null, liquidation_date?: number | null } | null, opf?: { __typename?: 'Opf', type?: string | null, code?: string | null, full?: string | null, short?: string | null } | null, name?: { __typename?: 'Name', full_with_opf?: string | null, short_with_opf?: string | null, latin?: string | null, full?: string | null, short?: string | null } | null, address?: { __typename?: 'DadataSuggestion', value?: string | null, unrestricted_value?: string | null, data?: { __typename?: 'AddressData', postal_code?: string | null, country?: string | null, country_iso_code?: string | null, federal_district?: string | null, region_fias_id?: string | null, region_kladr_id?: string | null, region_iso_code?: string | null, region_with_type?: string | null, region_type?: string | null, region_type_full?: string | null, region?: string | null, city_fias_id?: string | null, city_kladr_id?: string | null, city_with_type?: string | null, city_type?: string | null, city_type_full?: string | null, city?: string | null, fias_id?: string | null, fias_code?: string | null, fias_level?: string | null, fias_actuality_state?: string | null, kladr_id?: string | null, timezone?: string | null, geo_lat?: string | null, geo_lon?: string | null } | null } | null } };


export const GetDadataDataDocument = gql`
    mutation GetDadataData($inn: String!) {
  getDadataData(inn: $inn) {
    citizenship
    fio {
      surname
      name
      patronymic
      gender
      source
      qc
    }
    source
    qc
    hid
    type
    state {
      status
      code
      actuality_date
      registration_date
      liquidation_date
    }
    opf {
      type
      code
      full
      short
    }
    name {
      full_with_opf
      short_with_opf
      latin
      full
      short
    }
    inn
    ogrn
    okpo
    okato
    oktmo
    okogu
    okfs
    okved
    okveds
    authorities
    documents
    licenses
    finance
    address {
      value
      unrestricted_value
      data {
        postal_code
        country
        country_iso_code
        federal_district
        region_fias_id
        region_kladr_id
        region_iso_code
        region_with_type
        region_type
        region_type_full
        region
        city_fias_id
        city_kladr_id
        city_with_type
        city_type
        city_type_full
        city
        fias_id
        fias_code
        fias_level
        fias_actuality_state
        kladr_id
        timezone
        geo_lat
        geo_lon
        timezone
      }
    }
    phones
    emails
    ogrn_date
    okved_type
    employee_count
  }
}
    `;
export type GetDadataDataMutationFn = Apollo.MutationFunction<GetDadataDataMutation, GetDadataDataMutationVariables>;

/**
 * __useGetDadataDataMutation__
 *
 * To run a mutation, you first call `useGetDadataDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetDadataDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getDadataDataMutation, { data, loading, error }] = useGetDadataDataMutation({
 *   variables: {
 *      inn: // value for 'inn'
 *   },
 * });
 */
export function useGetDadataDataMutation(baseOptions?: Apollo.MutationHookOptions<GetDadataDataMutation, GetDadataDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetDadataDataMutation, GetDadataDataMutationVariables>(GetDadataDataDocument, options);
      }
export type GetDadataDataMutationHookResult = ReturnType<typeof useGetDadataDataMutation>;
export type GetDadataDataMutationResult = Apollo.MutationResult<GetDadataDataMutation>;
export type GetDadataDataMutationOptions = Apollo.BaseMutationOptions<GetDadataDataMutation, GetDadataDataMutationVariables>;