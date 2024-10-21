import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyC-qCIn0lN3d2bxqJgVlEVmEXvUXRYIvZE",
  authDomain: "helloworldappplease.firebaseapp.com",
  projectId: "helloworldappplease",
  storageBucket: "helloworldappplease.appspot.com",
  messagingSenderId: "578114753935",
  appId: "1:578114753935:web:7fdbc3d606f89ededae7fa",
  measurementId: "G-5HD2PC3GJK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
  

export { auth }; // Export the auth object
