// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { isUserAuthenticated } from '../redux/selectors';

// const withAuthCheck = WrappedComponent => {
//   class WithAuthCheck extends Component {
//     componentDidMount() {
//       this.checkAuthentication();
//     }

//     componentDidUpdate() {
//       this.checkAuthentication();
//     }

//     checkAuthentication = () => {
//       const { authenticated } = this.props;
//       if (!authenticated) return;

//       const { from } = this.props.location.state || { from: { pathname: '/' } };

//       this.props.history.replace(from);
//     };

//     render() {
//       return <WrappedComponent {...this.props} />;
//     }
//   }

//   const mapStateToProps = state => ({
//     authenticated: isUserAuthenticated(state),
//   });

//   return connect(mapStateToProps)(WithAuthCheck);
// };

// export default withAuthCheck;
