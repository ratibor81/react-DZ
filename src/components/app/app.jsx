import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import CategorySelector from '../category-selector';
import { fetchMovies } from '../../services/api';
import { searchMovie } from '../../services/search';
import selectorOptions from '../../selector-options';
import MovieList from '../movie-list';
import SearchBar from '../search-bar';
import styles from './styles.css';
import SearchPanel from '../search-panel';
import MainSection from '../main-section';
import WatchList from '../watch-list';

class App extends Component {
  state = {
    movies: [],
    watchlist: [],
    category: null,
    //loading: false,
    //error: null,
  };
  changeCategory = category => {
    this.setState({ category });
  };
  componentDidMount() {
    this.getFromStorage();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.category === null) return;
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

  setToStorage = () =>
    localStorage.setItem('list', JSON.stringify(this.state.watchlist));

  addCard = id => {
    const { movies, watchlist } = this.state;

    const duplicateMovie = watchlist.find(movie => movie.id === id);
    if (duplicateMovie) return;

    const selectedMovie = movies.find(movie => movie.id === id);

    this.setState(
      prevState => ({
        watchlist: [selectedMovie, ...prevState.watchlist],
      }),
      () => this.setToStorage(),
    );
  };

  removeCard = id => {
    this.setState(
      prevState => ({
        watchlist: prevState.watchlist.filter(movie => movie.id !== id),
      }),
      () => this.setToStorage(),
    );
  };

  getFromStorage = () => {
    const list = JSON.parse(localStorage.getItem('list'));
    if (!list) return;
    this.setState({ watchlist: list });
  };

  // getMovieInfo = () => {
  //   console.log('INFo !');
  // }

  render() {
    const { category, movies, watchlist } = this.state;

    return (
      <div className={styles.container}>
        <WatchList watchlist={watchlist} removeCard={this.removeCard} />
        <MainSection>
          <SearchPanel>
            <CategorySelector
              options={selectorOptions}
              value={category}
              onChange={this.changeCategory}
            />
            <SearchBar onSubmit={this.searchMovies} />
          </SearchPanel>
          {movies.length > 0 && (
            <MovieList movies={movies} addCard={this.addCard} />
          )}
        </MainSection>
      </div>
    );
  }
}

export default hot(module)(App);
//export default App;
