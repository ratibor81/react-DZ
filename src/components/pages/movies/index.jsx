import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { getAllMovies } from '@redux/selectors';
import { getMovies } from '@redux/actions';
import MovieList from './movie-list';
import MainSection from './main-section';

class MoviesPage extends Component {
  static propTypes = {
    movies: PropTypes.arrayOf(Array).isRequired,
    getMovies: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { getMovies: fetchMovies } = this.props;
    fetchMovies('1');
  }

  render() {
    const { movies } = this.props;

    return (
      <MainSection>
        {movies.length > 0 && <MovieList movies={movies} />}
      </MainSection>
    );
  }
}

const mapState = state => ({
  movies: getAllMovies(state),
});

const mapDispatch = { getMovies };

export default compose(
  withRouter,
  connect(
    mapState,
    mapDispatch,
  ),
)(MoviesPage);
