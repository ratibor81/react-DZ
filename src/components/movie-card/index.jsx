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
  onClose,
}) => (
  <div className={styles.Card}>
    <img src={`${IMG_BASE}${posterPath}`} alt="" />
    <h5>Release date: {releaseDate.slice(0, -6)}</h5>
    <p className={styles.Overview}>{overview}</p>
    <div className={styles.Rate}>{voteAverage}</div>
    <CardPanel id={id} onClose={onClose} />
  </div>
);

MovieCard.propTypes = {
  id: PropTypes.number.isRequired,
  poster_path: PropTypes.string,
  release_date: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  vote_average: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};

MovieCard.defaultProps = {
  poster_path: null,
};

export default MovieCard;
