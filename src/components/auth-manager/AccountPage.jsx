import React from 'react';

import AuthUserContext from '../../hoc/AuthUserContext';
import { PasswordForgetForm } from './PasswordForgetPage';
import PasswordChangeForm from './PasswordChange';
import withAuthorization from '../../hoc/withAuthorization';

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <h1>Account: {authUser.email}</h1>
        <PasswordForgetForm />
        <PasswordChangeForm />
      </div>
    )}
  </AuthUserContext.Consumer>
);

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(AccountPage);
