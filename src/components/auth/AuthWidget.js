import * as React from "react";
import { TouchableOpacity, Text, Image, StyleSheet, View } from "react-native";
import FacebookBtn from "../../assets/buttons/facebook.png";
import GoogleBtn from "../../assets/buttons/google.png";
import { AuthFacebook, AuthGoogle } from "../../features/AuthSocial";

const AuthWidget = props => {
  // check type to match image
  let btnImg = props.type === "Google" ? GoogleBtn : FacebookBtn;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[s.button, { backgroundColor: props.bg }]}
      onPress={() => {
        AuthGoogle();
      }}
    >
      <Image source={btnImg} style={s.btnImg} />
    </TouchableOpacity>
  );
};

export default AuthWidget;

const s = StyleSheet.create({
  authCon: {
    flex: 1,
    flexDirection: "row"
  },
  button: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center"
  },
  btnImg: {
    width: 150,
    height: 150
  }
});
