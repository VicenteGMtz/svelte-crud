
import firebase from 'firebase/app';
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyCaa1m22jaBv3ALqhDJAqxNWmrCuwWo-5M",
    authDomain: "svelte-crud-8cd40.firebaseapp.com",
    databaseURL: "https://svelte-crud-8cd40.firebaseio.com",
    projectId: "svelte-crud-8cd40",
    storageBucket: "svelte-crud-8cd40.appspot.com",
    messagingSenderId: "765317272140",
    appId: "1:765317272140:web:511f4075d8812566ab1ae9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();