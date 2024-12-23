import React, { useEffect, useState } from 'react';
import { AutocompleteArrayInput, useDataProvider } from 'react-admin';

const ProductSelectInput = (props) => {
  const [products, setProducts] = useState([]);
  const dataProvider = useDataProvider();

  useEffect(() => {
    dataProvider
      .getList('products', {
        filter: {},
        sort: { field: 'name', order: 'ASC' },
        pagination: { page: 1, perPage: 1000 },
      })
      .then(({ data }) => setProducts(data));
  }, [dataProvider]);

  return (
    <AutocompleteArrayInput
      {...props}
      choices={products.map((product) => ({
        id: product.id,
        name: product.description.name,
      }))}
      optionText="name"
      optionValue="id"
    />
  );
};

export default ProductSelectInput;
