import React, { Component } from 'react';
//import { hot } from 'react-hot-loader';
import CategorySelector from '../category-selector';
import { fetchMovies } from '../../services/api';
import { searchMovie } from '../../services/search';
import selectorOptions from '../../selector-options';
import MovieList from '../movie-list';
import SearchBar from '../search-bar';

class App extends Component {
  state = {
    movies: [],
    category: null,
    //loading: false,
    //error: null,
  };
  changeCategory = category => {
    this.setState({ category });
  };
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (!this.state.category) return true;

  //   const prevCategory = this.state.category.value;
  //   const nextCategory = nextState.category.value;

  //   const shouldUpdate = prevCategory !== nextCategory;

  //   return shouldUpdate;
  // }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.category) {
      fetchMovies({
        category: this.state.category.value,
        onSuccess: this.handleFetchSuccess,
        onError: this.handleFetchFailure,
      });

      return;
    }

    const prevCategory = prevState.category.value;
    const nextCategory = this.state.category.value;

    if (prevCategory !== nextCategory) {
      fetchMovies({
        category: nextCategory,
        onSuccess: this.handleFetchSuccess,
        onError: this.handleFetchFailure,
      });
    }
  }

  handleFetchSuccess = movies => {
    this.setState({ movies, loading: false });
  };

  handleFetchFailure = error => {
    this.setState({ loading: false, error: error.message });
  };

  handleFetch = () => {
    this.setState({ loading: true, error: null });
  };

  searchMovies = ({ title }) => {
    searchMovie({
      title,
      onSuccess: this.handleFetchSuccess,
      onError: this.handleFetchFailure,
    });
  };

  render() {
    const { category, movies } = this.state;

    return (
      <div>
        <CategorySelector
          options={selectorOptions}
          value={category}
          onChange={this.changeCategory}
        />
        <SearchBar onSubmit={this.searchMovies} />
        {movies.length > 0 && <MovieList movies={movies} />}
      </div>
    );
  }
}

//export default hot(module)(App);
export default App;
