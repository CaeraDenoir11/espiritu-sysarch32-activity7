import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC4a1PGxqIQdPJskFd82FMpZe-AdR4YJOE",
  authDomain: "it-sysarch32-store-espiritu.firebaseapp.com",
  projectId: "it-sysarch32-store-espiritu",
  storageBucket: "it-sysarch32-store-espiritu.appspot.com",
  messagingSenderId: "24519122237",
  appId: "1:24519122237:web:1facd56c281f1677e13954",
  measurementId: "G-83SBZYDQVW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export default firestore; // You can optionally export the Firebase app instance for use in other files
