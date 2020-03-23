import * as React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { SplashScreen } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./src/navigation/MainNavigation";
import useLinking from "./src/navigation/useLinking";
import * as firebase from "firebase";
import { firebaseConfig } from "./src/utils/firebase";
import { connect } from "react-redux";
import { setUserState } from "./src/redux/actions/userActions";

function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);
  const { setUserDis, user, auth, stopLoadingDis } = props;

  React.useEffect(
    () => {
      let user = firebase.auth().onAuthStateChanged(user => {
        if (user != null) {
          firebase
            .auth()
            .currentUser.getIdToken(true)
            .then(function(idToken) {
              setUserDis(idToken);
            });
        } else {
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
          return null;
        } finally {
          setLoadingComplete(true);
          SplashScreen.hide();
        }
      }
      loadResourcesAndDataAsync();
    },
    [firebase]
  );

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
          <MainNavigator authState={auth} />
        </NavigationContainer>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  auth: state.auth.auth
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
