import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import SignOutButton from '../auth-manager/SignOut';
import AuthUserContext from '../../hoc/AuthUserContext';
import styles from './styles.css';
// import withAuthentication from '../../hoc/withAuthentication';

import * as routes from '../../constants/routes';

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
  </AuthUserContext.Consumer>
);

const NavigationAuth = () => (
  <ul className={styles.Nav}>
    <li>
      <Link to={routes.HOME}>Home</Link>
    </li>
    <li>
      <Link to={routes.WATCHLIST}>Watchlist</Link>
    </li>
    <li>
      <Link to={routes.ACCOUNT}>Account</Link>
    </li>
    <li>
      <SignOutButton />
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul className={styles.Nav}>
    <li>
      <Link to={routes.HOME}>Home</Link>
    </li>
    <li>
      <Link to={routes.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
);

export default Navigation;
