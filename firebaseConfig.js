
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkSQg_jBXSYrbHYYu87ykDsNAKLkl-kfc",
  authDomain: "ebooks-807da.firebaseapp.com",
  projectId: "ebooks-807da",
  storageBucket: "ebooks-807da.firebasestorage.app",
  messagingSenderId: "108222785133",
  appId: "1:108222785133:web:0a9e00709d2116758e0164",
  measurementId: "G-CT56H32CNT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { db, analytics };
