import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

import { init_user_data } from '../../templates/project'

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};


class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
    this.googleProvider = new app.auth.GoogleAuthProvider();
  }

  doSignInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider);

  doSignOut = () =>
    this.auth.signOut();


  // database
  user = uid => this.db.ref(`users/${uid}`);

  // on User change
  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();

            // initialize users
            if (dbUser == null) {
              // new users
              return this.user(authUser.uid)
                .set({
                  email: authUser.email,
                  username: authUser.displayName,
                  data: init_user_data 
                }).then(() => this.user(authUser.uid).once('value'))
            }
            else
              return this.user(authUser.uid).once('value')
          })
        .then(snapshot => {
          const dbUser = snapshot.val();
          authUser = {...dbUser, uid: authUser.uid};
          next(authUser);
        });
      } else {
        fallback();
      }
    });

}

export default Firebase;
