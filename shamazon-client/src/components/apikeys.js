// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfw6KDeAsXygQFh5Nsx_T3u9asA1Jjdx4",
  authDomain: "sh-9fd2b.firebaseapp.com",
  projectId: "sh-9fd2b",
  storageBucket: "sh-9fd2b.appspot.com",
  messagingSenderId: "283810629371",
  appId: "1:283810629371:web:d4afe1451d7d84e78d525e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);