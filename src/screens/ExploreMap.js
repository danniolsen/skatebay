import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "../components/header/Header";
import { connect } from "react-redux";

function ExploreMap(props) {
  const { user } = props;
  return (
    <View style={s.container}>
      <Header />
      <Text>ExploreMap</Text>
      <Text>{user.user.uid}</Text>
    </View>
  );
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  null
)(ExploreMap);

const s = StyleSheet.create({
  container: { flex: 1 }
});
