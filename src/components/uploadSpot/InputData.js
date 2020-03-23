import * as React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { NormalText, ThinText } from "../StyledText";
import Headline from "./Headline";

const InputData = props => {
  const { getTitle, headline } = props;
  const [status, setStatus] = React.useState(false);

  const setTitle = txt => {
    let newTitle = txt.nativeEvent.text;
    props.title(newTitle);

    if (status) {
      newTitle.length < 3 ? null : setStatus(false);
    }
  };

  const showError = del => {
    let deleting = del.nativeEvent.key === "Backspace";
    deleting && getTitle.length - 1 < 3 ? setStatus(true) : null;
  };

  const userLeft = () => {
    let txt = getTitle.length;
    txt < 3 ? setStatus(true) : null;
  };

  const inputTap = () => {
    props.inputTap(true);
  };
  return (
    <View style={s.container}>
      <Headline
        name={headline.name}
        warning={headline.warning}
        active={status}
      />

      <TextInput
        style={s.inputField}
        allowFontScaling
        autoCapitalize={"sentences"}
        maxLength={20}
        onChange={txt => setTitle(txt)}
        onKeyPress={del => showError(del)}
        placeholder="Spot title"
        onBlur={() => userLeft()}
        onFocus={() => inputTap()}
      >
        <ThinText size={20}>{getTitle}</ThinText>
      </TextInput>

      <View style={s.inputCounter}>
        <ThinText size={14}>{`${getTitle.length} / 20`}</ThinText>
      </View>
    </View>
  );
};

export default InputData;

const s = StyleSheet.create({
  container: { flex: 1, marginVertical: 5, backgroundColor: "#FFF" },
  inputCon: { flexDirection: "row" },
  inputField: {
    flex: 8,
    margin: 10,
    fontSize: 20,
    padding: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#AAA"
  },
  inputCounter: {
    flex: 2,
    marginRight: 10,
    paddingBottom: 10,
    alignItems: "flex-end"
  }
});
