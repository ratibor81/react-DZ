import React from 'react';
import { NavLink } from 'react-router-dom';
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
      <NavLink
        exact
        to={routes.HOME}
        className={styles.Link}
        activeClassName={styles.LinkActive}
      >
        Home
      </NavLink>
    </li>
    <li>
      <NavLink
        to={routes.WATCHLIST}
        className={styles.Link}
        activeClassName={styles.LinkActive}
      >
        Watchlist
      </NavLink>
    </li>
    <li>
      <NavLink
        to={routes.ACCOUNT}
        className={styles.Link}
        activeClassName={styles.LinkActive}
      >
        Account
      </NavLink>
    </li>
    <li>
      <SignOutButton />
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul className={styles.Nav}>
    <li>
      <NavLink
        exact
        to={routes.HOME}
        className={styles.Link}
        activeClassName={styles.LinkActive}
      >
        Home
      </NavLink>
    </li>
    <li>
      <NavLink
        to={routes.SIGN_IN}
        className={styles.Link}
        activeClassName={styles.LinkActive}
      >
        Sign In
      </NavLink>
    </li>
  </ul>
);

export default Navigation;
