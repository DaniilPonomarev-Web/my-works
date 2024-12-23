'use client';

import Image from 'next/image';
import React from 'react';

export default function ProductImagesFour({ images, name }: any) {
  const blurDataURL =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAPCAYAAADd/14OAAABB2lDQ1BJQ0MgUHJvZmlsZQAAKM9jYGA8wQAELAYMDLl5JUVB7k4KEZFRCuwPGBiBEAwSk4sLGHADoKpv1yBqL+sykA44U1KLk4H0ByBWKQJaDjRSBMgWSYewNUDsJAjbBsQuLykoAbIDQOyikCBnIDsFyNZIR2InIbGTC4pA6nuAbJvcnNJkhLsZeFLzQoOBNAcQyzAUMwQxuDM4gfwPUZK/iIHB4isDA/MEhFjSTAaG7a0MDBK3EGIqCxgY+FsYGLadR4ghwqQgsSgRLMQCxExpaQwMn5YzMPBGMjAIX2Bg4IqGBQQOtymA3ebOkA+E6Qw5DKlAEU+GPIZkBj0gy4jBgMGQwQwAptY/P1N/5B4AAAAJcEhZcwAACxIAAAsSAdLdfvwAAAIOSURBVChTTY97S1NxHMbPG+gy1F08l21Hd1V3dnZpZ27qNsulc6YzRWlYXhIVAqOMCCQC30QvoPfQH72E6K/ACLpRiUU0tamly08/8Z++8PB9eHi+D99HOjxqsP+nwS+B3cOzfSC0usCe4DWhfa8fI/HfHJ9AQ+B0/opdF6a9gyNq9d9I2z9qvPm4xdtPX3n3eYtNwV9/+Mbmlx22dxv83D9hq3aElJtdo7yyTra6ijG6SGJiCWN8GWvmPqN3N3j24iXPX71HKq0scmfjMfPrD5leW6W6do/hpVkKIyV6pivkb07RPzOFNDJfZHhugPJCkdHbVymM9VOpTlIsDJEezlCY6iVTtpCy4ym6K0l6JlJYpThdfQaTC49YePCUzLUx0mUfsWIQKT3RTfYUlRThQpjIQI6c+PHW8hP6BqskUwGiOS9S3/U0lwZNEoMJ9KxfXOcIJy4zVLpBtHecuGlhdorE5IBBW1JHjbfjirqJXsnTJIex25ycVzoJdefJJFJIwXQIe0jhnGJDjup4TQOHEkB26TQpXXisPAFTR2oJKshhGS3mxS+KKBEV0zDpCEbx+wJ4fC7kjotnRi3mQU224bZ8uAwVzeMmoPtxtcq0OOy0tjuQmtvtNIdc2Dtl1ISMM+LE4xfpegC36mV+cQ6nT0WyCXdzsBU5rqFbGvbgBZGoEYvE0bU2LFGkxWHjH1jUPSThBT6lAAAAAElFTkSuQmCC';
  const fallbackImage =
    'https://static.erist.store/images/no_image_product.webp';

  return (
    <div className="w-full lg:w-3/5 flex flex-col items-center hidden md:block">
      <div className="grid grid-cols-2 gap-2">
        {images
          .sort((a: any, b: any) => {
            const isMp4A = a.imageNameMinio?.toLowerCase().endsWith('.mp4');
            const isMp4B = b.imageNameMinio?.toLowerCase().endsWith('.mp4');
            const isGifA = a.imageNameMinio?.toLowerCase().endsWith('.gif');
            const isGifB = b.imageNameMinio?.toLowerCase().endsWith('.gif');

            // Видео выше GIF, GIF выше остальных
            if (isMp4A && !isMp4B) return -1;
            if (!isMp4A && isMp4B) return 1;
            if (isGifA && !isGifB) return -1;
            if (!isGifA && isGifB) return 1;

            // По умолчанию порядок как есть
            return 0;
          })
          .slice(0, 4)
          .map((image: any, index: any) => (
            <div key={index} className="relative">
              {image.imageNameMinio?.toLowerCase().endsWith('.mp4') ? (
                <video
                  controls={true}
                  autoPlay
                  muted
                  loop
                  preload="auto"
                  className="object-cover w-full h-full"
                  poster={blurDataURL} // Постер для видео
                >
                  <source src={image.image} type="video/mp4" />
                  Ваш браузер не поддерживает отображение видео.
                </video>
              ) : (
                <Image
                  src={image.image || fallbackImage}
                  alt={`image-${index}`}
                  width={268}
                  height={403}
                  className="object-cover w-full h-full"
                  blurDataURL={image.blurDataURL || blurDataURL}
                  placeholder="blur"
                />
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
