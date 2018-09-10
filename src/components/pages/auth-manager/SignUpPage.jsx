import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as routes from '@constants/routes';
import ButtonForm from '@shared/button-form';
import { auth, db } from '../../../firebase';

import styles from './styles.css';

const SignUpPage = ({ history }) => (
  <div className={styles.SignUpPage}>
    <div className={styles.SignUpForm}>
      <h1>Sign Up</h1>
      <SignUpForm history={history} />
    </div>
  </div>
);

class SignUpForm extends Component {
  state = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
  };

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;
    const { history } = this.props;
    const { state } = this;

    auth
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your own accessible Firebase Database too
        db.doCreateUser(authUser.user.uid, username, email)
          .then(() => {
            this.setState({ ...state });
            history.push(routes.HOME);
          })
          .catch(error => {
            this.setState({ error });
          });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
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
          name="username"
          type="text"
          placeholder="Full Name"
          onChange={this.handleChange}
        />
        <input
          value={email}
          name="email"
          type="text"
          placeholder="Email Address"
          onChange={this.handleChange}
        />
        <input
          value={passwordOne}
          name="passwordOne"
          type="password"
          placeholder="Password"
          onChange={this.handleChange}
        />
        <input
          value={passwordTwo}
          name="passwordTwo"
          type="password"
          placeholder="Confirm Password"
          onChange={this.handleChange}
        />
        <ButtonForm
          disabled={isInvalid}
          label="Sign Up"
          text="Congratulations! You have successfully registered"
        />

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
