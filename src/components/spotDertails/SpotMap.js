import * as React from "react";
import { Feather } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import BottomSheet from "reanimated-bottom-sheet";
import { Fragment, StyleSheet, View, Dimensions, Text } from "react-native";

const { width, height } = Dimensions.get("window");

const SpotMap = props => {
  const [openIcon, setOpenIcon] = React.useState("chevron-up");

  let min = 50;
  let midt = height / 2;
  let max = height - 185;

  return (
    <View style={s.container}>
      <BottomSheet
        //enabledBottomInitialAnimation={true}
        snapPoints={["80%", "50%", 50]}
        initialSnap={[1]}
        renderHeader={() => <RenderHeader icon={openIcon} />}
        renderContent={() => (
          <RenderContent
            spotLocLat={props.spotLat}
            spotLocLon={props.spotLon}
          />
        )}
        enabledContentGestureInteraction={false}
        onOpenStart={() => setOpenIcon("chevron-down")}
        onOpenEnd={() => setOpenIcon("chevron-down")}
        onCloseStart={() => setOpenIcon("chevron-up")}
        onCloseEnd={() => setOpenIcon("chevron-up")}
      />
    </View>
  );
};

const RenderHeader = props => {
  return (
    <View style={s.mapHeader}>
      <Feather name={props.icon} color="#2f3c41" size={35} />
    </View>
  );
};

const RenderContent = props => {
  let latitude = Number(props.spotLocLat);
  let longitude = Number(props.spotLocLon);

  return (
    <View style={s.mapContent}>
      <MapView
        showsUserLocation={true}
        style={s.map}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
        <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude
          }}
        />
      </MapView>
    </View>
  );
};

export default SpotMap;

const s = StyleSheet.create({
  container: { flex: 1 },
  mapHeader: {
    padding: 5,
    alignItems: "center",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -16 },
    shadowOpacity: 0.1,
    shadowRadius: 40
  },
  mapContent: { backgroundColor: "#FFF" },
  map: { width: width, height: height }
});
