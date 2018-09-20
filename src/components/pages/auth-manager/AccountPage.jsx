import React from 'react';
import Card from '@material-ui/core/Card';
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
          <span className={styles.User_email}>
            {authUser.email || authUser.displayName}
          </span>
        </h1>
        <Card className={styles.AccountPassForm}>
          <h1>Change Password</h1>
          <PasswordChangeForm />
        </Card>
      </div>
    )}
  </AuthUserContext.Consumer>
);

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(AccountPage);
