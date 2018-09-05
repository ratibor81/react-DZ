import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { auth, db } from '../../firebase';

import * as routes from '../../constants/routes';
import styles from './styles.css';

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const SignUpPage = ({ history }) => (
  <div className={styles.SignUpPage}>
    <div className={styles.SignUpForm}>
      <h1>Sign Up</h1>
      <SignUpForm history={history} />
    </div>
  </div>
);

class SignUpForm extends Component {
  state = { ...INITIAL_STATE };

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;
    const { history } = this.props;

    auth
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your own accessible Firebase Database too
        db.doCreateUser(authUser.user.uid, username, email)
          .then(() => {
            this.setState({ ...INITIAL_STATE });
            history.push(routes.HOME);
          })
          .catch(error => {
            this.setState(byPropKey('error', error));
          });
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  };

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';
    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={username}
          onChange={event =>
            this.setState(byPropKey('username', event.target.value))
          }
          type="text"
          placeholder="Full Name"
        />
        <input
          value={email}
          onChange={event =>
            this.setState(byPropKey('email', event.target.value))
          }
          type="text"
          placeholder="Email Address"
        />
        <input
          value={passwordOne}
          onChange={event =>
            this.setState(byPropKey('passwordOne', event.target.value))
          }
          type="password"
          placeholder="Password"
        />
        <input
          value={passwordTwo}
          onChange={event =>
            this.setState(byPropKey('passwordTwo', event.target.value))
          }
          type="password"
          placeholder="Confirm Password"
        />
        <button
          disabled={isInvalid}
          type="submit"
          className={styles.SignUp_Button}
        >
          Sign Up
        </button>

        {error && <p className={styles.Error_Message}>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => (
  <p className={styles.SignUpLink_text}>
    Dont have an account?
    <Link to={routes.SIGN_UP} className={styles.SignUpLink}>
      Sign Up
    </Link>
  </p>
);

SignUpPage.propTypes = {
  history: PropTypes.objectOf(Object).isRequired,
};
SignUpForm.propTypes = {
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(SignUpPage);

export { SignUpForm, SignUpLink };
