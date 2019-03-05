import React from 'react';

import { connect } from 'react-redux';
import { Form } from 'react-bootstrap'
import { updateTheme } from '../../redux/actions'


class ThemeEditor extends React.Component {
  update_theme_wrapper = (event) => {
    this.props.updateTheme(event.target.value);
  }

  render = () => {
    return (
        <Form.Group>
          <Form.Label>Theme Tutorial is coming (leave TOTALLY BLANK for default theme):</Form.Label>
          <Form.Control
            onChange={this.update_theme_wrapper}
            as="textarea" value={this.props.theme} style={{height:"40vh"}}/>
        </Form.Group>
    );
  }


}

export default connect(
    state => ({ theme: state.theme }),
    { updateTheme }
)(ThemeEditor);
