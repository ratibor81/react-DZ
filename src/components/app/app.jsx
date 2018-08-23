import React, { Component } from 'react';
// import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CategorySelector from '../category-selector';
import { getMovies, setFromLocalStorage } from '../../redux/actions';
import MovieList from '../movie-list';
import SearchBar from '../search-bar';
import SearchPanel from '../search-panel';
import MainSection from '../main-section';
import WatchList from '../watch-list';
import { getMoviesWithCurrentGenre } from '../../redux/selectors';
import MovieFilter from '../movie-filer';
// import withRenderLog from '../../hoc/withRenderLog';

class App extends Component {
  static propTypes = {
    movies: PropTypes.arrayOf(Array).isRequired,
    getMovies: PropTypes.func.isRequired,
    setState: PropTypes.func.isRequired,
  };

  state = {
    category: null,
  };

  componentDidMount() {
    this.getFromStorage();
  }

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

  getFromStorage = () => {
    const { setState } = this.props;
    const list = JSON.parse(localStorage.getItem('watchlist'));
    if (!list) return;
    setState(list);
  };

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
            <CategorySelector value={category} onChange={this.changeCategory} />
            <MovieFilter />
            <SearchBar />
          </SearchPanel>

          {movies.length > 0 && (
            <MovieList movies={movies} category={category} />
          )}
        </MainSection>
      </div>
    );
  }
}
const mapState = state => ({
  movies: getMoviesWithCurrentGenre(state),
});

const mapDispatch = { getMovies, setState: setFromLocalStorage };

export default connect(
  mapState,
  mapDispatch,
)(App);
