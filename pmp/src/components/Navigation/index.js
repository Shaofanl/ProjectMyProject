import React from 'react';
import { NavLink } from 'react-router-dom';

import * as ROUTES from '../../constants/routes'
import {Navbar, Nav} from 'react-bootstrap';
import { AuthUserContext } from '../Session'
import {withFirebase} from "../Firebase"
import {compose} from 'recompose';
import {withRouter} from 'react-router-dom';


const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser? (<NavigationAuth />): (<NavigationNonAuth/>)
      }
    </AuthUserContext.Consumer>
  </div>
);

const PlaceToGo = ({route, text}) => (
  <Nav.Item>
    <NavLink exact to={route} activeClassName="active" className="nav-link">
      {text}
    </NavLink>
  </Nav.Item>
);

class NavigationAuthBase extends React.Component {
  logout = () => {
    this.props.firebase.doSignOut();
    this.props.history.push(ROUTES.EDIT);
  }

  render = () => (
    <Navbar variant="light" bg="light" expand="lg">
      <Navbar.Brand href="#home">PMP</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <PlaceToGo route={ROUTES.LANDING} text={"Home"}/>
          <PlaceToGo route={ROUTES.EDIT} text={"Edit"}/>
          <PlaceToGo route={ROUTES.PUBLISH} text={"Publish"}/>
          <Nav.Link onClick={this.logout}>Sign Out </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
const NavigationAuth = compose(withRouter, withFirebase)(NavigationAuthBase);


const NavigationNonAuth = () => (
    <Navbar variant="light" bg="light" expand="lg">
    <Navbar.Brand href="#home">PMP</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <PlaceToGo route={ROUTES.LANDING} text={"Home"}/>
        <PlaceToGo route={ROUTES.SIGN_IN} text={"Sign In"}/>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Navigation;
