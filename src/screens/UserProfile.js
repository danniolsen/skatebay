import * as React from "react";
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { Feather } from "@expo/vector-icons";
import { NormalText } from "../components/StyledText";
import Header from "../components/header/Header";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileSpot from "../components/profile/ProfileSpot";
import EmptyProfileList from "../components/profile/EmptyList";
import { getSavedSpotsList } from "../redux/actions/saveSpotActions";
import { getUploadedSpots } from "../redux/actions/spotListActions";

function UserProfile(props) {
  const { user, navigation, saved, savedListDis } = props;
  const { uploadsListDis, uploads } = props;
  const [type, setType] = React.useState(0);
  const { params } = props.route;

  React.useEffect(
    () => {
      let isCancelled = false;
      if (!isCancelled) {
        savedListDis(user);
        uploadsListDis(user);
      }
      params ? setType(1) : null;
      return () => {
        isCancelled = true;
      };
    },
    [params]
  );

  const changeType = newType => {
    if (newType !== type) {
      setType(newType);
      if (newType !== 0) {
        uploadsListDis(user);
      } else {
        savedListDis(user);
      }
    }
  };

  const setColor = tabId => (tabId === type ? "#FFF" : "#9e9e9e");

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
        keyExtractor={item => item.spot_id}
        ListEmptyComponent={() => <EmptyProfileList />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const Option = props => {
  const { color, icon, action, number } = props;
  return (
    <TouchableOpacity onPress={action} style={s.option}>
      <View style={{ flexDirection: "row" }}>
        <Feather name={icon} color={color} size={20} />
        <NormalText style={s.number} color={color} size={15}>
          {number}
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
