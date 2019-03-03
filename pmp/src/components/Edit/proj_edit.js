import React from 'react'

import { Form, Button, Card, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'

import { get_init_project } from '../../templates/project'

import { connect } from 'react-redux'
import { removeProj, updateProj } from '../../redux/actions'


class ProjectEditorList extends React.Component {
  add_proj = () => {
    this.props.updateProj(
        -1,  // new proj
        get_init_project()
    );
  }

  render = () => {
    let plist = [];
    for (let pid in this.props.projects) {
      if (!!this.props.projects[pid]) {  // not undefined
        plist.push(
          <ProjectEditor 
            key={pid}
            pid={pid}
            removeProj={this.props.removeProj}
            updateProj={this.props.updateProj}
            proj={this.props.projects[pid]}/>
        );
      }
    }

    return (
      <div>
        {plist}
        <Button className="float-right" onClick={this.add_proj}>
          Add Project <FontAwesomeIcon icon={faPlus} />
        </Button>

      </div>
    );
  }
};

class ProjectEditor extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = { show: false };
  }

  toggle = () => {
    this.setState(state => ({ ...state, show: !state.show }));
  }

  remove_proj = () => {
    if (window.confirm(`Are you sure to delete this project "${this.props.proj.title}"?`)) {
      this.props.removeProj(this.props.pid);
    }
  }

  update_field = (key, value_attr='value') => (event) => {
    this.props.updateProj(
      this.props.pid,
      { [key]: event.target[value_attr] }
    );
  }

  render = () => {
    let proj = this.props.proj;

    return (
  <div>
    <Card border="primary">
      <Card.Header as="h5">
        {proj.title || "<No title>"}
        <Button size="sm"
          className="float-right"
          onClick={this.toggle}>
          <FontAwesomeIcon  icon={this.state.show?faCaretUp:faCaretDown}/>
        </Button>
      </Card.Header>
    
      {this.state.show?
      <Card.Body>
        <Form>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>Title</Form.Label>
            <Col sm={10}>
              <Form.Control type="text"
                placeholder="Enter the title of the project"
                onChange={this.update_field("title")}
                value={proj.title}/>
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm={2}>Subtitle</Form.Label>
            <Col sm={10}>
              <Form.Control type="subtitle"
                placeholder="Enter the subtitle of the project"
                onChange={this.update_field("subtitle")}
                value={proj.subtitle}/>
            </Col>
          </Form.Group>

          <Form.Row>
          <Col>
          <Form.Group as={Row}>
            <Form.Label column sm={proj.is_ongoing?2:4}>Start Date</Form.Label>
            <Col sm={proj.is_ongoing?10:8}>
            <Form.Control type="date"
                onChange={this.update_field("start_date")}
                value={proj.start_date}/>
            </Col>
          </Form.Group>
          </Col>

          {proj.is_ongoing?null:
            <Col>
            <Form.Group as={Row}>
              <Form.Label column sm={4}>End Date</Form.Label>
              <Col sm={8}>
                <Form.Control type="date"
                    onChange={this.update_field("end_date")}
                    value={proj.end_date}/>
              </Col>
            </Form.Group>
            </Col>
          }
          </Form.Row>

          <Form.Group>
            <Form.Check inline label="Still Ongoing"
              onChange={this.update_field("is_ongoing", "checked")} 
              checked={proj.is_ongoing}/>
          </Form.Group> 

          <Form.Group>
            <Form.Label>Dimensions</Form.Label>
            <DimensionFrom dims={proj.dimensions}/>
          </Form.Group>

          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea"
              placeholder="Enter the description of the project (in markdown)"
              onChange={this.update_field("description")}
              value={proj.description} rows={10}/>
          </Form.Group>
        </Form>
        <Button variant="outline-danger" onClick={this.remove_proj}>
          Remove Project
        </Button>
      </Card.Body>:null}
    </Card>

    <br/>
  </div>
    );
  }
};

const DimensionFrom = ({ dims }) => (
    <div>
    {JSON.stringify(dims)}
    </div>
);


export default connect(
  state => ({ ...state }), 
  { updateProj, removeProj }
)(ProjectEditorList);

