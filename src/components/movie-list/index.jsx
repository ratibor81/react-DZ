import React from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Loader from 'react-loader-spinner';
import MovieCard from '../movie-card';
import styles from './styles.css';

const MovieList = ({ movies, addCard, toggleModal, getMoreMovies }) => (
  <InfiniteScroll
    pageStart={0}
    loadMore={getMoreMovies}
    hasMore
    loader={
      <div className={styles.loader} key={0}>
        <Loader type="ThreeDots" color="#00BFFF" height={120} width={120} />
      </div>
    }
  >
    <TransitionGroup
      component="ul"
      className={styles.movie_list}
      // mountonenter="true"
    >
      {movies.map((movie, idx) => (
        <CSSTransition
          key={idx.toString()}
          timeout={300}
          classNames={{
            enter: styles.popEnter,
            enterActive: styles.popEnterActive,
            // exit: styles.popExit,
            // exitActive: styles.popExitActive,
          }}
          // mountOnEnter
          // unmountOnExit
        >
          <li className={styles.list} key={movie.id}>
            <MovieCard {...movie} addCard={addCard} toggleModal={toggleModal} />
          </li>
        </CSSTransition>
      ))}
    </TransitionGroup>
  </InfiniteScroll>
);

MovieList.propTypes = {
  movies: PropTypes.arrayOf(Array).isRequired,
  addCard: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  getMoreMovies: PropTypes.func.isRequired,
};

export default MovieList;
