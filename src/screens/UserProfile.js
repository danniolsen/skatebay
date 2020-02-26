import * as React from "react";
import { StyleSheet, View, ScrollView, FlatList } from "react-native";
import { Image, ImageBackground, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { ThinText, NormalText } from "../components/StyledText";
import Header from "../components/header/Header";
import { Feather } from "@expo/vector-icons";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileSpot from "../components/profile/ProfileSpot";
import { EmptyProfileList } from "../components/profile/EmptyList";

function UserProfile(props) {
  const { user, navigation } = props;
  const [refreshing, setRefreshing] = React.useState(false);
  const [type, setType] = React.useState(0);

  const changeType = newType => {
    newType !== type ? setType(newType) : null;
  };

  const getData = () => {
    setRefreshing(true);
    //fetch data here.
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };
  return (
    <View style={s.container}>
      <Header
        rightIcon="settings"
        rightAction={() => navigation.push("Settings")}
      />
      <FlatList
        style={{ flexDirection: "column" }}
        ListHeaderComponent={
          <ProfileHeader user={user}>
            <Option icon="bookmark" number={0} action={() => changeType(0)} />
            <Option icon="layers" number={0} action={() => changeType(1)} />
          </ProfileHeader>
        }
        numColumns={4}
        data={data}
        onRefresh={() => getData()}
        refreshing={refreshing}
        renderItem={({ item }) => <ProfileSpot text={item.id} />}
        keyExtractor={item => item.id}
        ListEmptyComponent={() => <EmptyProfileList type={type} />}
      />
    </View>
  );
}

const Option = props => {
  return (
    <TouchableOpacity onPress={props.action} style={s.option}>
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
  user: state.user.user
});
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);

const s = StyleSheet.create({
  container: { flex: 1 },
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

const data = [];
/*
const data = [
  { id: "1", img: "" },
  { id: "2", img: "" },
  { id: "3", img: "" },
  { id: "4", img: "" },
  { id: "5", img: "" },
  { id: "6", img: "" },
  { id: "7", img: "" },
  { id: "8", img: "" },
  { id: "9", img: "" }
];
*/
