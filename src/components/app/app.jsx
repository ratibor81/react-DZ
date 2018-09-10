import React, { Component } from 'react';
// import { compose } from 'redux';
import { hot } from 'react-hot-loader';
// import { connect } from 'react-redux';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
// import { AnimatedSwitch, AnimatedRoute } from 'react-router-transition';
// import PropTypes from 'prop-types';
import * as routes from '@constants/routes';
import withAuthentication from '@hoc/withAuthentication';
import Navigation from '../navigation';
// import styles from './styles.css';
import {
  SignInPage,
  SignUpPage,
  AccountPage,
  PasswordForgetPage,
  MovieInfoPage,
  WatchListPage,
  NotFoundPage,
  MoviesPage,
} from '../async-pages';

class App extends Component {
  componentDidMount() {
    console.log('erer');
    // if (!category) {
    //   return history.replace({
    //     pathname: location.pathname,
    //     search: '',
    //   });
    // }
  }

  render() {
    return (
      <div className="App">
        <Navigation />

        <Switch>
          <Route exact path={routes.HOME} component={MoviesPage} />
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
          <Route exact path={routes.WATCHLIST} component={WatchListPage} />
          <Route exact path={routes.ACCOUNT} component={AccountPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

export default withAuthentication(hot(module)(App));
