import { firebaseConfig, firebase } from "../utils/firebase";
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";
import {
  FACEBOOK_ID,
  IOS_CLIENT_ID,
  ANDROID_CLIENT_ID
} from "react-native-dotenv";

const AuthFacebook = async () => {
  await Facebook.initializeAsync(FACEBOOK_ID);

  const { type, token } = await Facebook.logInWithReadPermissionsAsync({
    permissions: ["public_profile", "email"]
  });

  if (type === "success") {
    const credential = firebase.auth.FacebookAuthProvider.credential(token);

    firebase
      .auth()
      .signInWithCredential(credential)
      .catch(error => {
        alert("Sorry, an error has occured!");
      });
  } else {
    alert("Facebook Sign in has been cancled");
  }
};

const AuthGoogle = async () => {
  try {
    const result = await Google.logInAsync({
      iosClientId: IOS_CLIENT_ID,
      androidClientId: ANDROID_CLIENT_ID
    });
    if (result.type === "success") {
      const { idToken, accessToken } = result;
      const credential = firebase.auth.GoogleAuthProvider.credential(
        idToken,
        accessToken
      );
      firebase
        .auth()
        .signInWithCredential(credential)
        .then(res => {
          // user res, create your user, do whatever you want
        })
        .catch(error => {
          alert(error);
          return null;
        });
    } else {
      alert("Google sign in was cancled");
      return null;
    }
  } catch (err) {
    alert(err);
    return null;
  }
};

const SignOut = () => {
  try {
    console.log("signing out now");
    firebase
      .auth()
      .signOut()
      .then(function() {
        alert("signed out");
      })
      .catch(function(error) {
        alert("error", error);
      });
  } catch (e) {
    console.log("can't sign out", e);
  }
};

export { AuthFacebook, AuthGoogle, SignOut };
