import './index.css';

import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// routes
import * as ROUTES from '../../constants/routes';

// pages
import LandingPage from '../Landing';
import SignInPage from '../SignIn';
import EditPage from '../Edit';
import PublishPage from "../Publish";
import Navigation from '../Navigation';

// bootstrap
import {Container,Row,Col} from 'react-bootstrap'
import withAuthentication from "../Session/withAuthentication"

const App = () => (
  <Router>
    <div>
      <Navigation/>

      <Container>
        <Row className="justify-content-center">
          <Col>
            <hr/>

            <Route exact path={ROUTES.LANDING} component={LandingPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />

            <Route path={ROUTES.EDIT} component={EditPage} />
            <Route path={ROUTES.PUBLISH} component={PublishPage} />
          </Col>
        </Row>
      </Container>
    </div>
  </Router>
);

export default withAuthentication(App);
