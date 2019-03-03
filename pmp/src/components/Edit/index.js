import React from 'react';

import { AuthUserContext, withAuthorization } from '../Session'
import { /* Alert, */ Tab, Button, Row, Col, Nav} from 'react-bootstrap'

import { connect } from 'react-redux'

import ProjectEditor from './proj_edit'
import DimensionEditor from './dim_edit'


class Edit extends React.Component {
  constructor(props) {
    super(props);

    this.state = { flash: null, flash_type: "danger" };
  }

//flash_message = (msg, type) => {
//  this.setState({ flash: msg, flash_type: type });
//}

  submit_all = uid => () => {
//  this.setState({ flash:null });
//    console.log(this.props);
    this.props.firebase.user(uid)
      .update({ data: this.props.data })
      .then(() => {
        alert("Submitted!");
      })
      .catch(error => {
        alert("Error! "+error.message);
      });
//  this.flash_message("Submitted!", "success");
  }

//    {!!this.state.flash && <Alert variant={this.state.flash_type}
//        dismissible>{this.state.flash}</Alert>} 

  render = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>

        <p>Edit</p>
        <Tab.Container defaultActiveKey="Projects">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="Projects" className="text-right">Projects</Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link eventKey="Dimensions" className="text-right">Dimensions</Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link eventKey="Theme" className="text-right" disabled>Theme</Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Button
                    onClick={this.submit_all(authUser.uid)}
                    variant="outline-success"
                    className="float-right w-100 text-right">
                    Submit All
                  </Button>
                </Nav.Item>

                <Nav.Item>
                  <Button variant="outline-danger" className="float-right w-100 text-right">
                    Reset
                  </Button>
                </Nav.Item>

              </Nav>
            </Col>

            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="Projects">
                  <ProjectEditor/>
                </Tab.Pane>

                <Tab.Pane eventKey="Dimensions">
                  <DimensionEditor/>
                </Tab.Pane>

                <Tab.Pane eventKey="Theme">
                </Tab.Pane>

              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>

      </div>
    )}
  </AuthUserContext.Consumer>
  );
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(
    connect(
      state => ({ data: state }),
      null,
    )(Edit)
);
