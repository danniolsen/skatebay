import * as React from "react";
import { StyleSheet, View, ScrollView, FlatList } from "react-native";
import { Image, ImageBackground, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { ThinText, NormalText } from "../components/StyledText";
import Header from "../components/header/Header";
import { Feather } from "@expo/vector-icons";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileSpot from "../components/profile/ProfileSpot";
import EmptyProfileList from "../components/profile/EmptyList";
import { getSavedSpotsList } from "../redux/actions/saveSpotActions";
import { getUploadedSpots } from "../redux/actions/spotListActions";

function UserProfile(props) {
  const { user, navigation, saved, savedListDis } = props;
  const { uploadsListDis, uploads } = props;
  const [refreshing, setRefreshing] = React.useState(false);
  const [type, setType] = React.useState(0);

  React.useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      savedListDis(user);
    }
    return () => {
      isCancelled = true;
    };
  }, []);

  const changeType = newType => {
    if (newType !== type) {
      setType(newType);
      newType === 0 ? savedListDis(user) : uploadsListDis(user);
    }
  };

  const setColor = tabId => {
    return tabId === type ? "#FFF" : "#9e9e9e";
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
            <Option
              icon="bookmark"
              number={saved.spots.length}
              action={() => changeType(0)}
              color={setColor(0)}
            />
            <Option
              icon="layers"
              number={uploads.spots.length}
              action={() => changeType(1)}
              color={setColor(1)}
            />
          </ProfileHeader>
        }
        numColumns={4}
        data={type === 0 ? saved.spots : uploads.spots}
        renderItem={({ item }) => (
          <ProfileSpot
            spot={item}
            enterAction={() => navigation.push("SpotDetails", item)}
          />
        )}
        keyExtractor={item => item.id}
        ListEmptyComponent={() => <EmptyProfileList />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const Option = props => {
  const { color } = props;
  return (
    <TouchableOpacity onPress={props.action} style={s.option}>
      <View style={{ flexDirection: "row" }}>
        <Feather name={props.icon} color={color} size={20} />
        <NormalText style={s.number} color={color} size={15}>
          {props.number}
        </NormalText>
      </View>
    </TouchableOpacity>
  );
};

const mapStateToProps = state => ({
  user: state.user.user,
  saved: state.saved,
  uploads: state.uploads
});
const mapDispatchToProps = dispatch => ({
  savedListDis: payload => dispatch(getSavedSpotsList(payload)),
  uploadsListDis: payload => dispatch(getUploadedSpots(payload))
});

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
