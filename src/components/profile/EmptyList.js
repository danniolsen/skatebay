import * as React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  ActivityIndicator
} from "react-native";
import Colors from "../../constants/Colors";
import { Feather } from "@expo/vector-icons";
import { ThinText } from "../StyledText";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

function EmptyProfileList(props) {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let isCancelled = false;

    setTimeout(() => {
      if (!isCancelled) {
        setLoading(false);
      }
    }, 1500);

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <View style={s.container}>
      <View style={s.loadingCon} />
      {loading && (
        <View style={s.loadingCon}>
          <ActivityIndicator color={Colors.default} size="large" />
        </View>
      )}
      {!loading && (
        <>
          <ImageBackground
            source={require("../../assets/images/saveCollectionThumbnail.png")}
            style={s.bgImage}
          />

          <ThinText color={Colors.passive} size={20} style={s.seperaeteText}>
            No spots have been saved
          </ThinText>
          <ThinText color={Colors.passive} size={20} style={s.seperaeteText}>
            to your collections, yet.
          </ThinText>
        </>
      )}
    </View>
  );
}

export default EmptyProfileList;

const s = StyleSheet.create({
  container: {
    height: height / 1.8,
    alignItems: "center",
    justifyContent: "center"
  },
  bgImage: {
    width: width / 1.5,
    height: width / 1.5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20
  },
  seperaeteText: { marginBottom: 15 }
});
