import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import { AsyncStorage } from "react-native";
import rootReducer from "./reducers/RootReducers";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["location", "saved", "user"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore(initialState = {}) {
  const composeEnhancers = compose;

  const store = createStore(
    persistedReducer,
    composeEnhancers(
      applyMiddleware(thunk),
      process.env.NODE_ENV !== "production" && window.devToolsExtension
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : (f) => f
    )
  );
  const persistor = persistStore(store);
  return { store, persistor };
}
