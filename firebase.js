// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9GOMRP-4fkD6JQ6Vu8ukTVzWLUQPW4NA",
  authDomain: "audio-app-5fb6f.firebaseapp.com",
  projectId: "audio-app-5fb6f",
  storageBucket: "audio-app-5fb6f.appspot.com",
  messagingSenderId: "432311637348",
  appId: "1:432311637348:web:55c3d38cd09c21d721d671"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { auth }