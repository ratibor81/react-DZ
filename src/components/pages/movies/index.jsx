import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { getMoviesWithCurrentGenre } from '@redux/selectors';
import { getMovies } from '@redux/actions';
import { getCategoryFromProps } from '@helpers';
import * as routes from '../../../constants/routes';
import CategorySelector from './category-selector';
import MovieList from './movie-list';
import SearchBar from './search-bar';
import SearchPanel from './search-panel';
import MainSection from './main-section';
import MovieFilter from './movie-filer';

class MoviesPage extends Component {
  static propTypes = {
    movies: PropTypes.arrayOf(Array).isRequired,
    getMovies: PropTypes.func.isRequired,
    history: PropTypes.objectOf(Object).isRequired,
    // location: PropTypes.objectOf(Object).isRequired,
  };

  state = {
    currentCategory: null,
  };

  componentDidMount() {
    const category = getCategoryFromProps(this.props);
    const { getMovies: fetchMovies } = this.props;
    if (!category) return;
    // if (!category) {
    //   return history.replace({
    //     pathname: location.pathname,
    //     search: '',
    //   });
    // }
    fetchMovies({ category });
  }

  componentDidUpdate(prevProps) {
    const { getMovies: fetchMovies } = this.props;
    const prevCategory = getCategoryFromProps(prevProps);
    const nextCategory = getCategoryFromProps(this.props);
    if (!nextCategory) return;
    if (prevCategory === nextCategory) return;
    fetchMovies({ category: nextCategory });
  }

  changeCategory = category => {
    this.setState({ currentCategory: category });
    const { history } = this.props;

    history.push({
      pathname: routes.HOME,
      search: `?category=${category.value}`,
    });
  };

  render() {
    const { currentCategory } = this.state;
    const { movies } = this.props;
    const category = getCategoryFromProps(this.props);

    return (
      <MainSection>
        <SearchPanel>
          <CategorySelector
            value={currentCategory}
            onChange={this.changeCategory}
          />
          <MovieFilter />
          <SearchBar />
        </SearchPanel>
        {movies.length > 0 && <MovieList movies={movies} category={category} />}
      </MainSection>
    );
  }
}

const mapState = state => ({
  movies: getMoviesWithCurrentGenre(state),
});

const mapDispatch = { getMovies };

export default compose(
  withRouter,
  connect(
    mapState,
    mapDispatch,
  ),
)(MoviesPage);
