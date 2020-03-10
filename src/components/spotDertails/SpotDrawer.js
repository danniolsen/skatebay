import * as React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import BottomSheet from "reanimated-bottom-sheet";
import { Feather } from "@expo/vector-icons";
import { ThinText } from "../StyledText";
const SpotDrawer = props => {
  return (
    <BottomSheet
      style={s.container}
      snapPoints={["85%", "53%", "15%"]}
      initialSnap={1}
      onChange={() => alert("changed")}
      renderHeader={() => <RenderHeader title={props.title} />}
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
      <TouchableOpacity style={s.draggerCon}>
        <View style={s.dragger} />
      </TouchableOpacity>
      <View style={s.spotTitle}>
        <ThinText color="#2f3c41" size={20}>
          {props.title}
        </ThinText>
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
  draggerCon: {
    alignItems: "center",
    paddingTop: 15,
    paddingBottom: 5
  },
  dragger: {
    width: 30,
    alignItems: "center",
    justifyContent: "center",
    padding: 2.7,
    borderRadius: 5,
    backgroundColor: "#7A7A7A"
  },
  spotTitle: { flex: 1, padding: 10, paddingTop: 0 }
});
