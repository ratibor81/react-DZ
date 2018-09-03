import React, { Fragment } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { signUserOut } from '../../redux/actions-session';
import Button from '../shared-ui/button';
import * as routes from '../../constants/routes';

const styles = {
  list: {
    display: 'flex',
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  link: {
    display: 'block',
    padding: '8px',
    fontWeight: 500,
    textTransform: 'uppercase',
    fontSize: 20,
    textDecoration: 'none',
  },
  activeLink: { color: 'palevioletred' },
};

const PublicLinks = () => (
  <Fragment>
    <li>
      <NavLink
        to={routes.SIGN_IN}
        style={styles.link}
        activeStyle={styles.activeLink}
      >
        Sign in
      </NavLink>
    </li>
    <li>
      <NavLink
        to={routes.SIGN_UP}
        style={styles.link}
        activeStyle={styles.activeLink}
      >
        Sign up
      </NavLink>
    </li>
  </Fragment>
);

const PrivateLinks = ({ onSignOut }) => (
  <Fragment>
    <li>
      <Button label="Logout" onClick={onSignOut} />
    </li>
  </Fragment>
);

const AuthManager = ({ authenticated, signOut }) => (
  <ul style={styles.list}>
    {authenticated ? <PrivateLinks onSignOut={signOut} /> : <PublicLinks />}
  </ul>
);

PrivateLinks.propTypes = {
  onSignOut: PropTypes.func.isRequired,
};

AuthManager.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired,
};

const mstp = state => ({
  authenticated: state.userSession.authenticated,
});

const mdtp = { signOut: signUserOut };

export default compose(
  withRouter,
  connect(
    mstp,
    mdtp,
  ),
)(AuthManager);
