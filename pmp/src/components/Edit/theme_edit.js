import React from 'react';

import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap'
import { updateTheme } from '../../redux/actions'

import theme_default from '../../templates/theme.js'

class ThemeEditor extends React.Component {
  update_theme_wrapper = (event) => {
    this.props.updateTheme(event.target.value);
  }
  
  update_to_default = () => {
    this.props.updateTheme(theme_default);
  }

  render = () => {
    return (
        <div>
        <Form.Group>
          <Form.Label>Theme Tutorial is coming (leave TOTALLY BLANK for default theme):</Form.Label>
          <Form.Control
            onChange={this.update_theme_wrapper}
            as="textarea" value={this.props.theme} style={{height:"40vh"}}/>
        </Form.Group>
          <Button className="btn btn-primary" onClick={this.update_to_default}>
            Load Default
          </Button>
        </div>
    );
  }


}

export default connect(
    state => ({ theme: state.theme }),
    { updateTheme }
)(ThemeEditor);
