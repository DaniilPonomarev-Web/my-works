'use client';

import { useState, useEffect } from 'react';
import { getCategoriesForHomePage } from '../../lib/actions';
import { HomeCategoriesSkeleton } from '../skeletons';
import CategoriesGrid from '../category/CategoriesGrid';

export default function CategoriesHomePage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const fetchedCategories = await getCategoriesForHomePage();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    }
    fetchCategories();
  }, []);

  if (!categories || categories.length === 0) {
    return <HomeCategoriesSkeleton />;
  }

  return (
    <div className="relative w-full max-w-6xl mx-auto my-8 p-4 overflow-hidden">
      <CategoriesGrid categories={categories} />
    </div>
  );
}
