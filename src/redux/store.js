import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/RootReducers";
import { persistStore, persistReducer } from "redux-persist";
import { AsyncStorage } from "react-native";

const persistConfig = {
  key: "root",
  storage: AsyncStorage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore(initialState = {}) {
  const composeEnhancers = compose;

  let store = createStore(
    persistedReducer,
    composeEnhancers(
      applyMiddleware(thunk),
      process.env.NODE_ENV !== "production" && window.devToolsExtension
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f
    )
  );
  let persistor = persistStore(store);
  return { store, persistor };
}
