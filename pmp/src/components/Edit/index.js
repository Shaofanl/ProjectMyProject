import React from 'react';

import { AuthUserContext, withAuthorization } from '../Session'
import { /* Alert, */ Tab, Button, Row, Col, Nav} from 'react-bootstrap'

import { connect } from 'react-redux'

import ProjectEditorList from './proj_edit'
import DimensionEditorList from './dim_edit'
import ThemeEditor from './theme_edit'


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
      .update({ data: this.props.data, 
        // theme: this.props.data.theme?this.props.data.theme:default_theme
      })
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
      {/*<p>{JSON.stringify(this.props.data)}</p>*/}

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
                  <Nav.Link eventKey="Theme" className="text-right">Theme</Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Button
                    onClick={this.submit_all(authUser.uid)}
                    variant="outline-success"
                    className="float-right w-100 text-right">
                    Save All
                  </Button>
                </Nav.Item>

                <Nav.Item>
                  <Button
                    disabled
                    variant="outline-danger" className="float-right w-100 text-right">
                    Reset (in dev)
                  </Button>
                </Nav.Item>

              </Nav>
            </Col>

            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="Projects">
                  <ProjectEditorList/>
                </Tab.Pane>

                <Tab.Pane eventKey="Dimensions">
                  <DimensionEditorList/>
                </Tab.Pane>

                <Tab.Pane eventKey="Theme">
                  <ThemeEditor/>
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
