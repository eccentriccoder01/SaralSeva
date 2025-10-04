import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Tooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css';

const sliderTooltipStyle = {
  backgroundColor: '#FF9933', // theme color
  color: '#1F2937', // dark text
  padding: '8px 12px',
  borderRadius: '12px',
  fontSize: '14px',
  fontWeight: 500,
  textAlign: 'center',
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  maxWidth: '220px',
  whiteSpace: 'pre-line',
  zIndex: 9999,
};

const Slider = ({ image1, image2, image3, image4, image5 }) => {
  const images = [image1, image2, image3, image4, image5];

  return (
    <div className="overflow-hidden relative">
      <Carousel
        plugins={[
          Autoplay({
            delay: 4000,
            stopOnInteraction: false,
          }),
        ]}
      >
        <CarouselContent>
          {images.map((img, index) => (
            <CarouselItem key={index}>
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                className="w-full h-auto object-cover cursor-pointer"
                data-tooltip-id={`slide-${index}`}
                data-tooltip-content={`Slide ${index + 1}\nCheck this out!`}
              />
              <Tooltip
                id={`slide-${index}`}
                place="top"
                style={sliderTooltipStyle}
                multiline
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
