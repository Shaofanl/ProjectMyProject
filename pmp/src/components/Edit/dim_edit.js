import React from 'react'

import { connect } from 'react-redux'
import { Button, Card, Form, Col } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import { removeDim, updateDim } from '../../redux/actions'


class DimensionEditorList extends React.Component {
  get_updator = (did) => (event) => {
    this.props.updateDim(did, event.target.value);
  }
  
//get_remover = (did) => {
//  let that = this;
//  return () => {
//  that.props.removeDim(did);
//  }
//}

  get_remover = (did) => (() => {
    this.props.removeDim(did);
  });

  render = () => {
    return (
      <div>
      <Card>
        <Card.Header> {"Dimensions"} </Card.Header>

        <Card.Body>
          {this.props.dimensions?
            Object.keys(this.props.dimensions).map(did =>
              <DimensionEditor
                updator={this.get_updator(did)}
                remover={this.get_remover(did)}
                dim={this.props.dimensions[did]}
                key={did}
                did={did}/>):
            <p>No dimensions</p>
          }

          <Button size="sm"
            onClick={this.get_updator(-1)}
            variant="outline-success" className="float-right">
            <FontAwesomeIcon icon={faPlus}/>
          </Button>

        </Card.Body>
      </Card>
      </div>
    );
  }
};

class DimensionEditor extends React.Component {

  render = () => {
    return (
        <div>
          <Form.Group>
            <Form.Row>
              <Col sm={11}>
                <Form.Control
                  onChange={this.props.updator}
                  type="text" value={this.props.dim}/>
              </Col>
              <Col sm={1}  className="m-auto">
                <Button
                  onClick={this.props.remover}
                  size="sm" variant="outline-danger">
                  <FontAwesomeIcon icon={faTrashAlt}/>
                </Button>
              </Col>
            </Form.Row>
          </Form.Group>

        </div>
    );
  }
};


export default connect(
  state => ({ dimensions: state.dimensions }), 
  { updateDim, removeDim }
)(DimensionEditorList);
