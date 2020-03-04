import * as React from "react";
import { View, StyleSheet, ImageBackground, Dimensions } from "react-native";
import { ActivityIndicator } from "react-native";
import { ThinText } from "../StyledText";
import { Feather } from "@expo/vector-icons";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

function EmptyProfileList(props) {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let isCancelled = false;

    setTimeout(function() {
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
          <ActivityIndicator size="large" />
        </View>
      )}
      {!loading && (
        <>
          <ImageBackground
            source={require("../../assets/images/saveCollectionThumbnail.png")}
            style={s.bgImage}
          />

          <ThinText size={20} style={s.seperaeteText}>
            No spots have been saved
          </ThinText>
          <ThinText size={20} style={s.seperaeteText}>
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
