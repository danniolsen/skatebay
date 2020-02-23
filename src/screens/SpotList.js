import * as React from "react";
import { ThinText, NormalText } from "../components/StyledText";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import Header from "../components/header/Header";

function SpotList(props) {
  const { user } = props;
  let details = {
    id: "bla",
    location: "here"
  };
  return (
    <View style={s.container}>
      <Header rightIcon="filter" rightAction={() => alert("filtering")} />
      <ThinText>spot list</ThinText>
      <TouchableOpacity
        onPress={() => {
          props.navigation.push("SpotDetails", { details });
        }}
      >
        <Text>to details</Text>
      </TouchableOpacity>
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
