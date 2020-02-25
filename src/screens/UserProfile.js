import * as React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Image, ImageBackground, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { ThinText, NormalText } from "../components/StyledText";
import Header from "../components/header/Header";
import { Feather } from "@expo/vector-icons";

function UserProfile(props) {
  const { user, navigation } = props;
  let type = user.user.provider != "google.com" ? "?type=large" : "?sz=180";
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
          source={{ uri: `${user.user.photo}${type}` }}
        >
          <View style={s.overlay}>
            <Image
              style={s.profileImage}
              source={{ uri: `${user.user.photo}${type}` }}
            />
            <View style={s.optionsCon}>
              <Option icon="bookmark" number={3391} />
              <Option icon="layers" number={0} />
              <Option icon="user" number={user.user.displayName} />
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </View>
  );
}

const Option = props => {
  return (
    <TouchableOpacity style={s.option}>
      <View style={{ flexDirection: "row" }}>
        <Feather name={props.icon} color="#FFF" size={20} />
        <NormalText style={s.number} color="#FFF" size={15}>
          {props.number}
        </NormalText>
      </View>
    </TouchableOpacity>
  );
};

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
  profileCon: { flex: 1 },
  overlay: {
    backgroundColor: "rgba(105,105,105,0.6)",
    paddingTop: 15,
    paddingBottom: 5,
    alignItems: "center"
  },
  profileImage: {
    width: 120,
    height: 120,
    borderColor: "#FFF",
    borderWidth: 5,
    borderRadius: 75
  },
  optionsCon: {
    flexDirection: "row"
  },
  option: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    borderTopWidth: 1,
    marginTop: 15,
    borderTopColor: "#CCC"
  },
  number: { marginTop: 2, marginLeft: 10 }
});
