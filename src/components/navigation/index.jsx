import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import Loader from 'react-loader-spinner';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import * as routes from '@constants/routes';
import SearchBar from '@components/search-bar';
import { auth } from '@firebase-modules';
import styles from './styles.css';

const Navigation = () =>
  auth.currentUser() ? <PrivateLinks /> : <PublicLinks />;

const PrivateLinks = () => (
  <AppBar position="fixed" color="default" className={styles.AppBar}>
    <div className={styles.Logo} />
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
          color="secondary"
          type="button"
          onClick={auth.doSignOut}
        >
          Log Out
        </Button>
      </li>
      <li className={styles.SearchForm}>
        <SearchBar />
      </li>
      {auth.isAuth() && (
        <li className={styles.user_panel}>
          <img
            src={auth.currentUser().photoURL}
            className={styles.user_foto}
            alt="profile foto"
          />
        </li>
      )}
    </ul>
  </AppBar>
);

class PublicLinks extends Component {
  state = { loading: true };

  componentDidMount() {
    setTimeout(
      () =>
        this.setState({
          loading: false,
        }),
      1500,
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <AppBar position="fixed" color="inherit" className={styles.AppBar}>
        <div className={styles.Logo} />
        {loading && (
          <Loader type="ThreeDots" color="#00BFFF" height={40.5} width={120} />
        )}
        {!loading && (
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
            <li className={styles.SearchForm}>
              <SearchBar />
            </li>
          </ul>
        )}
      </AppBar>
    );
  }
}

export default withRouter(Navigation);
