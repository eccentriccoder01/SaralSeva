import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const Slider = ({ image1, image2, image3, image4, image5 }) => {
  return (
    <div className="overflow-hidden relative">
      <Carousel
        plugins={[
          Autoplay({
            delay: 4000, // 4 seconds
            stopOnInteraction: false, // keep autoplay even after manual navigation
          }),
        ]}
      >
        <CarouselContent>
          {[image1, image2, image3, image4, image5].map((img, index) => (
            <CarouselItem key={index}>
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                className="w-full h-auto object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10" />
        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10" />
      </Carousel>
    </div>
  );
};

export default Slider;
