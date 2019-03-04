import React from 'react'

import { Form, Button, ButtonToolbar, Card, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { // faEye, faEyeSlash,
          faTrashAlt, faPlus,
          faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'

// import { get_init_project } from '../../templates/project'

import { connect } from 'react-redux'
import { removeProj, updateProj } from '../../redux/actions'
import DimensionInput from './dim_input'


class ProjectEditorList extends React.Component {
  add_proj = () => {
    this.props.updateProj(
        -1,  // new proj
        null
    );
  }

  show_all = () => {
  }

  hide_all = () => {
  }

  render = () => {
    let plist = [];
    for (let pid in this.props.projects) {
      if (Object.keys(this.props.projects[pid]).length !== 0) {  // not undefined
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

        <ButtonToolbar className="float-right" >
          { /*<Button
            className="mr-1"
            variant="outline-info" onClick={this.show_all}>
            Show All <FontAwesomeIcon icon={faEye} />
          </Button>
          <Button
            className="mr-1"
            variant="outline-info" onClick={this.hide_all}>
            Hide All <FontAwesomeIcon icon={faEyeSlash} />
          </Button>*/}
          <Button variant="outline-success" onClick={this.add_proj}>
            Add Project <FontAwesomeIcon icon={faPlus} />
          </Button>
        </ButtonToolbar>

      </div>
    );
  }
};

class ProjectEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = { show: true };
  }

  toggle = () => {
    this.setState(state => ({ ...state, show: !state.show }));
  }

  remove_proj = () => {
    if (window.confirm(`Are you sure to delete this project "${this.props.proj.title}"?`)) {
      this.props.removeProj(this.props.pid);
    }
  }

  get_updator = (key, value_attr='value') => (event) => {
    this.props.updateProj(
      this.props.pid,
      { [key]: event.target[value_attr] }
    );
  }

  render = () => {
    let proj = this.props.proj;

    return (
  <div>
    <p>{JSON.stringify(proj)}</p>
    <Card border="primary">
      <Card.Header as="h5">
        {proj.title || "<No title>"}
        <Button
          variant="outline-danger"
          size="sm"
          className="float-right ml-1"
          onClick={this.remove_proj}>
          <FontAwesomeIcon icon={faTrashAlt}/>
        </Button>

        <Button size="sm"
          variant="outline-secondary"
          className="float-right"
          onClick={this.toggle}>
          <FontAwesomeIcon  icon={this.state.show?faCaretUp:faCaretDown}/>
        </Button>

      </Card.Header>
    
      {this.state.show?
      <Card.Body>
        <Form>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>Title:</Form.Label>
            <Col sm={10}>
              <Form.Control type="text"
                placeholder="Enter the title of the project"
                onChange={this.get_updator("title")}
                value={proj.title}/>
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm={2}>Subtitle:</Form.Label>
            <Col sm={10}>
              <Form.Control type="subtitle"
                placeholder="Enter the subtitle of the project"
                onChange={this.get_updator("subtitle")}
                value={proj.subtitle}/>
            </Col>
          </Form.Group>

          <Form.Row>
          <Col>
          <Form.Group as={Row}>
            <Form.Label column sm={proj.is_ongoing?2:4}>Start Date:</Form.Label>
            <Col sm={proj.is_ongoing?10:8}>
            <Form.Control type="date"
                onChange={this.get_updator("start_date")}
                value={proj.start_date}/>
            </Col>
          </Form.Group>
          </Col>

          {proj.is_ongoing?null:
            <Col>
            <Form.Group as={Row}>
              <Form.Label column sm={4}>End Date:</Form.Label>
              <Col sm={8}>
                <Form.Control type="date"
                    onChange={this.get_updator("end_date")}
                    value={proj.end_date}/>
              </Col>
            </Form.Group>
            </Col>
          }
          </Form.Row>

          <Form.Group>
            <Form.Check inline label="Still Ongoing"
              onChange={this.get_updator("is_ongoing", "checked")} 
              checked={proj.is_ongoing}/>
          </Form.Group> 

          <Form.Group>
            <Form.Label>Dimensions (split with ";"):</Form.Label>
            <DimensionInput
              updateProj={this.props.updateProj}
              dims={proj.dimensions} pid={this.props.pid}/>
          </Form.Group>

          <Form.Group>
            <Form.Label>Description:</Form.Label>
            <Form.Control as="textarea"
              placeholder="Enter the description of the project (in markdown)"
              onChange={this.get_updator("description")}
              value={proj.description} rows={10}/>
          </Form.Group>
        </Form>

      </Card.Body>:null}
    </Card>

    <br/>
  </div>
    );
  }
};


export default connect(
  state => ({ ...state }), 
  { updateProj, removeProj }
)(ProjectEditorList);
