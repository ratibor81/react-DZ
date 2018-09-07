import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

import { auth } from '../../firebase';
import styles from './styles.css';

class PasswordChangeForm extends Component {
  state = {
    passwordOne: '',
    passwordTwo: '',
    error: null,
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

  render() {
    const { passwordOne, passwordTwo, error } = this.state;

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
        >
          Update Password
        </Button>

        {error && <p className={styles.Error_Message}>{error.message}</p>}
      </form>
    );
  }
}

export default PasswordChangeForm;
