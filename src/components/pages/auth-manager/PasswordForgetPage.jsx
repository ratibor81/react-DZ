import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ButtonForm from '@shared/button-form';

import * as routes from '@constants/routes';
import { auth } from '../../../firebase';
import styles from './styles.css';

const PasswordForgetPage = () => (
  <div className={styles.ResetPage}>
    <div className={styles.PasswordForgetForm}>
      <h1>Reset Password</h1>
      <PasswordForgetForm />
    </div>
  </div>
);

class PasswordForgetForm extends Component {
  state = {
    email: '',
    error: null,
  };

  onSubmit = event => {
    const { email } = this.state;
    const { state } = this;

    auth
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...state });
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
    const { email, error } = this.state;

    const isInvalid = email === '';

    return (
      <form onSubmit={this.onSubmit} className={styles.ResetForm}>
        <input
          value={email}
          name="email"
          type="text"
          placeholder="Email Address"
          onChange={this.handleChange}
        />
        <ButtonForm
          disabled={isInvalid}
          label="Reset My Password"
          text="Please, check your email for password change message"
        />

        {error && <p className={styles.Error_Message}>{error.message}</p>}
      </form>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={routes.PASSWORD_FORGET} className={styles.PasswordForgetLink}>
      Forgot Password?
    </Link>
  </p>
);

export default PasswordForgetPage;

export { PasswordForgetForm, PasswordForgetLink };