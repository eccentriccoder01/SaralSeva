import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const Slider = ({ image1, image2, image3, image4, image5, image6 }) => {
  return (
    <div className="overflow-hidden relative">
      <Carousel
        plugins={[Autoplay({ delay: 4000 })]}
        opts={{ loop: true }}
        className="w-full"
      >
        <CarouselContent>
          {[image1, image2, image3, image4, image5, image6].map((img, index) => (
            <CarouselItem key={index}>
              <img src={img} alt={`Slide ${index + 1}`} className="object-cover w-full h-[30vh] md:h-[40vh] lg:h-[50vh]"/>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 transform -translate-y-1/2 top-1/2 bg-black/30 text-white hover:bg-black/50 border-none"/>
        <CarouselNext className="absolute right-4 transform -translate-y-1/2 top-1/2 bg-black/30 text-white hover:bg-black/50 border-none"/>
      </Carousel>
    </div>
  );
};

export default Slider;