import * as React from "react";
import { ThinText, NormalText } from "../components/StyledText";
import { StyleSheet, SafeAreaView, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

function SpotList(props) {
  React.useEffect(() => {
    const { user } = props;
    console.log(user);
  });

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

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  null
)(SpotList);

const s = StyleSheet.create({
  container: { flex: 1 }
});
