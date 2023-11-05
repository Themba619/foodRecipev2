// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged,  getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";
import { doc, getDoc, setDoc } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products
// Sbu Firebase
// Your web app's Firebase configuration

const firebaseConfigCustom = {
  apiKey: "AIzaSyDK8dnK7J7VRXOk2VB6iPyn2ATerXHTfHU",
  authDomain: "myrecipe-58c34.firebaseapp.com",
  projectId: "myrecipe-58c34",
  storageBucket: "myrecipe-58c34.appspot.com",
  messagingSenderId: "469853786927",
  appId: "1:469853786927:web:ab19b4fb8d8c4cfeee47da",
};

// Initialize Firebase
const app = initializeApp(firebaseConfigCustom);
const auth = getAuth(app);
export const firestore = getFirestore(app);


auth.setPersistence(getReactNativePersistence(AsyncStorage))
  .then(() => {
    // Now Firebase Auth will persist the user's state between app sessions
    console.log('Firebase Auth persistence is set up.');
  })
  .catch((error) => {
    console.error('Error setting up Firebase Auth persistence:', error);
  });

try {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("Logged in:", user);
    } else {
      console.log("No user logged in");
    }
    console.log('Connected to db');
  });
} catch (error) {
  console.log("Error logging number of users signed-in:", error);
}

export default auth;