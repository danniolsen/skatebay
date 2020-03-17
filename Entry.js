import * as React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./src/navigation/MainNavigation";
import * as firebase from "firebase";
import { firebaseConfig } from "./src/utils/firebase";
import { connect } from "react-redux";
import { setUserState } from "./src/redux/actions/userActions";
import Loading from "./src/screens/Loading";
import TopBanner from "./src/components/banner/TopBanner";

function App(props) {
  const containerRef = React.useRef();
  const { setUserDis, user, auth, loading, initialNavigationState } = props;
  const { stopLoadingDis, startLoadingDis, containerRefs, banner } = props;
  const [checkAuth, setCheckAuth] = React.useState(false);

  React.useEffect(() => {
    startLoadingDis();
    firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        firebase
          .auth()
          .currentUser.getIdToken(true)
          .then(function(idToken) {
            setUserDis(idToken);
            setCheckAuth(true);
          });
      } else {
        stopLoadingDis();
      }
    });
  }, []);

  if (!loading && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
        {banner.show && <TopBanner msg={banner.msg} style={banner.style} />}
        <NavigationContainer
          ref={containerRefs}
          initialState={initialNavigationState}
        >
          <MainNavigator auth={checkAuth} />
        </NavigationContainer>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  auth: state.auth.auth,
  banner: state.banner.banner
});

const mapDispatchToProps = dispatch => ({
  setUserDis: payload => dispatch(setUserState(payload)),
  stopLoadingDis: payload => dispatch({ type: "LOADING_STOP" }),
  startLoadingDis: payload => dispatch({ type: "LOADING_START" })
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
