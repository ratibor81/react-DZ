import React from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import Loader from 'react-loader-spinner';
import MovieCard from '../movie-card';
import styles from './styles.css';

const MovieList = ({ movies }) => (
  <InfiniteScroll
    pageStart={0}
    // loadMore={}
    hasMore
    loader={
      movies.length > 0 && (
        <div className={styles.loader} key={0}>
          <Loader type="ThreeDots" color="#00BFFF" height={120} width={120} />
        </div>
      )
    }
  >
    <ul className={styles.movie_list}>
      {movies.map(movie => (
        <li className={styles.list_item} key={movie.id}>
          <MovieCard {...movie} />
        </li>
      ))}
    </ul>
  </InfiniteScroll>
);

MovieList.propTypes = {
  movies: PropTypes.arrayOf(Array).isRequired,
};

export default MovieList;
