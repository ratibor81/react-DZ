import React from 'react';
import MovieCard from '../movie-card';
import styles from './styles.css';

const MovieList = ({ movies, addCard }) => (
  <ul className={styles.movie_list}>
    {movies.map(movie => (
      <li key={movie.id}>
        <MovieCard
         {...movie}
          addCard={addCard}
        />
      </li>
    ))}
  </ul>
);

export default MovieList;
