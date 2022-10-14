import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCSVU78TQO30K5S3eufjMUZxq3mZBLo31I",
    authDomain: "habitus-9d576.firebaseapp.com",
    projectId: "habitus-9d576",
    storageBucket: "habitus-9d576.appspot.com",
    messagingSenderId: "31005261503",
    appId: "1:31005261503:web:0c99ff70719969b244100a",
    measurementId: "G-E4DGH9MVBS"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };