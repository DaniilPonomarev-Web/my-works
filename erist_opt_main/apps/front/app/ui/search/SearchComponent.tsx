import { useState, useEffect, useRef } from 'react';
import ProductTile from './ProductTile';
import CategoryTile from './CategoryTile';
import { searchRequest, getRandProducts } from '../../lib/actions'; // добавляем getRandProducts
import { Spinner } from '../spinner';
import { useOnClickOutside } from 'usehooks-ts';
import { GetRandProductsQuery } from '@erist-opt/meta-graphql';
import ProductTileRand from './ProductTileRand';

export default function SearchComponent({ isOpen, onClose }: any) {
  const ref = useRef(null);
  const [searchString, setSearchString] = useState('');
  const [searchResults, setSearchResults] = useState({
    products: [],
    categories: [],
  });
  const [randProducts, setRandProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [heightStyle, setHeightStyle] = useState(isOpen ? 'h-0' : 'h-auto');

  useEffect(() => {
    setHeightStyle(isOpen ? 'auto' : '0px');
  }, [isOpen]);

  useEffect(() => {
    const fetchRandProducts = async () => {
      try {
        const randomProducts = await getRandProducts();
        setRandProducts(randomProducts);
      } catch (error) {
        console.error('Ошибка при получении случайных товаров:', error);
      }
    };

    fetchRandProducts();
  }, []); // запрос случайных продуктов при монтировании компонента

  const handleInputChange = async (event: any) => {
    const value = event.target.value;
    setSearchString(value);

    if (value.trim() === '') {
      setSearchResults({ products: [], categories: [] });
      return;
    }

    setIsLoading(true);
    try {
      const results = await searchRequest(value);
      if (results && results.GetProductsAndCategories) {
        setSearchResults({
          products: results.GetProductsAndCategories.products || [],
          categories: results.GetProductsAndCategories.categories || [],
        });
      } else {
        setSearchResults({ products: [], categories: [] });
      }
    } catch (error) {
      console.error('Ошибка при выполнении поиска:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useOnClickOutside(ref, onClose);

  return (
    <div
      ref={ref}
      className={`shadow-8xl absolute w-full z-50 bg-white overflow-hidden transition-all delay-300 duration-1000 ease-in ${
        isOpen ? 'max-h-[90vh] md:max-h-[70vh]' : 'max-h-0'
      } ${heightStyle}`}
    >
      <div className="bg-white shadow-lg border-t border-gray-200 z-50 p-4">
        <div className="relative">
          <div className="flex items-center">
            <div className="w-full">
              <input
                type="text"
                value={searchString}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300"
                placeholder="Введите запрос"
              />
            </div>
          </div>
          <>
            <div className="mt-4 flex flex-col gap-4 overflow-hidden md:flex-row min-h-80 max-h-100">
              <div className="w-full min-h-1/3 max-h-56 overflow-auto lg:w-1/3 md:max-h-96 md:min-h-full">
                <strong>Товары:</strong>
                {isLoading ? (
                  <Spinner />
                ) : (
                  searchResults.products.map((product: any) => (
                    <ProductTile
                      key={product.id}
                      product={product}
                      onClose={onClose}
                    />
                  ))
                )}
              </div>
              <div className="w-full min-h-1/3 max-h-56 overflow-auto lg:w-1/3 md:max-h-96 md:min-h-full">
                <strong>Разделы:</strong>
                {isLoading ? (
                  <Spinner />
                ) : (
                  searchResults.categories.map((category: any) => (
                    <CategoryTile
                      key={category.id}
                      category={category}
                      onClose={onClose}
                    />
                  ))
                )}
              </div>
              <div className="w-full min-h-1/3 max-h-56 overflow-auto lg:w-1/3 md:max-h-96 md:min-h-full">
                <strong>Подборка:</strong>
                {randProducts?.length === 0 ? (
                  <Spinner />
                ) : (
                  <div className="flex flex-wrap gap-4 overflow-auto">
                    {randProducts.map(
                      (product: GetRandProductsQuery['getRandProducts'][0]) => (
                        <div
                          key={product.id}
                          className="flex flex-col items-center rounded-md shadow-md"
                        >
                          <ProductTileRand
                            product={product}
                            onClose={onClose}
                          />
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>
          </>
        </div>
      </div>
    </div>
  );
}
