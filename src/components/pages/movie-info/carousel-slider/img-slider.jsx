import { Carousel } from 'react-responsive-carousel';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles.css';

const IMG_BASE = `https://image.tmdb.org/t/p/w500`;

const ImageSlider = ({ images }) => (
  <Carousel
    showIndicators={false}
    showStatus
    infiniteLoop
    useKeyboardArrows
    // centerMode
    // centerSlidePercentage={100}
    className={styles.carousel2}
  >
    {images.map((image, idx) => (
      <img
        key={String(idx)}
        src={`${IMG_BASE}${image.file_path}`}
        alt="no foto"
      />
    ))}
  </Carousel>
);
ImageSlider.propTypes = {
  images: PropTypes.arrayOf(Array).isRequired,
};
export default ImageSlider;
