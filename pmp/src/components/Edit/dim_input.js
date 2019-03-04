import React from 'react'

import { connect } from 'react-redux'
import { Form, InputGroup } from 'react-bootstrap'


class DimensionInputList extends React.Component {
  get_dim_updator = (dname, override_data=undefined) => event => {
    this.props.updateProj(
      this.props.pid,
      { dimensions: {
          ...this.props.dims,
          [dname]: override_data!==undefined?override_data:event.target.value
        }
      }
    );
  }

  render = () => {
    return (
      <div>
        <p>{JSON.stringify(this.props.dims)}</p>
        {
          Object.keys(this.props.dimensions).map(did => 
            <DimensionInput
              key={did}
              dname={this.props.dimensions[did]}
              updator={this.get_dim_updator(did)}
              dim={this.props.dims?this.props.dims[did]:""}/>
        )}
      </div>
    );
  }
}

class DimensionInput extends React.Component {

  render = () => {
    return (
      <Form.Group>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>{this.props.dname}</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            onChange={this.props.updator}
            type="text" value={this.props.dim}/>
        </InputGroup>
      </Form.Group>
    );
  }
};

export default connect(
  state => ({ dimensions: state.dimensions }),
  null
)(DimensionInputList);
