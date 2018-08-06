import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import CategorySelector from '../category-selector';
import fetchMovies from '../../services/get-movies';
import searchMovie from '../../services/search';
import selectorOptions from '../../selectors/selector-options';
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
    error: null,
    // isSearch: false,
  };

  componentDidMount() {
    this.getFromStorage();
  }

  componentDidUpdate(prevProps, prevState) {
    const { category } = this.state;

    if (!category) return;

    const prevCategory = prevState.category;
    const nextCategory = category;

    if (prevCategory !== nextCategory) {
      fetchMovies({
        category: nextCategory.value,
        onSuccess: this.handleFetchMore,
        onError: this.handleFetchFailure,
      });
    }
  }

  getMoreMovies = pageNum => {
    const { category } = this.state;
    if (!category) return;
    fetchMovies({
      pageNum: pageNum + 1,
      category: category.value,
      onSuccess: this.handleFetchMore,
      onError: this.handleFetchFailure,
    });
  };

  getFromStorage = () => {
    const list = JSON.parse(localStorage.getItem('list'));
    if (!list) return;
    this.setState({ watchlist: list });
  };

  setToStorage = () => {
    const { watchlist } = this.state;
    localStorage.setItem('list', JSON.stringify(watchlist));
  };

  handleFetchMore = movies => {
    this.setState(prevState => ({
      movies: prevState.movies.concat(movies),
    }));
  };

  handleFetchFailure = error => {
    this.setState({ error });
  };

  searchMovies = ({ title }) => {
    this.setState({ movies: [] });
    searchMovie({
      title,
      onSuccess: this.handleFetchMore,
      onError: this.handleFetchFailure,
    });
  };

  // handleFetchSuccess = movies => {
  //   this.setState({ movies });
  // };

  toggleModal = id => {
    this.setState(prevState => ({
      isModalOpen: !prevState.isModalOpen,
      movieId: prevState.isModalOpen ? null : id,
    }));
  };

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

  changeCategory = category => {
    this.setState({ category, movies: [] });
  };

  render() {
    const {
      category,
      movies,
      watchlist,
      isModalOpen,
      movieId,
      error,
    } = this.state;

    return (
      <div className="App">
        {error && <div>{error}</div>}
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
            <SearchBar onSearch={this.searchMovies} />
          </SearchPanel>

          {movies.length > 0 && (
            <MovieList
              movies={movies}
              addCard={this.addCard}
              toggleModal={this.toggleModal}
              getMoreMovies={this.getMoreMovies}
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
// export default App;
