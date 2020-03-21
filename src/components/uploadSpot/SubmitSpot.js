import * as React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { NormalText } from "../StyledText";

const SubmitSpot = props => {
  const { user, duplicate, images, location, title, tags } = props;

  const [buttonInactive, setButtonInactive] = React.useState(true);

  React.useEffect(() => {
    setButtonInactive(false); // dev only
  }, []);

  const validateData = () => {
    return false;
  };

  const checkUser = () => {
    return null;
  };

  const checkDuplicate = () => {
    return null;
  };

  const checkImages = () => {
    return null;
  };

  const checkLocation = () => {
    return null;
  };

  const checkTitle = () => {
    return null;
  };

  const checkTags = () => {
    return null;
  };

  return (
    <TouchableOpacity
      disabled={buttonInactive}
      style={s.container}
      onPress={() => validateData()}
    >
      <NormalText color="#FFF" size={20}>
        Submit
      </NormalText>
    </TouchableOpacity>
  );
};

export default SubmitSpot;

const s = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#3498db"
  },
  submitBtn: {
    justifyContent: "center",
    padding: 10,
    borderRadius: 5
  }
});
