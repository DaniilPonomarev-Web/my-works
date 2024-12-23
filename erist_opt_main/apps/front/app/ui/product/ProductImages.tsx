'use client';

import { useState } from 'react';
import Image from 'next/image';
import ProductImageCarousel from './ProductImageCarousel';
import React from 'react';

export default function ProductImages({ images, name }: any) {
  // Разделяем изображения и видео/гиф
  const sortedImages = [
    ...images.filter(
      (img: any) =>
        !img.imageNameMinio?.toLowerCase().endsWith('.mp4') &&
        !img.imageNameMinio?.toLowerCase().endsWith('.gif')
    ),
    ...images.filter(
      (img: any) =>
        img.imageNameMinio?.toLowerCase().endsWith('.mp4') ||
        img.imageNameMinio?.toLowerCase().endsWith('.gif')
    ),
  ];

  const [mainMedia, setMainMedia] = useState(
    sortedImages.length > 0
      ? sortedImages[0].image
      : 'https://static.erist.store/images/no_image_product.webp'
  );

  const [mainMediaType, setMainMediaType] = useState(
    sortedImages.length > 0 &&
      sortedImages[0].imageNameMinio?.toLowerCase().endsWith('.mp4')
      ? 'video'
      : 'image'
  );

  const handleImageClick = (image: string, type: 'image' | 'video') => {
    setMainMedia(image);
    setMainMediaType(type);
  };

  const blurDataURL =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAPCAYAAADd/14OAAABB2lDQ1BJQ0MgUHJvZmlsZQAAKM9jYGA8wQAELAYMDLl5JUVB7k4KEZFRCuwPGBiBEAwSk4sLGHADoKpv1yBqL+sykA44U1KLk4H0ByBWKQJaDjRSBMgWSYewNUDsJAjbBsQuLykoAbIDQOyikCBnIDsFyNZIR2InIbGTC4pA6nuAbJvcnNJkhLsZeFLzQoOBNAcQyzAUMwQxuDM4gfwPUZK/iIHB4isDA/MEhFjSTAaG7a0MDBK3EGIqCxgY+FsYGLadR4ghwqQgsSgRLMQCxExpaQwMn5YzMPBGMjAIX2Bg4IqGBQQOtymA3ebOkA+E6Qw5DKlAEU+GPIZkBj0gy4jBgMGQwQwAptY/P1N/5B4AAAAJcEhZcwAACxIAAAsSAdLdfvwAAAIOSURBVChTTY97S1NxHMbPG+gy1F08l21Hd1V3dnZpZ27qNsulc6YzRWlYXhIVAqOMCCQC30QvoPfQH72E6K/ACLpRiUU0tamly08/8Z++8PB9eHi+D99HOjxqsP+nwS+B3cOzfSC0usCe4DWhfa8fI/HfHJ9AQ+B0/opdF6a9gyNq9d9I2z9qvPm4xdtPX3n3eYtNwV9/+Mbmlx22dxv83D9hq3aElJtdo7yyTra6ijG6SGJiCWN8GWvmPqN3N3j24iXPX71HKq0scmfjMfPrD5leW6W6do/hpVkKIyV6pivkb07RPzOFNDJfZHhugPJCkdHbVymM9VOpTlIsDJEezlCY6iVTtpCy4ym6K0l6JlJYpThdfQaTC49YePCUzLUx0mUfsWIQKT3RTfYUlRThQpjIQI6c+PHW8hP6BqskUwGiOS9S3/U0lwZNEoMJ9KxfXOcIJy4zVLpBtHecuGlhdorE5IBBW1JHjbfjirqJXsnTJIex25ycVzoJdefJJFJIwXQIe0jhnGJDjup4TQOHEkB26TQpXXisPAFTR2oJKshhGS3mxS+KKBEV0zDpCEbx+wJ4fC7kjotnRi3mQU224bZ8uAwVzeMmoPtxtcq0OOy0tjuQmtvtNIdc2Dtl1ISMM+LE4xfpegC36mV+cQ6nT0WyCXdzsBU5rqFbGvbgBZGoEYvE0bU2LFGkxWHjH1jUPSThBT6lAAAAAElFTkSuQmCC';
  const fallbackImage =
    'https://static.erist.store/images/no_image_product.webp';

  return (
    <div className="w-full lg:w-1/2 flex flex-col items-center block md:hidden">
      {mainMediaType === 'video' ? (
        <video
          className="w-full h-auto"
          controls={true}
          autoPlay
          muted
          loop
          poster={blurDataURL}
          onError={() => {
            setMainMedia(fallbackImage);
            setMainMediaType('image');
          }}
        >
          <source src={mainMedia} type="video/mp4" />
          Ваш браузер не поддерживает видео.
        </video>
      ) : (
        <Image
          className="w-full h-auto object-cover"
          src={mainMedia !== null ? mainMedia : fallbackImage}
          alt={name}
          layout="responsive"
          width={373}
          height={560}
          onError={() => setMainMedia(fallbackImage)}
          blurDataURL={sortedImages[0]?.blurDataURL || blurDataURL}
          placeholder="blur"
        />
      )}
      <ProductImageCarousel
        images={sortedImages}
        onImageClick={(image: any, type: any) => handleImageClick(image, type)}
      />
    </div>
  );
}
