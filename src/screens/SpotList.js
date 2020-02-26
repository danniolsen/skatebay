import * as React from "react";
import { ThinText, NormalText } from "../components/StyledText";
import { StyleSheet, View, TouchableOpacity, FlatList } from "react-native";
import { connect } from "react-redux";
import Header from "../components/header/Header";
import LocationService from "../features/LocationService";
import { setNewLocation } from "../redux/actions/locationActions";
import Spot from "../components/spotList/Spot";
import EmptySpotList from "../components/spotList/EmptySpotList";

function SpotList(props) {
  const { user, location, locationDis } = props;
  const [refreshing, setRefreshing] = React.useState(false);
  React.useEffect(() => {
    // get and set users location is not already set
    if (location.latitude === null && location.longitude === null) {
      getSpotlist();
    }
  }, []);

  const getSpotlist = () => {
    LocationService().then(loc => {
      locationDis(loc);
      // get spotlist with new location
    });
  };

  return (
    <View style={s.container}>
      <Header rightIcon="sliders" rightAction={() => alert("filtering")} />
      <FlatList
        data={spots}
        onRefresh={() => getSpotlist()}
        refreshing={refreshing}
        renderItem={({ item }) => <Spot url={item.url} />}
        keyExtractor={item => item.id}
        ListEmptyComponent={() => <EmptySpotList />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const mapStateToProps = state => ({
  user: state.user,
  location: state.location
});
const mapDispatchToProps = dispatch => ({
  locationDis: payload => dispatch(setNewLocation(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpotList);

const s = StyleSheet.create({
  container: { flex: 1 }
});
const spots = [];
/*
const spots = [
  {
    id: "1",
    url:
      "https://www.skatein.com/admin/wp-content/uploads/2017/05/nordhavn-skatespot-01-1080x500.jpg"
  },
  {
    id: "2",
    url:
      "https://www.skatein.com/admin/wp-content/uploads/2017/05/utterslev-skatespot-03-1000x500.jpg"
  },
  {
    id: "3",
    url:
      "https://i.pinimg.com/originals/89/53/78/895378433d088aa0b7d053479550a559.jpg"
  },
  {
    id: "4",
    url:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
  },
  {
    id: "5",
    url:
      "https://www.skatein.com/admin/wp-content/uploads/2017/05/utterslev-skatespot-03-1000x500.jpg "
  },
  {
    id: "6",
    url:
      "https://www.skatein.com/admin/wp-content/uploads/2017/05/utterslev-skatespot-03-1000x500.jpg"
  },
  {
    id: "7",
    url:
      "https://www.skatein.com/admin/wp-content/uploads/2017/05/nordhavn-skatespot-01-1080x500.jpg"
  },
  {
    id: "8",
    url:
      "https://i.pinimg.com/originals/89/53/78/895378433d088aa0b7d053479550a559.jpg"
  },
  {
    id: "9",
    url:
      "https://i.pinimg.com/originals/89/53/78/895378433d088aa0b7d053479550a559.jpg"
  }
];
*/
