// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsqP8XoRJ9NuE0jfO3a0idMP0p4dQjA0c",
  authDomain: "managament-81605.firebaseapp.com",
  projectId: "managament-81605",
  storageBucket: "managament-81605.appspot.com",
  messagingSenderId: "206704181962",
  appId: "1:206704181962:web:afa9758ed4d7b62457ea33",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };
