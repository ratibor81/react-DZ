import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as routes from '@constants/routes';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebaseui from 'firebaseui';
import firebase from 'firebase/app';
import styles from './styles.css';

class SignInPage extends Component {
  uiConfig = {
    signInFlow: 'popup',
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => {
        const { history } = this.props;
        history.push(routes.HOME);
      },
    },
  };

  render() {
    return (
      <div className={styles.SignInPage}>
        <StyledFirebaseAuth
          uiConfig={this.uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    );
  }
}
SignInPage.propTypes = {
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(SignInPage);
