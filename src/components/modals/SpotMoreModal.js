import * as React from "react";
import { Modal, View, StyleSheet, TouchableOpacity } from "react-native";
import { ActivityIndicator } from "react-native";
import { Feather } from "@expo/vector-icons";
import { connect } from "react-redux";
import { NormalText } from "../StyledText";
import Colors from "../../constants/Colors";

const SpotMoreModal = props => {
  const { user, spot } = props;
  const [colored, setColored] = React.useState({ id: null });
  const [selected, setSelected] = React.useState(null);
  const [inActive, setInActive] = React.useState({
    inactive: true,
    txt: Colors.passive,
    bg: "#CCC"
  });
  const [reporting, setReporting] = React.useState(false);

  const reportSpot = item => {
    const reported = {
      spot,
      user,
      reason: item.id
    };
    setSelected(reported);
    setInActive({ inactive: false, txt: Colors.white, bg: "#27ae60" });
    setColored({ id: item.id, color: "#CCC" });
  };

  const submitReport = async () => {
    setReporting(true);
    setInActive({ ...inActive, inactive: true });
    props.submit(selected);
  };

  return (
    <Modal
      visible={props.visible}
      transparent
      animationType="fade"
      style={s.container}
      onCloseRequest={() => props.close}
    >
      <View style={s.modalContainer}>
        <View style={s.content}>
          <View style={s.headline}>
            <NormalText size={20} color={Colors.passive}>
              Report spot
            </NormalText>
          </View>
          {items.map(item => (
            <Item
              key={item.id}
              id={item.id}
              icon={item.icon}
              title={item.title}
              action={() => reportSpot(item)}
              selected={colored}
            />
          ))}

          <View style={s.buttonCon}>
            <TouchableOpacity
              onPress={props.close}
              style={[s.button, { borderBottomLeftRadius: 10 }]}
            >
              <NormalText size={16} color={Colors.passive}>
                Close
              </NormalText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => submitReport()}
              disabled={inActive.inactive}
              style={[
                s.button,
                { borderBottomRightRadius: 10, backgroundColor: inActive.bg }
              ]}
            >
              <NormalText size={16} color={inActive.txt}>
                {reporting ? (
                  <ActivityIndicator style={s.spinner} color={Colors.white} />
                ) : (
                  "Submit repport"
                )}
              </NormalText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const Item = props => {
  const colored = props.selected.id === props.id ? "#E9E9E9" : null;

  return (
    <TouchableOpacity
      onPress={props.action}
      style={[s.modalItem, { backgroundColor: colored }]}
    >
      <View style={s.listIcon}>
        <Feather name={props.icon} size={23} color="#A9A9A9" />
      </View>
      <View style={s.listText}>
        <NormalText size={15} color="#2f3c41">
          {props.title}
        </NormalText>
      </View>
    </TouchableOpacity>
  );
};

const items = [
  { id: 1, icon: "x", title: "This is not a spot" },
  { id: 2, icon: "crosshair", title: "Misleading location" },
  { id: 3, icon: "camera-off", title: "Poor image quality" },
  { id: 4, icon: "minus-circle", title: "Spot no longer exists" }
];

export default SpotMoreModal;

const s = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(000,000,000, 0.6)"
  },
  content: {
    backgroundColor: "#FFF",
    marginHorizontal: 20,
    borderRadius: 10
  },
  headline: {
    position: "relative",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10
  },
  close: {
    position: "absolute",
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    right: -10,
    top: -10,
    borderRadius: 30,
    backgroundColor: "#FFF"
  },
  modalItem: {
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderBottomColor: "#AAA",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  listIcon: { flex: 1.5 },
  listText: { flex: 8.5, marginTop: 3 },
  submitBtn: {
    alignItems: "center",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 10,
    marginBottom: -1
  },
  spinner: {
    height: 25,
    width: 25,
    paddingTop: 2
  },
  buttonCon: { flexDirection: "row" },
  button: {
    flex: 1,
    alignItems: "center",
    padding: 10
  }
});
