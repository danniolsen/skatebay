import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DB,
  FIREBASE_STORAGE
} from "react-native-dotenv";

// Initialize Firebase
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DB,
  storageBucket: FIREBASE_STORAGE
};

export default firebaseConfig;
