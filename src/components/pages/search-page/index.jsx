import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { getSearchMovies, getError, getMovieTitle } from '@redux/selectors';
import { errorReset, getMovieByTitle } from '@redux/actions';
import MainSection from '@pages/movies/main-section';
import ErrorMessage from '@shared/errors-handler';
import SearchMovieList from './movie-list';
import styles from './movie-list/styles.css';

class SearchPage extends Component {
  tryAgain = () => {
    const { title, getMovie, reset } = this.props;
    reset(200);
    getMovie({ title });
  };

  render() {
    const { movies, error } = this.props;
    return (
      <MainSection>
        {error && <ErrorMessage onClick={this.tryAgain} />}
        {movies &&
          movies.length === 0 && (
            <div className={styles.NothingFound}>
              Nothing found on your request :(
            </div>
          )}
        {movies && <SearchMovieList movies={movies} />}
      </MainSection>
    );
  }
}

SearchPage.propTypes = {
  movies: PropTypes.arrayOf(Array),
  error: PropTypes.objectOf(Object),
  reset: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  getMovie: PropTypes.func.isRequired,
};
SearchPage.defaultProps = {
  movies: null,
  error: null,
};

const mapState = state => ({
  movies: getSearchMovies(state),
  error: getError(state),
  title: getMovieTitle(state),
});
const mapDispatch = {
  reset: errorReset,
  getMovie: getMovieByTitle,
};

export default compose(
  withRouter,
  connect(
    mapState,
    mapDispatch,
  ),
)(SearchPage);
