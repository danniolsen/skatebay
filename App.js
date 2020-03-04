import * as React from "react";
import Entry from "./Entry";
import { Provider } from "react-redux";
import configureStore from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import * as firebase from "firebase";
import { firebaseConfig } from "./src/utils/firebase";
//dev only
import { YellowBox } from "react-native";
YellowBox.ignoreWarnings(["Warning: ...", "Setting a timer"]);

// dev only ends

export default function Index(props) {
  return (
    <Provider store={configureStore().store}>
      <PersistGate persistor={configureStore().persistor}>
        <Entry />
      </PersistGate>
    </Provider>
  );
}
