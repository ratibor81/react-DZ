import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { SignUpLink } from './SignUpPage';
import { PasswordForgetLink } from './PasswordForgetPage';
import { auth } from '../../firebase';
import * as routes from '../../constants/routes';
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

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  state = { ...INITIAL_STATE };

  onSubmit = event => {
    const { email, password } = this.state;

    const { history } = this.props;

    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <form onSubmit={this.onSubmit} className={styles.SignInForm}>
        <input
          value={email}
          onChange={event =>
            this.setState(byPropKey('email', event.target.value))
          }
          type="text"
          placeholder="Email Address"
        />
        <input
          value={password}
          onChange={event =>
            this.setState(byPropKey('password', event.target.value))
          }
          type="password"
          placeholder="Password"
        />
        <button
          disabled={isInvalid}
          type="submit"
          className={styles.Form_Button}
        >
          Log In
        </button>

        {error && <p className={styles.Error_Message}>{error.message}</p>}
      </form>
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
