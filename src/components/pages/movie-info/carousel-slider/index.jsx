import React from 'react';
import Carousel from 'nuka-carousel';
import PropTypes from 'prop-types';

const IMG_BASE = `https://image.tmdb.org/t/p/w500/`;

const ImageSlider = ({ images }) => (
  <Carousel
    width="500px"
    slideWidth={1}
    initialSlideHeight={300}
    wrapAround
    renderBottomCenterControls={() => false}
    cellSpacing={20}
    // speed={1000}
    // renderTopCenterControls={({ currentSlide }) => (
    //   <div>Slide: {currentSlide}</div>
    // )}
    // renderCenterLeftControls={({ previousSlide }) => (
    //   <button type="button" onClick={previousSlide}>
    //     Previous
    //   </button>
    // )}
    // renderCenterRightControls={({ nextSlide }) => (
    //   <button type="button" onClick={nextSlide}>
    //     Next
    //   </button>
    // )}
  >
    {images.map((image, idx) => (
      <img key={String(idx)} src={`${IMG_BASE}${image.file_path}`} alt="foto" />
    ))}
  </Carousel>
);
ImageSlider.propTypes = {
  images: PropTypes.arrayOf(Array).isRequired,
};
export default ImageSlider;
