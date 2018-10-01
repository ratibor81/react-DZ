import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { getAllMovies, getError } from '@redux/selectors';
import ErrorMessage from '@shared/errors-handler';
import { getMovies } from '@redux/actions';
import MovieList from './movie-list';
import MainSection from './main-section';

class MoviesPage extends Component {
  static propTypes = {
    movies: PropTypes.arrayOf(Array).isRequired,
    getMovies: PropTypes.func.isRequired,
    error: PropTypes.objectOf(Object),
  };

  componentDidMount() {
    const { getMovies: fetchMovies } = this.props;
    fetchMovies('1');
  }

  render() {
    const { movies, error } = this.props;

    return (
      <MainSection>
        {error && <ErrorMessage onClick={() => window.location.reload()} />}
        {movies.length > 0 && <MovieList movies={movies} />}
      </MainSection>
    );
  }
}

MoviesPage.defaultProps = {
  error: null,
};

const mapState = state => ({
  movies: getAllMovies(state),
  error: getError(state),
});

const mapDispatch = { getMovies };

export default compose(
  withRouter,
  connect(
    mapState,
    mapDispatch,
  ),
)(MoviesPage);
