const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const swig = require('swig');
const showdown = require('showdown'),
      converter = new showdown.Converter();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const err_msg = "ERROR: please check your theme or contact the developer.";
const render = (theme, data) => {
  // console.log(data);
  for (let pid in data.projects)
    data.projects[pid].description = converter.makeHtml(data.projects[pid].description);
  // console.log(data);
  return swig.render(theme, { locals: data });
}

exports.render = functions.https.onRequest((request, response) => {
  let data_path = `/users/${request.query.uid}/data/`;
  let theme_path = "/themes/default";
  // console.log(path);

  admin.database().ref(data_path)
    .once('value')
    .then(snapshot => {
      // console.log(snapshot.val());
      let data = snapshot.val();
      if (!data) { reponse.send(err_msg); return; }
      let theme = data.theme;

      if (!theme) {
        // load default theme
        admin.database().ref(theme_path)
          .once('value')
          .then(snapshot => {
            theme = snapshot.val();
            
            response.send(render(theme, data));
          })
        .catch(error => {
          // console.log('theme read error');
          response.send(err_msg);
          return;
        });
      }
      else {
        // console.log('user read error');
        response.send(render(theme, data));
      }
    })
    .catch(error => {
      // console.log('user read error');
      response.send(err_msg);
    });
  // response.send({ text: 'helloWorld' });
});
