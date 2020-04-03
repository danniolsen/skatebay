import * as React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated
} from "react-native";
import { connect } from "react-redux";
import { NormalText } from "../StyledText";
import { bannerHideAlert } from "../../redux/actions/bannerActions";
import { Feather } from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");

const AlertBanner = props => {
  const color = "#FFF";
  const { hideAlertBannerDis } = props;
  const { style, title, msg, options, show } = props.alertBanner;
  const [fadeAnim] = React.useState(new Animated.Value(0));

  const headerStyle = [
    { name: "default", bg: "#1abc9c", color: "#000", icon: "message-square" },
    { name: "warn", bg: "#f39c12", color: "#e74c3c", icon: "alert-triangle" },
    { name: "info", bg: "#2980b9", color: "#000", icon: "info" },
    { name: "error", bg: "#e74c3c", color: "#000", icon: "alert-octagon" }
  ];

  const buttonAction = button => {
    if (button === 1) {
      props.alertAction();
    }
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 250
    }).start(() => hideAlertBannerDis());
  };

  React.useEffect(
    () => {
      if (show) {
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250
        }).start();
      }
    },
    [show]
  );

  const headerType = headerStyle.find(({ name }) => name === style);
  let header = headerType ? headerType : headerStyle[0];

  if (show) {
    return (
      <Animated.View style={[s.container, { opacity: fadeAnim }]}>
        <View style={s.alertContainer}>
          <View style={[s.alertHeader, { backgroundColor: header.bg }]}>
            <View style={s.headerInnerCon}>
              <NormalText style={s.headerTxt} color="#FFF" size={18}>
                {title}
              </NormalText>
              <Feather
                style={s.headerIcon}
                name={header.icon}
                size={18}
                color="#FFF"
              />
            </View>
          </View>
          <View style={s.alertDescription}>
            <NormalText style={s.msgTxt} color="#2f3c41">
              {msg}
            </NormalText>
          </View>
          <View style={s.alertBtnContainer}>
            <TouchableOpacity
              style={[s.alertButton, { borderLeftWidth: 0 }]}
              onPress={() => buttonAction(0)}
            >
              <NormalText size={16}>Close</NormalText>
            </TouchableOpacity>
            {options && (
              <TouchableOpacity
                style={s.alertButton}
                onPress={() => buttonAction(1)}
              >
                <NormalText color={header.color} size={16}>
                  Confirm
                </NormalText>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Animated.View>
    );
  } else {
    return null;
  }
};

/*for redux
{
type: 'SHOW_BANNER_ALERT',
payload: {banner: {msg: 'hmm', style: 'warning', show: true}}
}
*/

const mapDispatchToProps = dispatch => ({
  hideAlertBannerDis: payload => dispatch(bannerHideAlert())
});

const mapStateToProps = state => ({
  alertBanner: state.banner.alert
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlertBanner);

const s = StyleSheet.create({
  container: {
    width: width,
    height: height,
    position: "absolute",
    padding: width / 10,
    zIndex: 1000,
    justifyContent: "center",
    backgroundColor: "rgba(000,000,000, 0.1)"
  },
  alertContainer: { backgroundColor: "#FFF", borderRadius: 15 },
  alertHeader: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 10,
    alignItems: "center"
  },
  headerInnerCon: { flexDirection: "row" },
  headerTxt: { paddingRight: 5 },
  headerIcon: { paddingLeft: 5, marginTop: 2 },
  alertDescription: { paddingVertical: 20, paddingHorizontal: 10 },
  msgTxt: { textAlign: "center", lineHeight: 20 },
  alertBtnContainer: {
    borderTopWidth: 0.5,
    borderTopColor: "#CCC",
    flexDirection: "row"
  },
  alertButton: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    borderLeftWidth: 0.5,
    borderLeftColor: "#CCC"
  }
});
