import React from 'react';
import { hot } from 'react-hot-loader';
// import { Switch } from 'react-router';
import { AnimatedSwitch } from 'react-router-transition';
import { Route } from 'react-router-dom';
// import { AnimatedSwitch, AnimatedRoute } from 'react-router-transition';
// import PropTypes from 'prop-types';
import ROUTES from '@constants/routes';
import withAuthentication from '@hoc/withAuthentication';
import Navigation from '../navigation';
import styles from './styles.css';

const App = () => (
  <div className="App">
    <Navigation />

    <AnimatedSwitch
      atEnter={{ offset: -100 }}
      atLeave={{ offset: -120 }}
      atActive={{ offset: 0 }}
      mapStyles={styles1 => ({
        transform: `translateX(${styles1.offset}%)`,
      })}
      className={styles.switch_wrapper}
    >
      {Object.values(ROUTES).map((route, index) => (
        <Route
          key={String(index)}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
    </AnimatedSwitch>
  </div>
);

export default withAuthentication(hot(module)(App));
