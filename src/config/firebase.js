import { initializeApp } from "firebase/app";
// Import other Firebase services as needed
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAia2Xqdgzh2SIE_waNbMXVZYW6_2Vrfwk",
  authDomain: "servicepwa-dac50.firebaseapp.com",
  projectId: "servicepwa-dac50",
  storageBucket: "servicepwa-dac50.appspot.com",
  messagingSenderId: "1054034773298",
  appId: "1:1054034773298:web:44449e01304240b6b0432b",
  measurementId: "G-0C8B941HW7",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// Initialize Firebase Cloud Messaging and get a reference to the service
// const messaging = getMessaging(app);

export { app, auth, db };
