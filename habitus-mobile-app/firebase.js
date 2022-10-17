// firebase.js
// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/firestore';
// import 'firebase/storage';
// const fire = firebase.initializeApp({
//     apiKey: "AIzaSyCSVU78TQO30K5S3eufjMUZxq3mZBLo31I",
//     authDomain: "habitus-9d576.firebaseapp.com",
//     projectId: "habitus-9d576",
//     storageBucket: "habitus-9d576.appspot.com",
//     messagingSenderId: "31005261503",
//     appId: "1:31005261503:web:0c99ff70719969b244100a",
//   });
// export const auth = fire.auth();
// export const db = fire.firestore();
// export default {
//     fire,
// };

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCSVU78TQO30K5S3eufjMUZxq3mZBLo31I",
    authDomain: "habitus-9d576.firebaseapp.com",
    projectId: "habitus-9d576",
    storageBucket: "habitus-9d576.appspot.com",
    messagingSenderId: "31005261503",
    appId: "1:31005261503:web:0c99ff70719969b244100a"
};

// let app;

// if (firebase.apps.length === 0) {
//   app = firebase.initializeApp(firebaseConfig)
// } else {
//   app = firebase.app();
// }

// const db = app.firestore();
// const auth = firebase.auth();

const fire = firebase.initializeApp(firebaseConfig);

export const auth = fire.auth();
export const db = fire.firestore();
export default {
  fire,
};

// export { db, auth, app };