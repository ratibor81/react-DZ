import React from 'react';
import styles from './styles.css';
import PropTypes from 'prop-types';
import CardPanel from '../movie-card-panel'

const IMG_BASE = `https://image.tmdb.org/t/p/w200`;

const MovieCard = ({
  id,
  poster_path,
  release_date,
  overview,
  vote_average,
  addCard,
  toggleModal
}) => (
  <div className={styles.card}>
    <img src={`${IMG_BASE}${poster_path}`} alt="" />
    <h5>Release date: {release_date.slice(0, -6)}</h5>
    <p>{overview}</p>
    <div className={styles.rate}>{vote_average}</div>
    <CardPanel styles={styles.add_panel} addCard={addCard} id={id} toggleModal={toggleModal}/>
  </div>
);

MovieCard.propTypes = {
  id: PropTypes.string,
  poster_path: PropTypes.string,
  release_date: PropTypes.string,
  overview: PropTypes.string,
  vote_average: PropTypes.string,
};


export default MovieCard;
