// Import the functions you need from the SDKs you need
import { initializeApp } from
"https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";

import { getAuth } from
"https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";

import { getFirestore } from
"https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

import { getStorage } from
"https://www.gstatic.com/firebasejs/11.0.0/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDj3YREj3H0Nc4L2ByuAa3eBOizKPu47Co",
  authDomain: "studylens-feeef.firebaseapp.com",
  projectId: "studylens-feeef",
  storageBucket: "studylens-feeef.firebasestorage.app",
  messagingSenderId: "224481460411",
  appId: "1:224481460411:web:f6760095e2128892c9299e",
  measurementId: "G-X7WNXMS97N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app);

const storage = getStorage(app);


// Export services

export { app, auth, db, storage };
