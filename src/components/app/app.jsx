import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import CategorySelector from '../category-selector';
import { fetchMovies } from '../../services/api';
import { searchMovie } from '../../services/search';
import selectorOptions from '../../selector-options';
import MovieList from '../movie-list';
import SearchBar from '../search-bar';
import SearchPanel from '../search-panel';
import MainSection from '../main-section';
import WatchList from '../watch-list';
import ModalInfo from '../modal-info';

class App extends Component {
  state = {
    movies: [],
    watchlist: [],
    category: null,
    isModalOpen: false,
    movieId: null,
  };

  changeCategory = category => {
    this.setState({ category });
  };

  componentDidMount() {
    this.getFromStorage();
  }

  toggleModal = id => {
    this.setState(prevState => ({
      isModalOpen: !prevState.isModalOpen,
      movieId: prevState.isModalOpen ? null : id,
    }));
  };

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
    this.setState({ movies });
  };

  handleFetchFailure = error => {
    this.setState({ error: error.message });
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

  render() {
    const { category, movies, watchlist, isModalOpen, movieId } = this.state;

    return (
      <div>
        <WatchList
          watchlist={watchlist}
          removeCard={this.removeCard}
          toggleModal={this.toggleModal}
        />
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
            <MovieList
              movies={movies}
              addCard={this.addCard}
              toggleModal={this.toggleModal}
            />
          )}
        </MainSection>
        {isModalOpen && (
          <ModalInfo
            toggleModal={this.toggleModal}
            open={isModalOpen}
            id={movieId}
          />
        )}
      </div>
    );
  }
}

export default hot(module)(App);
//export default App;
