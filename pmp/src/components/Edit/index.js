import React from 'react';

import { AuthUserContext, withAuthorization } from '../Session'

const Edit = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <p>Edit</p>
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Edit);