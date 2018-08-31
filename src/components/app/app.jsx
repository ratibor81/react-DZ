import React, { Component } from 'react';
import { compose } from 'redux';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getCategoryFromProps } from '../../helpers';
import CategorySelector from '../category-selector';
import { getMovies, setFromLocalStorage } from '../../redux/actions';
import MovieList from '../movie-list';
import SearchBar from '../search-bar';
import SearchPanel from '../search-panel';
import MainSection from '../main-section';
import WatchList from '../watch-list';
import { getMoviesWithCurrentGenre } from '../../redux/selectors';
import MovieFilter from '../movie-filer';
import ModalInfo from '../modal-info';
// import withRenderLog from '../../hoc/withRenderLog';

class App extends Component {
  static propTypes = {
    movies: PropTypes.arrayOf(Array).isRequired,
    getMovies: PropTypes.func.isRequired,
    setState: PropTypes.func.isRequired,
    history: PropTypes.objectOf(Object).isRequired,
    location: PropTypes.objectOf(Object).isRequired,
  };

  state = {
    currentCategory: null,
  };

  componentDidMount() {
    this.getFromStorage();
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
    if (prevCategory === nextCategory) return;
    fetchMovies({ category: nextCategory });
  }

  getFromStorage = () => {
    const { setState } = this.props;
    const list = JSON.parse(localStorage.getItem('watchlist'));
    if (!list) return;
    setState(list);
  };

  changeCategory = category => {
    this.setState({ currentCategory: category });
    const { history, location } = this.props;

    history.push({
      pathname: location.pathname,
      search: `?category=${category.value}`,
    });
  };

  render() {
    const { movies } = this.props;
    const { currentCategory } = this.state;
    const category = getCategoryFromProps(this.props);

    return (
      <div className="App">
        <WatchList />
        <MainSection>
          <SearchPanel>
            <CategorySelector
              value={currentCategory}
              onChange={this.changeCategory}
            />
            <MovieFilter />
            <SearchBar />
          </SearchPanel>
          <Switch>
            <Route
              exact
              path="/"
              render={props =>
                movies.length > 0 && (
                  <MovieList movies={movies} category={category} {...props} />
                )
              }
            />
            <Route exact path="/:movieId" component={ModalInfo} />
          </Switch>
        </MainSection>
      </div>
    );
  }
}
const mapState = state => ({
  movies: getMoviesWithCurrentGenre(state),
});

const mapDispatch = { getMovies, setState: setFromLocalStorage };

export default compose(
  hot(module),
  connect(
    mapState,
    mapDispatch,
  ),
)(App);
