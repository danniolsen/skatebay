import * as React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { SplashScreen } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./src/navigation/MainNavigation";
import useLinking from "./src/navigation/useLinking";
import { firebaseConfig, firebase } from "./src/utils/firebase";
import { connect } from "react-redux";
import { setUserState } from "./src/redux/actions/userActions";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const [authenticated, setAuthenticated] = React.useState(false);
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);
  const { setUserDis, user, startLoadingDis, stopLoadingDis } = props;

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      console.log("in state change");
      if (user != null) {
        setUserDis(user);
        setAuthenticated(true);
        stopLoadingDis();
      } else {
        setAuthenticated(false);
        stopLoadingDis();
      }
    });
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
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }
    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
        <NavigationContainer
          ref={containerRef}
          initialState={initialNavigationState}
        >
          <MainNavigator auth={authenticated} />
        </NavigationContainer>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  setUserDis: payload => dispatch(setUserState(payload)),
  startLoadingDis: payload => dispatch({ type: "LOADING_START" }),
  stopLoadingDis: payload => dispatch({ type: "LOADING_STOP" })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  }
});
