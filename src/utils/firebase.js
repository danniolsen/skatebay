import * as firebase from "firebase";
import {
  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID
} from "react-native-dotenv";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
console.log(STORAGE_BUCKET);
const storage = firebase.app().storage(`gs://${STORAGE_BUCKET}`);
let storageRef = storage.ref();

export { firebaseConfig, storageRef };
