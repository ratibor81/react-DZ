import React, { Component } from 'react';
import { compose } from 'redux';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';
import { AnimatedSwitch, AnimatedRoute } from 'react-router-transition';
import PropTypes from 'prop-types';
import { getCategoryFromProps } from '../../helpers';
import CategorySelector from '../category-selector';
import { getMovies } from '../../redux/actions';
import MovieList from '../movie-list';
import SearchBar from '../search-bar';
import SearchPanel from '../search-panel';
import MainSection from '../main-section';
import { getMoviesWithCurrentGenre } from '../../redux/selectors';
import MovieFilter from '../movie-filer';
import * as routes from '../../constants/routes';
import Navigation from '../navigation';
import withAuthentication from '../../hoc/withAuthentication';
import styles from './styles.css';
import {
  SignInPage,
  SignUpPage,
  AccountPage,
  PasswordForgetPage,
  MovieInfoPage,
  WatchListPage,
  NotFoundPage,
} from '../async-pages';

class App extends Component {
  static propTypes = {
    movies: PropTypes.arrayOf(Array).isRequired,
    getMovies: PropTypes.func.isRequired,
    history: PropTypes.objectOf(Object).isRequired,
    location: PropTypes.objectOf(Object).isRequired,
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
    const { movies } = this.props;
    const { currentCategory } = this.state;
    const category = getCategoryFromProps(this.props);

    return (
      <div className="App">
        <Navigation />
        <MainSection>
          <SearchPanel>
            <CategorySelector
              value={currentCategory}
              onChange={this.changeCategory}
            />
            <MovieFilter />
            <SearchBar />
          </SearchPanel>
          <AnimatedSwitch
            atEnter={{ opacity: 0 }}
            atLeave={{ opacity: 0 }}
            atActive={{ opacity: 1 }}
            className={styles.switch_wrapper}
          >
            <Route
              exact
              path={routes.HOME}
              render={props =>
                movies.length > 0 && (
                  <MovieList movies={movies} category={category} {...props} />
                )
              }
            />
            <Route
              exact
              path={`${routes.MOVIES}/:movieId`}
              component={MovieInfoPage}
            />
            <Route exact path={routes.SIGN_UP} component={SignUpPage} />
            <Route exact path={routes.SIGN_IN} component={SignInPage} />
            <Route
              exact
              path={routes.PASSWORD_FORGET}
              component={PasswordForgetPage}
            />
            <AnimatedRoute
              exact
              path={routes.WATCHLIST}
              component={WatchListPage}
              runOnMount
              atEnter={{ offset: -100 }}
              atLeave={{ offset: -100 }}
              atActive={{ offset: 0 }}
              mapStyles={style => ({
                transform: `translateX(${style.offset}%)`,
              })}
            />
            <Route exact path={routes.ACCOUNT} component={AccountPage} />
            <Route component={NotFoundPage} />
          </AnimatedSwitch>
        </MainSection>
      </div>
    );
  }
}
const mapState = state => ({
  movies: getMoviesWithCurrentGenre(state),
});

const mapDispatch = { getMovies };

export default compose(
  hot(module),
  connect(
    mapState,
    mapDispatch,
  ),
  withAuthentication,
)(App);
