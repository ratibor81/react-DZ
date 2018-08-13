import React, { Component } from 'react';
// import { hot } from 'react-hot-loader';
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
  };

  state = {
    category: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { category } = this.state;

    if (!category) return;

    const prevCategory = prevState.category;
    const nextCategory = category;

    if (prevCategory !== nextCategory) {
      getMovies({
        category: nextCategory.value,
      });
    }
  }

  // addCard = id => {
  //   const { movies, watchlist } = this.state;

  //   const duplicateMovie = watchlist.find(movie => movie.id === id);
  //   if (duplicateMovie) return;

  //   const selectedMovie = movies.find(movie => movie.id === id);

  //   this.setState(
  //     prevState => ({
  //       watchlist: [selectedMovie, ...prevState.watchlist],
  //     }),
  //     () => this.setToStorage(),
  //   );
  // };

  // removeCard = id => {
  //   this.setState(
  //     prevState => ({
  //       watchlist: prevState.watchlist.filter(movie => movie.id !== id),
  //     }),
  //     () => this.setToStorage(),
  //   );
  // };

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
            <SearchBar onSearch={this.searchMovies} />
          </SearchPanel>

          <MovieList movies={movies} />
        </MainSection>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  movies: state.movies,
});

const mapDispatchToProps = { getMovies };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
