import React from 'react';

import AuthUserContext from '@hoc/AuthUserContext';
import withAuthorization from '@hoc/withAuthorization';
import PasswordChangeForm from './PasswordChange';

import styles from './styles.css';

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div className={styles.AccountPage}>
        <h1 className={styles.Account_Header}>
          Your Account:
          <span className={styles.User_email}>{authUser.email}</span>
        </h1>
        <div className={styles.AccountPassForm}>
          <h1>Change Password</h1>
          <PasswordChangeForm />
        </div>
      </div>
    )}
  </AuthUserContext.Consumer>
);

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(AccountPage);
