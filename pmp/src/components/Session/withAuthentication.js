import React from 'react'

import AuthUserContext from './context'
import { withFirebase } from "../Firebase"

import { connect } from 'react-redux'
import { fillData } from '../../redux/actions'

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: JSON.parse(localStorage.getItem('authUser'))
      };
    }

    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
          // login
          localStorage.setItem('authUser', JSON.stringify(authUser));
          this.props.fillData(authUser.data);
          this.setState({authUser});
        },
        () => {
          // logout
          localStorage.removeItem('authUser');
          this.setState({authUser: null});
        }
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }

  return withFirebase(
      connect(
        null,
        {fillData}
      )(WithAuthentication)
  );
}

export default withAuthentication;
