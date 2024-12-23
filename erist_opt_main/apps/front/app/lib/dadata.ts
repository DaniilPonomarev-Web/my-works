import axios from 'axios';

const API_KEY = '89f2de55c7b335a841f353b774387da9aa49a3a8';
const API_URL =
  'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';

const API_NAME_URL =
  'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/name';
const API_PHONE_URL =
  'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/phone';
const API_EMAIL_URL =
  'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/email';

interface Suggestion {
  value: string;
  unrestricted_value: string;
  data: {
    postal_code: string;
    country: string;
    region_fias_id: string;
    region_kladr_id: string;
    region_with_type: string;
    region_type: string;
    region_type_full: string;
    region: string;
    area_fias_id: string;
    area_kladr_id: string;
    area_with_type: string;
    area_type: string;
    area_type_full: string;
    area: string;
    city_fias_id: string;
    city_kladr_id: string;
    city_with_type: string;
    city_type: string;
    city_type_full: string;
    city: string;
    settlement_fias_id: string;
    settlement_kladr_id: string;
    settlement_with_type: string;
    settlement_type: string;
    settlement_type_full: string;
    settlement: string;
    street_fias_id: string;
    street_kladr_id: string;
    street_with_type: string;
    street_type: string;
    street_type_full: string;
    street: string;
    house_fias_id: string;
    house_kladr_id: string;
    house_type: string;
    house_type_full: string;
    house: string;
    block_type: string;
    block_type_full: string;
    block: string;
    flat_type: string;
    flat_type_full: string;
    flat: string;
    flat_area: string;
    square_meter: string;
    land_area: string;
  };
}

export async function fetchAddressSuggestions(
  query: string
): Promise<Suggestion[]> {
  try {
    const response = await axios.post(
      API_URL,
      { query },
      {
        headers: {
          Authorization: `Token ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.suggestions;
  } catch (error) {
    console.error('Error fetching address suggestions:', error);
    return [];
  }
}

export async function fetchSuggestionsPersonal(
  url: string,
  query: string
): Promise<Suggestion[]> {
  try {
    const response = await axios.post(
      url,
      { query },
      {
        headers: {
          Authorization: `Token ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.suggestions;
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    return [];
  }
}
