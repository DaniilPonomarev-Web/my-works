'use client';

import { useState, useEffect } from 'react';
import { getHomeBanner } from '../../lib/actions';
import { Banner } from '../banner';
import { HomeBannerSkeleton } from '../skeletons';

export default function HomeBanner() {
  const [banner, setBanner] = useState([]);

  useEffect(() => {
    async function fetchBlocks() {
      const banner = await getHomeBanner();
      setBanner(banner);
    }
    fetchBlocks();
  }, []);

  if (!banner || banner.length === 0) {
    return <HomeBannerSkeleton />;
  }

  return <Banner banner={banner} />;
}
