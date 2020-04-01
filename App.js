import * as React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import configureStore from "./src/redux/store";
import Entry from "./Entry";

export default function Index() {
  return (
    <Provider store={configureStore().store}>
      <PersistGate persistor={configureStore().persistor}>
        <Entry />
      </PersistGate>
    </Provider>
  );
}
