import * as React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { NormalText } from "../StyledText";
import { connect } from "react-redux";
import { bannerHide } from "../../redux/actions/bannerActions";
const TopBanner = props => {
  let color = "#FFF";
  const { msg, style, hideBannerDis } = props;

  console.log(style);
  // wait 1500 ms to display banner (fade in and out)
  return (
    <View style={s.banner}>
      <View style={s.bannerCon}>
        <View style={s.message}>
          <NormalText color={style}>{msg}</NormalText>
        </View>
        <View style={s.dismis}>
          <TouchableOpacity onPress={() => hideBannerDis()}>
            <NormalText color="#FFF">Dismis</NormalText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const mapDispatchToProps = dispatch => ({
  hideBannerDis: payload => dispatch(bannerHide())
});

export default connect(
  null,
  mapDispatchToProps
)(TopBanner);

const s = StyleSheet.create({
  banner: {
    width: "100%",
    position: "absolute",
    zIndex: 1,
    padding: 10,
    bottom: 80
  },
  bannerCon: {
    backgroundColor: "rgba(000,000,000, 0.6)",
    borderRadius: 5,
    padding: 10,
    flexDirection: "row"
  },
  message: { flex: 8, paddingRight: 10 },
  dismis: { flex: 2, alignItems: "flex-end", justifyContent: "center" }
});
