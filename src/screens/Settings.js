import * as React from "react";
import { FlatList, StyleSheet, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { NormalText } from "../components/StyledText";
import Header from "../components/header/Header";
import { SignOut } from "../features/AuthSocial";

function Settings(props) {
  const { navigation, signOutDis } = props;
  return (
    <View>
      <Header leftIcon="chevron-left" leftAction={() => navigation.goBack()} />
      <FlatList
        data={listData}
        renderItem={({ item }) => (
          <Item title={item.title} action={() => SignOut()} />
        )}
        keyExtractor={item => item.title}
      />
    </View>
  );
}

// move to components
const Item = props => {
  return (
    <View style={s.listItem}>
      <TouchableOpacity onPress={props.action}>
        <NormalText>{props.title}</NormalText>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;

const s = StyleSheet.create({
  listItem: {
    backgroundColor: "#F00",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC"
  }
});

// move to propper folder
const listData = [{ title: "Sign out", action: "CLEAR_USER_SUCCESS" }];
