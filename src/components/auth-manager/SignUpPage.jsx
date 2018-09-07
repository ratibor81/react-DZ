import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import SnackBar from '../shared-ui/snackBar';
import { auth, db } from '../../firebase';

import * as routes from '../../constants/routes';
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
    isOpen: false,
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

  toggleSnackbar = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
      isOpen,
    } = this.state;
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
        <Button
          variant="raised"
          color="default"
          type="submit"
          disabled={isInvalid}
          className={styles.Form_Button}
          onClick={this.toggleSnackbar}
        >
          Sign Up
        </Button>
        <SnackBar
          open={isOpen}
          close={this.toggleSnackbar}
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
