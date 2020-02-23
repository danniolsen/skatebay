import * as React from "react";
import { ThinText, NormalText } from "../components/StyledText";
import { StyleSheet, SafeAreaView, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

function SpotList(props) {
  let details = {
    id: "bla",
    location: "here"
  };
  return (
    <SafeAreaView style={s.container}>
      <ThinText>spot list</ThinText>
      <TouchableOpacity
        onPress={() => {
          props.navigation.push("SpotDetails", { details });
        }}
      >
        <Text>to details</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpotList);

const s = StyleSheet.create({
  container: { flex: 1 }
});
