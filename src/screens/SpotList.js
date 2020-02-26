import * as React from "react";
import { ThinText, NormalText } from "../components/StyledText";
import { StyleSheet, View, TouchableOpacity, FlatList } from "react-native";
import { connect } from "react-redux";
import Header from "../components/header/Header";
import LocationService from "../features/LocationService";

function SpotList(props) {
  const { user } = props;

  React.useEffect(() => {
    LocationService()
      .then(loc => {
        console.log(loc);
      })
      .catch(e => {
        alert(e);
      });
  }, []);

  return (
    <View style={s.container}>
      <Header rightIcon="sliders" rightAction={() => alert("filtering")} />

      <ThinText>get users location</ThinText>
      <ThinText>load spotlist</ThinText>
      <ThinText>inject ad for every 5 spot</ThinText>
      <ThinText>enter spot to see details</ThinText>
      <NormalText>lat: comming soon</NormalText>
      <NormalText>lon: comming soon</NormalText>
    </View>
  );
}

const mapStateToProps = state => ({ user: state.user });
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpotList);

const s = StyleSheet.create({
  container: { flex: 1 }
});
