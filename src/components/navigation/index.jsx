import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
// import AuthUserContext from '@hoc/AuthUserContext';
import * as routes from '@constants/routes';
import { auth } from '../../firebase';
import styles from './styles.css';

const Navigation = () =>
  // <AuthUserContext.Consumer>
  auth.currentUser() ? <PrivateLinks /> : <PublicLinks />;
// </AuthUserContext.Consumer>

const PrivateLinks = () => (
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
      <Button
        variant="raised"
        color="primary"
        type="button"
        onClick={auth.doSignOut}
      >
        Log Out
      </Button>
    </li>
    {auth.isAuth() && (
      <li className={styles.user_panel}>
        <h4>{auth.currentUser().displayName}</h4>
        <img
          src={auth.currentUser().photoURL}
          className={styles.user_foto}
          alt="profile foto"
        />
      </li>
    )}
  </ul>
);

const PublicLinks = () => (
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
