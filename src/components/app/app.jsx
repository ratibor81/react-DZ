import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CategorySelector from '../category-selector';
import { getMovies } from '../../redux/actions';
import selectorOptions from '../../selectors/selector-options';
import MovieList from '../movie-list';
import SearchBar from '../search-bar';
import SearchPanel from '../search-panel';
import MainSection from '../main-section';
import WatchList from '../watch-list';

class App extends Component {
  static propTypes = {
    movies: PropTypes.arrayOf(Array).isRequired,
    getMovies: PropTypes.func.isRequired,
  };

  state = {
    category: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { category } = this.state;
    const { getMovies: fetchMovies } = this.props;

    if (!category) return;

    const prevCategory = prevState.category;
    const nextCategory = category;

    if (prevCategory !== nextCategory) {
      fetchMovies({
        category: nextCategory.value,
      });
    }
  }

  changeCategory = category => {
    this.setState({ category });
  };

  render() {
    const { category } = this.state;
    const { movies } = this.props;

    return (
      <div className="App">
        <WatchList />
        <MainSection>
          <SearchPanel>
            <CategorySelector
              options={selectorOptions}
              value={category}
              onChange={this.changeCategory}
            />
            <SearchBar />
          </SearchPanel>

          <MovieList movies={movies} />
        </MainSection>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  movies: state.movies.items,
});

const mapDispatchToProps = { getMovies };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
