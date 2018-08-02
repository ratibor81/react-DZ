import React from 'react';
import PropTypes from 'prop-types';
import MovieCard from '../movie-card';
import styles from './styles.css';

const MovieList = ({ movies, addCard, toggleModal }) => (
  <ul className={styles.movie_list}>
    {movies.map(movie => (
      <li className={styles.list} key={movie.id}>
        <MovieCard {...movie} addCard={addCard} toggleModal={toggleModal} />
      </li>
    ))}
  </ul>
);

MovieList.propTypes = {
  movies: PropTypes.instanceOf(Array).isRequired,
  addCard: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default MovieList;
