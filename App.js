import * as React from "react";
import Entry from "./Entry";
import { Provider } from "react-redux";
import configureStore from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import * as firebase from "firebase";
import { firebaseConfig } from "./src/utils/firebase";
import { SplashScreen } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import useLinking from "./src/navigation/useLinking";
//dev only
import { YellowBox } from "react-native";
YellowBox.ignoreWarnings(["Setting a timer"]);
console.disableYellowBox = ["Setting a timer"];
// dev only ends

export default function Index(props) {
  const containerRef = React.useRef();
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const { getInitialState } = useLinking(containerRef);
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();
        setInitialNavigationState(await getInitialState()); // Load our initial navigation state

        await Font.loadAsync({
          ...Ionicons.font,
          "Roboto-Thin": require("./src/assets/fonts/Roboto-Thin.ttf"),
          "Roboto-Regular": require("./src/assets/fonts/Roboto-Regular.ttf")
        });
      } catch (e) {
        console.log(e.stack);
        return null;
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }
    loadResourcesAndDataAsync();
  }, []);

  return (
    <Provider store={configureStore().store}>
      <PersistGate persistor={configureStore().persistor}>
        <Entry
          loading={isLoadingComplete}
          initialNavigationState={initialNavigationState}
          containerRefs={containerRef}
        />
      </PersistGate>
    </Provider>
  );
}
