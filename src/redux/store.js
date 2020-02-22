import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/RootReducers";
import Constants from "expo-constants";

export default function configureStore(initialState = {}) {
  return createStore(rootReducer, applyMiddleware(thunk));
}
