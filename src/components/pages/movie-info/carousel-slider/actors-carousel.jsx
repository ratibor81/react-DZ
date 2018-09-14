import { Carousel } from 'react-responsive-carousel';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles.css';

const IMG_BASE = `https://image.tmdb.org/t/p/w300/`;

const ActorsSlider = ({ actors }) => (
  <div className={styles.container}>
    <Carousel
      showIndicators={false}
      showStatus={false}
      // width="300px"
      centerMode
      centerSlidePercentage={100}
      className={styles.carousel}
    >
      {actors.map(actor => (
        <div key={actor.cast_id}>
          <img src={`${IMG_BASE}${actor.profile_path}`} alt="foto" />
          <p className="legend">{actor.name}</p>
        </div>
      ))}
    </Carousel>
  </div>
);
ActorsSlider.propTypes = {
  actors: PropTypes.arrayOf(Array).isRequired,
};
export default ActorsSlider;
