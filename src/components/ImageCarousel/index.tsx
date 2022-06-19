import React, { useState } from "react";
//styling
import { Carousel } from "./ImageCarouselStyles";
//icons
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

export type CarouselTypes = {
  images?: [string];
};

const ImageCarousel: React.FC<CarouselTypes> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [arrowsVisible, setArrowsVisible] = useState(false);
  //state
  return (
    <Carousel
      arrowsVisible={arrowsVisible}
      onMouseEnter={() => setArrowsVisible(true)}
      onMouseLeave={() => setArrowsVisible(false)}
    >
      {images && images.length > 1 && (
        <IoIosArrowDropleftCircle
          className="arrows left-arrow"
          onClick={() =>
            currentIndex - 1 === -1
              ? setCurrentIndex(images.length - 1)
              : setCurrentIndex((currentIndex - 1) % images.length)
          }
        />
      )}

      {images && images.length > 0 && (
        <img src={images[currentIndex]} alt={`${currentIndex}`} />
      )}
      {images && images.length > 1 && (
        <IoIosArrowDroprightCircle
          className="arrows right-arrow"
          onClick={() => setCurrentIndex((currentIndex + 1) % images.length)}
        />
      )}
    </Carousel>
  );
};

export default ImageCarousel;
