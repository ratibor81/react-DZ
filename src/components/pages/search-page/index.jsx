import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { getSearchMovies } from '@redux/selectors';
// import { getMovies } from '@redux/actions';
import MainSection from '@pages/movies/main-section';
import SearchMovieList from './movie-list';

const SearchPage = ({ movies }) => (
  <MainSection>
    {movies.length === 0 && <div>Nothing found on your request :(</div>}
    {movies.length > 0 && <SearchMovieList movies={movies} />}
  </MainSection>
);

SearchPage.propTypes = {
  movies: PropTypes.arrayOf(Array).isRequired,
  // getMovies: PropTypes.func.isRequired,
};

const mapState = state => ({
  movies: getSearchMovies(state),
});

// const mapDispatch = { getMovies };

export default compose(
  withRouter,
  connect(
    mapState,
    null,
  ),
)(SearchPage);
