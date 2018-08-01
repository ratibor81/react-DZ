import React from 'react';
import MovieCard from '../movie-card';
import styles from './styles.css';

const MovieList = ({ movies, addCard, toggleModal }) => (
  <ul className={styles.movie_list}>
    {movies.map(movie => (
      <li className={styles.list} key={movie.id}>
        <MovieCard
         {...movie}
          addCard={addCard}
          toggleModal={toggleModal}
        />
      </li>
    ))}
  </ul>
);

export default MovieList;
