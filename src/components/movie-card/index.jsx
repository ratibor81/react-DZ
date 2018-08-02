import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';
import CardPanel from '../movie-card-panel';

const IMG_BASE = `https://image.tmdb.org/t/p/w200`;

const MovieCard = ({
  id,
  poster_path: posterPath,
  release_date: releaseDate,
  overview,
  vote_average: voteAverage,
  addCard,
  toggleModal,
}) => (
  <div className={styles.card}>
    <img src={`${IMG_BASE}${posterPath}`} alt="" />
    <h5>Release date: {releaseDate.slice(0, -6)}</h5>
    <p className={styles.overview}>{overview}</p>
    <div className={styles.rate}>{voteAverage}</div>
    <CardPanel
      styles={styles.add_panel}
      addCard={addCard}
      id={id}
      toggleModal={toggleModal}
    />
  </div>
);

MovieCard.propTypes = {
  id: PropTypes.number.isRequired,
  poster_path: PropTypes.string.isRequired,
  release_date: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  vote_average: PropTypes.number.isRequired,
  addCard: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default MovieCard;
