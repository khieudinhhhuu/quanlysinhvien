import * as firebase from "firebase";

let firebaseConfig = {
    apiKey: "AIzaSyBYmvXB-zGgid5gGEd9T05lV8a4kns5Nzc",
    authDomain: "quanlysinhvien-31367.firebaseapp.com",
    databaseURL: "https://quanlysinhvien-31367.firebaseio.com",
    projectId: "quanlysinhvien-31367",
    storageBucket: "quanlysinhvien-31367.appspot.com",
    messagingSenderId: "774684982332",
    appId: "1:774684982332:web:a9a1b67020758f35"
  };

export const firebaseApp = firebase.initializeApp(firebaseConfig);