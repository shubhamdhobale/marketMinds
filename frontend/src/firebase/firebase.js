import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAq0PFV68-iRQgtfGJ5o5nmefv9kCoFOg8",
  authDomain: "marketminds-8f4ec.firebaseapp.com",
  projectId: "marketminds-8f4ec",
  storageBucket: "marketminds-8f4ec.firebasestorage.app",
  messagingSenderId: "10637270479",
  appId: "1:10637270479:web:79f9d48ed5017b8d8dc6ba",
  measurementId: "G-5XSNGN4G7C"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup };