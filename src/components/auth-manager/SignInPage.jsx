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

class SignInForm extends Component {
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
