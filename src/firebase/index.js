import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyCrRoGukBF9VYCtKTj9QCeJwVMRHDwA0jY",
    authDomain: "crypto-187710.firebaseapp.com",
    databaseURL: "https://crypto-187710.firebaseio.com",
    projectId: "crypto-187710",
    storageBucket: "crypto-187710.appspot.com",
    messagingSenderId: "1086579043375"
};

firebase.initializeApp(config);

export default firebase;