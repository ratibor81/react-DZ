import React from 'react';
import { hot } from 'react-hot-loader';
import { Switch } from 'react-router';
// import { AnimatedSwitch } from 'react-router-transition';
import { Route } from 'react-router-dom';
import ROUTES from '@constants/routes';
import withAuthentication from '@hoc/withAuthentication';
import ScrollUpButton from 'react-scroll-up-button';
import Navigation from '../navigation';
// import styles from './styles.css';

const App = () => (
  <div className="App">
    <Navigation />

    <Switch>
      {Object.values(ROUTES).map((route, idx) => (
        <Route
          key={String(idx)}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
    </Switch>
    <ScrollUpButton />
  </div>
);

export default withAuthentication(hot(module)(App));
