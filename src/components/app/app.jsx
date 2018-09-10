import React from 'react';
import { hot } from 'react-hot-loader';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
// import { AnimatedSwitch, AnimatedRoute } from 'react-router-transition';
// import PropTypes from 'prop-types';
import ROUTES from '@constants/routes';
import withAuthentication from '@hoc/withAuthentication';
import Navigation from '../navigation';
// import styles from './styles.css';

const App = () => (
  <div className="App">
    <Navigation />

    <Switch>
      {ROUTES.map((route, index) => (
        <Route
          key={String(index)}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
    </Switch>
  </div>
);

export default withAuthentication(hot(module)(App));
