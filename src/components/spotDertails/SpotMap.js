import * as React from "react";
import { Feather } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import BottomSheet from "reanimated-bottom-sheet";
import { Fragment, StyleSheet, View, Dimensions, Text } from "react-native";

const { width, height } = Dimensions.get("window");

const SpotMap = props => {
  const [openIcon, setOpenIcon] = React.useState("chevron-up");
  const [mapLoading, setMapLoading] = React.useState(true);

  return (
    <View style={s.container}>
      <BottomSheet
        style={s.sliderCon}
        snapPoints={["70%", "40%", "10%"]}
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
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.009,
          longitudeDelta: 0.0093
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
  container: { flex: 1, elevation: 2 },
  sliderCon: { height: 20 },
  mapHeader: {
    padding: 5,
    alignItems: "center",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: "#FFF"
  },
  mapContent: { backgroundColor: "#FFF" },
  map: { width: width, height: "100%" }
});
