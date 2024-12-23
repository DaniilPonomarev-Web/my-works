import React, { useEffect, useState } from 'react';
import { AutocompleteArrayInput, useDataProvider } from 'react-admin';

const ProductSelectInput = (props: any) => {
  const [products, setProducts] = useState([]);
  const dataProvider = useDataProvider();

  useEffect(() => {
    dataProvider
      .getList('products', {
        filter: {
          priceFrom: null,
          priceTo: null,
          name: null,
          colors: null,
          sizes: null,
          status: null,
          categoryId: null,
        },
        sort: { field: 'name', order: 'ASC' },
        pagination: { page: 1, perPage: 10000 },
      })
      .then(({ data }: any) => setProducts(data));
  }, [dataProvider]);

  return (
    <AutocompleteArrayInput
      {...props}
      choices={products.map((product: any) => ({
        id: product.id,
        name: product.description.name,
      }))}
      optionText="name"
      optionValue="id"
    />
  );
};

export default ProductSelectInput;
