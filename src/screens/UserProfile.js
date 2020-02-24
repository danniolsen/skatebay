import * as React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Image, ImageBackground, Animated } from "react-native";
import { connect } from "react-redux";
import { ThinText } from "../components/StyledText";
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
            <ThinText style={s.displayName} color="#FFF" size={20}>
              {user.user.displayName}
            </ThinText>
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
  overlay: {
    alignItems: "center",
    backgroundColor: "rgba(105,105,105,0.6)",
    paddingTop: 15,
    paddingBottom: 15
  },
  displayName: {
    padding: 5,
    marginBottom: 15
  },
  profileImage: {
    width: 150,
    height: 150,
    borderColor: "#FFF",
    borderWidth: 5,
    borderRadius: 75
  }
});
