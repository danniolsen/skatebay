import * as React from "react";
import { StyleSheet, View, ImageBackground, Image } from "react-native";
import { TouchableOpacity, ActivityIndicator } from "react-native";
import { ThinText } from "../components/StyledText";
import AuthWidget from "../components/auth/AuthWidget";
import { connect } from "react-redux";

function Auth(props) {
  const { auth, user } = props;
  return (
    <View stye={s.container}>
      {auth.authLoading && <Loading />}
      <ImageBackground
        source={require("../assets/images/authBackground.png")}
        style={{ resizeMode: "cover", height: "100%" }}
      >
        <View style={s.content}>
          <View style={s.head}>
            <ThinText style={s.headline} size={35} color="#a2a2a2">
              Skatebay
            </ThinText>
            <View style={s.logoCon}>
              <Image
                source={require("../assets/images/logo.png")}
                style={s.logo}
              />
            </View>
          </View>

          <View style={s.midt} />

          <View style={s.authCon}>
            <AuthWidget type="Facebook" bg="#3c66c4" />
            <AuthWidget type="Google" bg="#4285F4" />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const Loading = () => {
  return (
    <View style={s.overlay}>
      <ActivityIndicator size="large" />
      <ThinText style={{ marginTop: 10 }}>Loading...</ThinText>
    </View>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user
});

export default connect(
  mapStateToProps,
  null
)(Auth);

const s = StyleSheet.create({
  container: { flex: 1, position: "relative" },
  content: { flex: 1 },
  head: { flex: 2.4, alignItems: "center", justifyContent: "center" },
  headline: { marginBottom: 20 },
  logoCon: { backgroundColor: "#FFF", padding: 10, borderRadius: 20 },
  logo: { width: 100, height: 100 },
  midt: { flex: 1.4, alignItems: "center", justifyContent: "center" },
  authCon: { flex: 1, flexDirection: "row" },
  overlay: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    zIndex: 1,
    backgroundColor: "rgba(255,255,255, 0.3)"
  }
});
