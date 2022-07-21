// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEqFOz-u_2kg5SdNCUzVxiRkE9B1LgCRg",
  authDomain: "andflix-db38f.firebaseapp.com",
  projectId: "andflix-db38f",
  storageBucket: "andflix-db38f.appspot.com",
  messagingSenderId: "849510502445",
  appId: "1:849510502445:web:de61d876cdcc67d032e8a4"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app;
export {auth, db}