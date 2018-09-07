import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import SnackBar from '../shared-ui/snackBar';

import { auth } from '../../firebase';
import styles from './styles.css';

class PasswordChangeForm extends Component {
  state = {
    passwordOne: '',
    passwordTwo: '',
    error: null,
    isOpen: false,
  };

  onSubmit = event => {
    const { passwordOne } = this.state;
    const { state } = this;

    auth
      .doPasswordUpdate(passwordOne)
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
    const { passwordOne, passwordTwo, error, isOpen } = this.state;

    const isInvalid = passwordOne !== passwordTwo || passwordOne === '';

    return (
      <form onSubmit={this.onSubmit} className={styles.ChangePassForm}>
        <input
          value={passwordOne}
          name="passwordOne"
          type="password"
          placeholder="New Password"
          onChange={this.handleChange}
        />
        <input
          value={passwordTwo}
          name="passwordTwo"
          type="password"
          placeholder="Confirm New Password"
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
          Update Password
        </Button>
        <SnackBar
          open={isOpen}
          close={this.toggleSnackbar}
          text="Your password has been changed successfully"
        />
        {error && <p className={styles.Error_Message}>{error.message}</p>}
      </form>
    );
  }
}

export default PasswordChangeForm;
