import React from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import { withRouter } from 'react-router';
// import { compose } from 'redux';
// import { getSearchMovies } from '@redux/selectors';
// import { getMovies } from '@redux/actions';
import MainSection from '@pages/movies/main-section';
import MoviesByGenre from './movie-list';

const MovieByGenrePage = () => (
  <MainSection>
    {/* {movies.length === 0 && <div>Nothing found on your request :(</div>} */}
    <MoviesByGenre />
  </MainSection>
);

export default withRouter(MovieByGenrePage);
