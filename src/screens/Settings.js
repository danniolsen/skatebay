import * as React from "react";
import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { NormalText } from "../components/StyledText";
import Header from "../components/header/Header";
import { Feather } from "@expo/vector-icons";

function Settings(props) {
  const { navigation, signOutDis } = props;
  return (
    <View style={s.container}>
      <Header leftIcon="chevron-left" leftAction={() => navigation.goBack()} />
      <ScrollView style={s.listCon}>
        <Item
          icon="bell"
          title="Notifications"
          action={() => alert("nofifications view")}
        />
        <Item
          icon="alert-triangle"
          title="Bug repport"
          action={() => alert("bug repport view")}
        />
        <Item
          icon="user"
          title="Privacy"
          action={() => alert("privacy view")}
        />
        <Item
          icon="database"
          title="Data collection"
          action={() => alert("data collection view")}
        />
        <Item
          icon="headphones"
          title="Support"
          action={() => alert("support view")}
        />
        <Item icon="info" title="About" action={() => alert("info view")} />
        <Item icon="lock" title="Sign out" action={() => signOutDis()} />
      </ScrollView>
    </View>
  );
}

// move to components
const Item = props => {
  return (
    <TouchableOpacity onPress={props.action} style={s.listItem}>
      <View style={s.listIcon}>
        <Feather name={props.icon} size={20} color="#A9A9A9" />
      </View>

      <View style={s.listText}>
        <NormalText>{props.title}</NormalText>
      </View>
    </TouchableOpacity>
  );
};

const mapDispatchToProps = dispatch => ({
  signOutDis: payload => dispatch({ type: "SIGN_OUT" })
});

export default connect(
  null,
  mapDispatchToProps
)(Settings);

const s = StyleSheet.create({
  container: { flex: 1 },
  listCon: { backgroundColor: "#FFF" },
  listItem: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#A9A9A9",
    flexDirection: "row"
  },
  listIcon: { alignItems: "center", flex: 1, padding: 12 },
  listText: { flex: 10, padding: 12, marginTop: 2 }
});
