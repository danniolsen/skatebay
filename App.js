import React from "react";
import Entry from "./Entry";
import { Provider } from "react-redux";
import configureStore from "./src/redux/store";

export default function Index(props) {
  return (
    <Provider store={configureStore()}>
      <Entry />
    </Provider>
  );
}
