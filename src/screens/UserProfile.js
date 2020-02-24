import * as React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Image, ImageBackground } from "react-native";
import { connect } from "react-redux";
import Header from "../components/header/Header";

function UserProfile(props) {
  const { user, navigation } = props;

  return (
    <View style={s.container}>
      <Header
        rightIcon="settings"
        rightAction={() => navigation.push("Settings")}
      />
      <ScrollView>
        <ImageBackground
          blurRadius={4}
          style={s.profileCon}
          resizeMode="cover"
          source={{ uri: `${user.user.photo}?type=large` }}
        >
          <View style={s.overlay}>
            <Image
              style={s.profileImage}
              source={{ uri: `${user.user.photo}?type=large` }}
            />
          </View>
        </ImageBackground>
      </ScrollView>
    </View>
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
  profileCon: { flex: 1, justifyContent: "center" },
  overlay: { alignItems: "center", backgroundColor: "rgba(105,105,105,0.3)" },
  profileImage: {
    width: 100,
    height: 100,
    marginTop: 40,
    marginBottom: 40,
    borderColor: "#FFF",
    borderWidth: 5,
    borderRadius: 20
  }
});
