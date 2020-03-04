import * as React from "react";
import { View, StyleSheet, ImageBackground, Dimensions } from "react-native";
import { ActivityIndicator } from "react-native";
import { ThinText } from "../StyledText";
import { Feather } from "@expo/vector-icons";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

function EmptySpotList(props) {
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
          <ThinText size={25} style={s.seperaeteText}>
            Ooh!
          </ThinText>

          <ImageBackground
            source={require("../../assets/images/spotThumbnail.png")}
            style={s.bgImage}
          >
            <Feather name="image" size={100} color="#CCC" />
          </ImageBackground>

          <ThinText size={20} style={s.seperaeteText}>
            There are currently no spots around.
          </ThinText>

          <ThinText size={13} style={s.seperaeteText}>
            Try to pull down to refresh.
          </ThinText>
        </>
      )}
    </View>
  );
}

export default EmptySpotList;

const s = StyleSheet.create({
  container: {
    height: height / 1.4,
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
