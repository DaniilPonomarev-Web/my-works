import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType } from 'embla-carousel';
import Image from 'next/image';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

export default function ProductImageCarousel({ images, onImageClick }: any) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
  } as EmblaOptionsType);
  const [showPrevArrow, setShowPrevArrow] = useState(false);
  const [showNextArrow, setShowNextArrow] = useState(false);

  const blurDataURL =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAPCAYAAADd/14OAAABB2lDQ1BJQ0MgUHJvZmlsZQAAKM9jYGA8wQAELAYMDLl5JUVB7k4KEZFRCuwPGBiBEAwSk4sLGHADoKpv1yBqL+sykA44U1KLk4H0ByBWKQJaDjRSBMgWSYewNUDsJAjbBsQuLykoAbIDQOyikCBnIDsFyNZIR2InIbGTC4pA6nuAbJvcnNJkhLsZeFLzQoOBNAcQyzAUMwQxuDM4gfwPUZK/iIHB4isDA/MEhFjSTAaG7a0MDBK3EGIqCxgY+FsYGLadR4ghwqQgsSgRLMQCxExpaQwMn5YzMPBGMjAIX2Bg4IqGBQQOtymA3ebOkA+E6Qw5DKlAEU+GPIZkBj0gy4jBgMGQwQwAptY/P1N/5B4AAAAJcEhZcwAACxIAAAsSAdLdfvwAAAIOSURBVChTTY97S1NxHMbPG+gy1F08l21Hd1V3dnZpZ27qNsulc6YzRWlYXhIVAqOMCCQC30QvoPfQH72E6K/ACLpRiUU0tamly08/8Z++8PB9eHi+D99HOjxqsP+nwS+B3cOzfSC0usCe4DWhfa8fI/HfHJ9AQ+B0/opdF6a9gyNq9d9I2z9qvPm4xdtPX3n3eYtNwV9/+Mbmlx22dxv83D9hq3aElJtdo7yyTra6ijG6SGJiCWN8GWvmPqN3N3j24iXPX71HKq0scmfjMfPrD5leW6W6do/hpVkKIyV6pivkb07RPzOFNDJfZHhugPJCkdHbVymM9VOpTlIsDJEezlCY6iVTtpCy4ym6K0l6JlJYpThdfQaTC49YePCUzLUx0mUfsWIQKT3RTfYUlRThQpjIQI6c+PHW8hP6BqskUwGiOS9S3/U0lwZNEoMJ9KxfXOcIJy4zVLpBtHecuGlhdorE5IBBW1JHjbfjirqJXsnTJIex25ycVzoJdefJJFJIwXQIe0jhnGJDjup4TQOHEkB26TQpXXisPAFTR2oJKshhGS3mxS+KKBEV0zDpCEbx+wJ4fC7kjotnRi3mQU224bZ8uAwVzeMmoPtxtcq0OOy0tjuQmtvtNIdc2Dtl1ISMM+LE4xfpegC36mV+cQ6nT0WyCXdzsBU5rqFbGvbgBZGoEYvE0bU2LFGkxWHjH1jUPSThBT6lAAAAAElFTkSuQmCC';

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

  const updateArrows = () => {
    if (emblaApi) {
      setShowPrevArrow(emblaApi.canScrollPrev());
      setShowNextArrow(emblaApi.canScrollNext());
    }
  };

  useEffect(() => {
    if (emblaApi) {
      updateArrows();
      emblaApi.on('select', updateArrows);
      emblaApi.on('resize', updateArrows);
    }
  }, [emblaApi, images]);

  return (
    <div className="relative w-full mt-4 overflow-hidden">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container flex">
          {sortedImages.map((img: any, index: any) => (
            <div
              key={index}
              className="embla__slide flex-shrink-0 w-1/4 h-20 px-1 cursor-pointer"
            >
              <div className="relative w-full h-full">
                {img.imageNameMinio?.toLowerCase().endsWith('.mp4') ? (
                  <video
                    className="object-cover w-full h-full cursor-pointer"
                    controls={false} // Без кнопок управления
                    muted
                    onClick={() => onImageClick(img.image, 'video')}
                    poster={blurDataURL} // Постер для видео
                  >
                    <source src={img.image} type="video/mp4" />
                  </video>
                ) : (
                  <Image
                    className="object-cover object-center cursor-pointer"
                    src={img.image !== null ? img.image : '/no_image.webp'}
                    alt={`Изображение ${index + 1}`}
                    layout="fill"
                    onClick={() => onImageClick(img.image, 'image')}
                    blurDataURL={img.blurDataURL || blurDataURL}
                    placeholder="blur"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Стрелки управления */}
      {showPrevArrow && (
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center"
          onClick={() => emblaApi && emblaApi.scrollPrev()}
        >
          <ArrowLeftIcon className="text-white w-4 m-auto" />
        </button>
      )}
      {showNextArrow && (
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center"
          onClick={() => emblaApi && emblaApi.scrollNext()}
        >
          <ArrowRightIcon className="text-white w-4 m-auto" />
        </button>
      )}
    </div>
  );
}
