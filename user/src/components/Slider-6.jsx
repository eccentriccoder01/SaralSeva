import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const Slider = ({ image1, image2, image3, image4, image5, image6 }) => {
 return (
    <div className="overflow-hidden relative bg-white dark:bg-gray-900 transition-colors duration-500">
      <Carousel
        plugins={[Autoplay({ delay: 4000 })]}
        opts={{ loop: true }}
        className="w-full"
      >
        <CarouselContent>
          {[image1, image2, image3, image4, image5, image6].map((img, index) => (
            <CarouselItem key={index}>
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                className="object-cover w-full h-[30vh] md:h-[40vh] lg:h-[50vh] transition-colors duration-500"
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Previous Button */}
        <CarouselPrevious
          className="absolute left-4 transform -translate-y-1/2 top-1/2
            bg-black/30 dark:bg-white/20 text-white dark:text-black
            hover:bg-black/50 dark:hover:bg-white/40 border-none rounded-full p-2 transition-colors duration-300"
        />

        {/* Next Button */}
        <CarouselNext
          className="absolute right-4 transform -translate-y-1/2 top-1/2
            bg-black/30 dark:bg-white/20 text-white dark:text-black
            hover:bg-black/50 dark:hover:bg-white/40 border-none rounded-full p-2 transition-colors duration-300"
        />

        {/* Optional overlay in dark mode for better contrast */}
        <div className="absolute inset-0 bg-transparent dark:bg-black/20 pointer-events-none transition-colors duration-500"></div>
      </Carousel>
    </div>
  );
};

export default Slider;