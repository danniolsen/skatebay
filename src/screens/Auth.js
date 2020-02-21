import * as React from "react";
import { StyleSheet, View, ImageBackground, Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { ThinText } from "../components/StyledText";
import AuthWidget from "../components/auth/AuthWidget";

function Auth(props) {
  return (
    <ImageBackground
      source={require("../assets/images/authBackground.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <View style={s.content}>
        <View style={s.head}>
          <View style={s.logo} />
          <ThinText size={30} color="#a2a2a2">
            Skatebay 2020.
          </ThinText>
        </View>

        <View style={s.midt}>
          <ThinText>center</ThinText>
        </View>

        <View style={s.authCon}>
          <AuthWidget type="Facebook" bg="#3c66c4" />
          <AuthWidget type="Google" bg="#4285F4" />
        </View>
      </View>
    </ImageBackground>
  );
}

export default Auth;

const s = StyleSheet.create({
  content: { flex: 1 },
  head: {
    flex: 1.5,
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    width: 130,
    height: 130,
    borderRadius: 35,
    backgroundColor: "#FFF"
  },
  headText: {
    color: "#F00"
  },
  midt: {
    flex: 2.9,
    alignItems: "center",
    justifyContent: "center"
  },
  authCon: {
    flex: 1,
    flexDirection: "row"
  }
});
