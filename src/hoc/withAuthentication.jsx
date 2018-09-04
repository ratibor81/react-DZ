import React, { Component } from 'react';
import AuthUserContext from './AuthUserContext';
import { firebase } from '../firebase';

const withAuthentication = WrappedComponent =>
  class WithAuthentication extends Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: null,
      };
    }

    componentDidMount() {
      firebase.auth.onAuthStateChanged(
        authUser =>
          authUser
            ? this.setState({ authUser })
            : this.setState({ authUser: null }),
      );
    }

    render() {
      const { authUser } = this.state;

      return (
        <AuthUserContext.Provider value={authUser}>
          <WrappedComponent {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  };
export default withAuthentication;
