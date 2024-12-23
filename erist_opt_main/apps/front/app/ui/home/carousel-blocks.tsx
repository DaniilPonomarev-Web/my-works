'use client';

import { useEffect, useState } from 'react';
import { getMainPageBlocks } from '../../lib/actions';
import CarouselMainBlocksOnHomeBage from '../carousel';
import { CarouselMainBlocksSkeleton } from '../skeletons';

export default function CarouselMainBlocks() {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    async function fetchBlocks() {
      const blocksData = await getMainPageBlocks();
      console.warn(blocksData);

      setBlocks(blocksData);
    }
    fetchBlocks();
  }, []);

  if (blocks.length === 0) {
    return <CarouselMainBlocksSkeleton />;
  }

  return (
    <>
      {blocks.map((block: any) => (
        <CarouselMainBlocksOnHomeBage
          key={block.id}
          block={block}
          options={{
            dragFree: true,
            active: true,
            slidesToScroll: window.innerWidth >= 640 ? 3 : 1,
            loop: true,
          }}
        />
      ))}
    </>
  );
}
