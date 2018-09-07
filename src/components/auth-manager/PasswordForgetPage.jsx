import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import { auth } from '../../firebase';
import * as routes from '../../constants/routes';
import styles from './styles.css';
import SnackBar from '../shared-ui/snackBar';

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
    isOpen: false,
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

  toggleSnackbar = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  };

  render() {
    const { email, error, isOpen } = this.state;

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
        <Button
          variant="raised"
          color="default"
          type="submit"
          disabled={isInvalid}
          className={styles.Form_Button}
          onClick={this.toggleSnackbar}
        >
          Reset My Password
        </Button>
        <SnackBar
          open={isOpen}
          close={this.toggleSnackbar}
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
