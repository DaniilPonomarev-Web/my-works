'use client';

import React, { useState, useEffect } from 'react';
import Breadcrumb from '../../../ui/breadCrumbs';
import ProductImages from '../../../ui/product/ProductImages';
import InfoTabs from '../../../ui/product/tabs/product-tabs';
import ProductInfo from '../../../ui/product/product-info-form';
import {
  getProductById,
  getCategoryId,
  getRandomProductsByCategory,
} from '../../../lib/actions';
import ProductCardSkeleton from '../../../ui/skeletons/ProductCardSkeleton';
import { HomeIcon } from '@heroicons/react/24/outline';
import SliderProducts from '../../../ui/product/SliderProducts';
import ProductImagesFour from '../../../ui/product/ProductImagesFour';

export default function Product({ params }: { params: any }) {
  const [product, setProduct] = useState<any>(null);
  const [randProducts, setRandProducts] = useState<any>(null);
  const [category, setMainCategory] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedProduct = await getProductById(params.id);
        setProduct(fetchedProduct);

        if (fetchedProduct.maincategory) {
          const fetchedCategory = await getCategoryId(
            fetchedProduct.maincategory
          );
          setMainCategory(fetchedCategory);
        }

        if (fetchedProduct.maincategory) {
          const fetchedRandProducts = await getRandomProductsByCategory(
            fetchedProduct.maincategory,
            fetchedProduct.id
          );
          setRandProducts(fetchedRandProducts);
        }
      } catch (error) {
        console.warn(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  if (loading || !product) {
    return <ProductCardSkeleton />;
  }

  const breadcrumbs = [
    { label: <HomeIcon width={20} />, href: '/home' },
    ...(category
      ? [
          {
            label: category.category.descriptions[0].name,
            href: `/category/${category.category.id}`,
          },
        ]
      : []),
    { label: product.description.name, href: null },
  ];

  return (
    <main className="w-full flex flex-col items-center justify-start min-h-screen px-2 sm:px-0 mb-10">
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <div className="flex flex-col lg:flex-row w-full max-w-6xl mx-auto overflow-hidden">
        <ProductImagesFour
          images={product.images}
          name={product.description.name}
        />

        <ProductImages
          images={product.images}
          name={product.description.name}
        />

        <ProductInfo product={product} randProducts={randProducts} />
      </div>
      <div className="flex flex-col lg:flex-row w-full max-w-6xl mx-auto overflow-hidden">
        {product.productsRelated && product.productsRelated.length > 0 && (
          <SliderProducts
            text="xl font-medium"
            name="Похожие товары"
            products={product.productsRelated}
          />
        )}
      </div>
    </main>
  );
}
