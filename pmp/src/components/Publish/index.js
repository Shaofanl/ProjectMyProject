import React from 'react';

import { AuthUserContext, withAuthorization } from '../Session'
// import { withFirebase } from '../Firebase'
// import request from 'request'

import Iframe from 'react-iframe'

const PublishPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
        <div>
          {/*<p>Publish</p>
          <p>render iframe with swig </p>*/}
          <PublishRender authUser={authUser}/>
        </div>
    )}
  </AuthUserContext.Consumer>
);

class PublishRender extends React.Component {
  render = () => {
    let url = `https://us-central1-${process.env.REACT_APP_PROJECT_ID}.cloudfunctions.net/render?uid=${this.props.authUser.uid}`;

    console.log(url);
    return (
      <div style={{height:"100%"}}>
        <a href={url}>{url}</a>
        {/*<TestButton uid={this.props.authUser.uid}/>*/}
        <Iframe  className="border border-primary rounded" url={url} width="100%" height="80vh"/>
      </div>
    );
  };
};

/*
class TestButtonBase extends React.Component {
  get_mes = () =>{
  // not working
    this.props.firebase
      .functions
      .httpsCallable('render')
        ({uid: 'here'})
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
  // use iframe to replace
    let url = `https://us-central1-${process.env.REACT_APP_PROJECT_ID}.cloudfunctions.net/render?uid=${this.props.uid}`;
    console.log(url)
      request({method: 'GET', uri:url},
          function(err, res, body) {
            console.log('err', err);
            console.log('res', err);
            console.log('body', err);
          });
  }

  render = () => (
      <button onClick={this.get_mes}>
      asdf
      </button>
  );
}
const TestButton = withFirebase(TestButtonBase);
*/

const condition = user => !!user;

export default withAuthorization(condition)(PublishPage);
export { PublishRender };
