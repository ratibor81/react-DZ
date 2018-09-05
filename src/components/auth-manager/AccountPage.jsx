import React from 'react';

import AuthUserContext from '../../hoc/AuthUserContext';
import { PasswordForgetForm } from './PasswordForgetPage';
import PasswordChangeForm from './PasswordChange';
import withAuthorization from '../../hoc/withAuthorization';

import styles from './styles.css';

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div className={styles.AccountPage}>
        <h1 className={styles.Account_Header}>
          Your Account:
          <span className={styles.User_email}>{authUser.email}</span>
        </h1>
        <div className={styles.AccountPageForms}>
          <div className={styles.AccountPassForm}>
            <h1>Change Password</h1>
            <PasswordChangeForm />
          </div>
          <div className={styles.AccountPassForm}>
            <h1>Reset Password</h1>
            <PasswordForgetForm />
          </div>
        </div>
      </div>
    )}
  </AuthUserContext.Consumer>
);

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(AccountPage);
