import * as React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
import BottomSheet from "reanimated-bottom-sheet";
import { Feather } from "@expo/vector-icons";
import { ThinText } from "../StyledText";

const { width, height } = Dimensions.get("window");

const SpotDrawer = props => {
  return (
    <BottomSheet
      style={s.container}
      snapPoints={["80%", "53%", "20%"]}
      initialSnap={2}
      onChange={() => alert("changed")}
      renderHeader={() => (
        <RenderHeader
          title={props.title}
          updateDistance={props.updateDistance}
        />
      )}
      renderContent={() => (
        <View style={{ backgroundColor: "#FFF" }}>{props.children}</View>
      )}
      overdragResistanceFactor={2}
      enabledContentGestureInteraction={false}
    />
  );
};

const RenderHeader = props => {
  return (
    <View style={s.mapHeader}>
      <View style={s.headerCon}>
        <View style={s.spotTitle}>
          <ThinText color="#2f3c41" size={20}>
            {props.title}
          </ThinText>
        </View>
        <View style={s.updateDistance}>
          <TouchableOpacity onPress={props.updateDistance}>
            <Feather name="navigation" color="#2f3c41" size={22} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default SpotDrawer;

const s = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    position: "absolute",
    backgroundColor: "#FFF"
  },
  mapHeader: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: "#FFF"
  },
  headerCon: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: "row"
  },
  spotTitle: { flex: 1 },
  updateDistance: {
    flex: 1,
    paddingTop: 3,
    alignItems: "flex-end"
  }
});
