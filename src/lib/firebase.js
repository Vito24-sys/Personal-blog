// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9gKElZ18Bsrj-8gk8hm4dU99vkZESSec",
  authDomain: "personal-blog-a96db.firebaseapp.com",
  projectId: "personal-blog-a96db",
  storageBucket: "personal-blog-a96db.firebasestorage.app",
  messagingSenderId: "491124369604",
  appId: "1:491124369604:web:2777d8eaa70e0517988191"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);