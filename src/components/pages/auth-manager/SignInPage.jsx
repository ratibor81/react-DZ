import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as routes from '@constants/routes';
import ButtonForm from '@shared/button-form';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import { SignUpLink } from './SignUpPage';
import { PasswordForgetLink } from './PasswordForgetPage';
import { auth } from '../../../firebase';
import styles from './styles.css';

const SignInPage = ({ history }) => (
  <div className={styles.LogInPage}>
    <div className={styles.LogInForm}>
      <h1>Log In</h1>
      <SignInForm history={history} />
      <PasswordForgetLink />
    </div>
    <SignUpLink />
  </div>
);

class SignInForm extends Component {
  uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => {
        const { history } = this.props;
        history.push(routes.HOME);
      },
    },
  };

  state = {
    email: '',
    password: '',
    error: null,
  };

  onSubmit = event => {
    const { email, password } = this.state;
    const { state } = this;
    const { history } = this.props;

    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...state });
        history.push(routes.HOME);
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
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <div>
        <form onSubmit={this.onSubmit} className={styles.SignInForm}>
          <input
            value={email}
            name="email"
            type="text"
            placeholder="Email Address"
            onChange={this.handleChange}
          />
          <input
            value={password}
            name="password"
            type="password"
            placeholder="Password"
            onChange={this.handleChange}
          />
          <ButtonForm
            disabled={isInvalid}
            label="Log In"
            text="You are logged in successfully"
          />

          {error && <p className={styles.Error_Message}>{error.message}</p>}
        </form>
        <StyledFirebaseAuth
          uiConfig={this.uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    );
  }
}
SignInPage.propTypes = {
  history: PropTypes.objectOf(Object).isRequired,
};
SignInForm.propTypes = {
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(SignInPage);

export { SignInForm };
