import React from 'react';
import MovieCard from '../movie-card';
import styles from './styles.css';

const MovieList = ({ movies }) => (
  <ul className={styles.movie_list}>
    {movies.map(({ id, poster_path, release_date, overview, vote_average }) => (
      <li key={id}>
        <MovieCard
          poster_path={poster_path}
          release_date={release_date}
          overview={overview}
          vote_average={vote_average}
        />
      </li>
    ))}
  </ul>
);

export default MovieList;
