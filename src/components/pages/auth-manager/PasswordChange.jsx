import React, { Component } from 'react';
import ButtonForm from '@shared/button-form';

import { auth } from '@firebase-modules';
import styles from './styles.css';

class PasswordChangeForm extends Component {
  state = {
    passwordOne: '',
    passwordTwo: '',
    error: null,
  };

  onSubmit = event => {
    event.preventDefault();
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
    this.resetState();
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  resetState = () => {
    this.setState({
      passwordOne: '',
      passwordTwo: '',
      error: null,
    });
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
        <ButtonForm
          disabled={isInvalid}
          label="Update Password"
          text="Your password has been changed successfully"
        />

        {error && <p className={styles.Error_Message}>{error.message}</p>}
      </form>
    );
  }
}

export default PasswordChangeForm;
