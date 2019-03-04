import React from 'react'

import { connect } from 'react-redux'


class DimensionInputList extends React.Component {
  render = () => {
    return (
      <div>
        <p>{JSON.stringify(this.props)}</p>
      </div>
    );
  }
}

class DimensionsInput extends React.Component {
};

export default connect(
  state => ({ dimensions: state.dimensions }),
  null
)(DimensionInputList);
