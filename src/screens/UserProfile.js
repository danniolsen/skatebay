import * as React from "react";
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import { Image } from "react-native";
import { connect } from "react-redux";
import { SignOut } from "../features/AuthSocial";
function UserProfile(props) {
  const { user } = props;

  React.useEffect(() => {}, []);
  return (
    <SafeAreaView style={s.container}>
      <ScrollView>
        <View style={s.profileCon}>
          <Image
            style={s.profileImg}
            source={{
              uri: `${user.user.photo}?type=large`
            }}
          />
        </View>
        <View style={s.optionsCon}>
          <Text>options</Text>
        </View>
        <View style={s.spotsCon}>
          <Text onPress={() => SignOut()}>{user.user.uid}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const mapStateToProps = state => ({
  user: state.user
});
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);

const s = StyleSheet.create({
  container: { flex: 1 },
  profileCon: { alignItems: "center", paddingTop: 20 },
  profileImg: {
    width: 100,
    height: 100,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: "#FFF",
    resizeMode: "cover"
  },
  optionsCon: { backgroundColor: "#EEE" },
  spotsCon: { backgroundColor: "#CCC" }
});
