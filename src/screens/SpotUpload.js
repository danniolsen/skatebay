import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "../components/header/Header";
import { connect } from "react-redux";
import * as firebase from "firebase";

function SpotUpload(props) {
  return (
    <View style={s.container}>
      <Header />
      <Text>SpotUpload</Text>
    </View>
  );
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  null
)(SpotUpload);

const s = StyleSheet.create({
  container: { flex: 1 }
});
