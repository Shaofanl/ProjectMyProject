import React from 'react';
import * as ROUTES from '../../constants/routes'
import './signin.css'

import {Form, Button, Alert} from 'react-bootstrap'
import {compose} from 'recompose'
import {withRouter} from 'react-router-dom'
import {withFirebase} from "../Firebase"

// import png_normal from "../../assets/btn_google_signin_light_normal_web.png"

const SignInPage = () => (
  <div>
    <SignInGoogle/>
  </div>
);

class SignInGoogleBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {error: null};
  }

  onSubmit = event => {
    this.props.firebase.doSignInWithGoogle()
      .then(() => {
        this.setState({error:null});
        this.props.history.push(ROUTES.EDIT);
      })
      .catch(error => {
        this.setState({error});
      })

    event.preventDefault();
  }

  render() {
    const {error} = this.state;

    return (
      <Form onSubmit={this.onSubmit}>
        {error && <Alert variant={"danger"} dismissible>{error.message}</Alert>}
        <Button type="submit"> Sign In with Google </Button>
      </Form>
    )
  }
}

const SignInGoogle = compose(
  withRouter,
  withFirebase,
)(SignInGoogleBase);


export default (SignInPage);
