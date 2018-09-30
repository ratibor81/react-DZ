import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { getSearchMovies, getError } from '@redux/selectors';
import { errorReset } from '@redux/actions';
import MainSection from '@pages/movies/main-section';
import SearchMovieList from './movie-list';
import styles from './movie-list/styles.css';

const SearchPage = ({ movies, error, reset }) => (
  <MainSection>
    {error && (
      <div>
        <h1>error</h1>
        <button type="button" onClick={() => reset(200)}>
          RELOAD
        </button>
      </div>
    )}
    {(!movies && <div>dfssdfghdfsh</div>) ||
      (movies.length === 0 && (
        <div className={styles.NothingFound}>
          Nothing found on your request :(
        </div>
      ))}
    {movies && <SearchMovieList movies={movies} />}
  </MainSection>
);

SearchPage.propTypes = {
  movies: PropTypes.arrayOf(Array).isRequired,
  error: PropTypes.objectOf(Object).isRequired,
  reset: PropTypes.func.isRequired,
};

const mapState = state => ({
  movies: getSearchMovies(state),
  error: getError(state),
});
const mapDispatch = {
  reset: errorReset,
};

export default compose(
  withRouter,
  connect(
    mapState,
    mapDispatch,
  ),
)(SearchPage);
