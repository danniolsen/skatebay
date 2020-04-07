import * as React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform
} from "react-native";
import Colors from "../../constants/Colors";
Colors.iconColor;

import { Feather } from "@expo/vector-icons";
import { ThinText } from "../StyledText";

function Header(props) {
  const logo = "../../assets/images/logo.png";

  return (
    <View style={s.container}>
      <View style={s.left}>
        <TouchableOpacity onPress={props.leftAction}>
          <Feather name={props.leftIcon} color={Colors.iconColor} size={30} />
        </TouchableOpacity>
      </View>
      <View style={s.center}>
        <Image style={s.logo} source={require(logo)} />
        <ThinText size={20}>Skatebay</ThinText>
      </View>
      <View style={s.right}>
        <TouchableOpacity onPress={props.rightAction}>
          <Feather
            name={props.rightIcon}
            color={props.color ? props.color : Colors.iconColor}
            size={23}
            style={s.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Header;

const s = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flexDirection: "row",
    paddingTop: 13,
    alignItems: "center",
    paddingBottom: 13,
    height: 56
  },
  left: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  center: {
    flex: 7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  logo: { width: 25, height: 25 },
  right: { flex: 1 }
});
