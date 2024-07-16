import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

const ImageCarousel = ({ images }) => {
  return (
    <Carousel
      plugins={[Autoplay({ delay: 3000, stopOnMouseEnter: true })]}
      className="w-full"
    >
      <CarouselContent className="flex">
        {images?.map((image, i) => (
          <CarouselItem key={i} className="flex-shrink-0 w-full">
            <Image
              src={image}
              alt="Product image"
              width={500}
              height={500}
              className="w-full "
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default ImageCarousel;
