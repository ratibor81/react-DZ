import React from 'react';

import { auth } from '../../firebase';
import styles from './styles.css';

const SignOutButton = () => (
  <button
    type="button"
    onClick={auth.doSignOut}
    className={styles.SignOut_Button}
  >
    Sign Out
  </button>
);

export default SignOutButton;
