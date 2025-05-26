// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore,doc,setDoc,getDoc } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBBEfrGQptKST8dcwvUp68h8DtdgGzuNs",
  authDomain: "financely-9a835.firebaseapp.com",
  projectId: "financely-9a835",
  storageBucket: "financely-9a835.firebasestorage.app",
  messagingSenderId: "210638267631",
  appId: "1:210638267631:web:344f87f2906427e163671a",
  measurementId: "G-MBXBSZGQL3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)
const auth = getAuth(app);
const provider = new GoogleAuthProvider()
export {db,auth,provider,doc,setDoc,getDoc}