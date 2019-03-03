import React from 'react';

import { AuthUserContext, withAuthorization } from '../Session'

const PublishPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
        <div>
          <p>Publish</p>
          <p>render iframe with swig </p>
          <PublishRender authUser={authUser}/>
        </div>
    )}
  </AuthUserContext.Consumer>
);

class PublishRender extends React.Component {
  render = () => {
    var str = JSON.stringify(this.props.authUser);
    return (
      <div>
        <p>{str}</p>
      </div>
    );
  };
};

const condition = user => !!user;

export default withAuthorization(condition)(PublishPage);
export { PublishRender };
